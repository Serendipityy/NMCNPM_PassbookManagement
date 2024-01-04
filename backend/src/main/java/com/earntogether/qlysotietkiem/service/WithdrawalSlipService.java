package com.earntogether.qlysotietkiem.service;

import com.earntogether.qlysotietkiem.dto.WithdrawalSlipDTO;
import com.earntogether.qlysotietkiem.exception.DataNotValidException;
import com.earntogether.qlysotietkiem.exception.ResourceNotFoundException;
import com.earntogether.qlysotietkiem.model.WithdrawalSlipModel;
import com.earntogether.qlysotietkiem.repository.PassbookRepository; 
import com.earntogether.qlysotietkiem.repository.WithdrawalSlipRepository;
import com.earntogether.qlysotietkiem.utils.converter.WithdrawalConverter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal; 
import java.time.LocalDate; 
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@AllArgsConstructor
public class WithdrawalSlipService {
    private WithdrawalSlipRepository withdrawalSlipRepository;
    private PassbookRepository passbookRepository;
    private CommonCustomerPassbookService commonCusPassbookService;
    public List<WithdrawalSlipModel> getAllWithdrawalSlip(){
        return withdrawalSlipRepository.findAll().stream()
                .map(WithdrawalConverter::convertEntityToModel).toList();
    }

    public String insertWithdrawalSlip(WithdrawalSlipDTO withdrawalSlipDto) {
        var customer = commonCusPassbookService.getCustomerByNameAndPassbookCode(
                withdrawalSlipDto.customerName(), withdrawalSlipDto.passbookCode())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Does not exist customer: " + withdrawalSlipDto.customerName()
                                + " with passbook code: " + withdrawalSlipDto.passbookCode()));
        var passbook = passbookRepository.findByPassbookCodeAndStatus(customer.getPassbookCode(), 1)
                .orElseThrow(() -> new ResourceNotFoundException("Not found " +
                                        "passbook with code: " + customer.getPassbookCode()));
        // if (passbook.getStatus() == 0) {
        //         throw new DataNotValidException("Can not withdraw with closed passbook. Please try another passbook");
        // } 
        var term = passbook.getTerm();
        // Check whether the opened time is qualified to take out
        var dateOpened = passbook.getDateCreated();
        boolean hasQualifiedToTakeOut = ChronoUnit.DAYS.between(dateOpened,
                withdrawalSlipDto.withdrawalDate()) >= term.getDaysWithdrawn();
        if (!hasQualifiedToTakeOut) {
            throw new DataNotValidException("You cannot withdraw money because " +
                    "the number of your passbook opening date is not enough " + term.getDaysWithdrawn());
        }
        var interestMoney = commonCusPassbookService
                .calculateInterestRate(passbook, withdrawalSlipDto.withdrawalDate());
        var totalMoney = passbook.getMoney().add(interestMoney);
        var moneyLeft = BigDecimal.valueOf(0);
        if (term.getType() == 0) {
            // Check taken money with số dư hiện có(gồm lãi)
            if (withdrawalSlipDto.money().compareTo(totalMoney) > 0) {
                throw new DataNotValidException("Account balance " +
                        "is not enough to withdraw");
            } else if (withdrawalSlipDto.money().compareTo(totalMoney) < 0) {
                moneyLeft = totalMoney.subtract(withdrawalSlipDto.money());
            }
        } else {
            // Check whether the term is overdue
            boolean isNotOverDue = ChronoUnit.DAYS.between(dateOpened,
                    LocalDate.now()) < term.getMonthsOfTerm();
            if (isNotOverDue) {
                throw new DataNotValidException("Passbook is not " +
                        "expired yet, can not withdraw!");
            }
            // Check whether the customer has taken the whole money out
            if (withdrawalSlipDto.money().compareTo(totalMoney) < 0) {
                throw new DataNotValidException("Must withdraw " +
                        "the entire balance");
            } else if (withdrawalSlipDto.money().compareTo(totalMoney) > 0) {
                throw new DataNotValidException("The withdrawal amount " +
                        " has exceeded balance");
            }
        }
        commonCusPassbookService.updateMoneyByPassbookCode(passbook.getPassbookCode(),
                moneyLeft, withdrawalSlipDto.withdrawalDate());
        System.out.println("Money left: " + moneyLeft);
        // Close passbook if customer has taken the whole money out 
        if (moneyLeft.equals(BigDecimal.valueOf(0))) {
            commonCusPassbookService.deleteCustomerByCustomerCode(customer.getCustomerCode());
        }
        var withdrawalSlip = WithdrawalConverter.convertDTOtoEntity(
                withdrawalSlipDto, passbook);
        withdrawalSlipRepository.save(withdrawalSlip);
        System.out.println("-> Inserted " + withdrawalSlip);
        return "Withdraw successfully";
    }

    // Will be considered to delete
    public void deleteAllWithdrawalSlip() {
        withdrawalSlipRepository.deleteAll();
    }
}