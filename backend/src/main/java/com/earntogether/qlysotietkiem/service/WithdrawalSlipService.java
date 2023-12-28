package com.earntogether.qlysotietkiem.service;

import com.earntogether.qlysotietkiem.dto.WithdrawalSlipDTO;
import com.earntogether.qlysotietkiem.exception.DataNotValidException;
import com.earntogether.qlysotietkiem.exception.ResourceNotFoundException;
import com.earntogether.qlysotietkiem.model.WithdrawalSlipModel;
import com.earntogether.qlysotietkiem.repository.PassbookRepository;
import com.earntogether.qlysotietkiem.repository.TermRepository;
import com.earntogether.qlysotietkiem.repository.WithdrawalSlipRepository;
import com.earntogether.qlysotietkiem.utils.converter.WithdrawalConverter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.Period;
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
        var passbook = passbookRepository.findByPassbookCode(customer.getPassbookCode())
                .orElseThrow(() -> new ResourceNotFoundException( "Not found " +
                        "passbook with code: " + customer.getPassbookCode() ));
        var term = passbook.getTerm();
        // Kiểm tra thời gian mở sổ có đủ điều kiện được rút
        var currentDate = LocalDate.now();
        if(withdrawalSlipDto.withdrawalDate().isAfter(currentDate)){
            throw new DataNotValidException("Withdraw date cannot " +
                        "exceed current date.");
        }
        var dateOpened = passbook.getDateCreated();
        boolean hasQualifiedToTakeOut = ChronoUnit.DAYS.between(dateOpened,
                    currentDate) >= term.getDaysWithdrawn();
        if (!hasQualifiedToTakeOut){
            throw new DataNotValidException("You cannot withdraw money because " +
                "the number of your passbook opening date is not enough " + term.getDaysWithdrawn());
        }
        var interestMoney = commonCusPassbookService
                                        .calculateInterestRate(passbook);
        var totalMoney = passbook.getMoney().add(interestMoney);
        var moneyLeft = BigInteger.valueOf(0); // Số dư sau khi rút
        if(term.getType() == 0){
            // Kiểm tra xem số tiền rút với số dư hiện có(gồm lãi)
            if(withdrawalSlipDto.money().compareTo(totalMoney) > 0){
                throw new DataNotValidException("Account balance " +
                                                     "is not enough to withdraw");
            }else if(withdrawalSlipDto.money().compareTo(totalMoney) < 0){
                moneyLeft = totalMoney.subtract(withdrawalSlipDto.money());
            }
        }else{
            // Kiểm tra xem sổ đã quá kì hạn chưa
            boolean isNotOverDue = ChronoUnit.DAYS.between(dateOpened,
                        currentDate) < term.getMonthsOfTerm();
            if(isNotOverDue){
                throw new DataNotValidException("Passbook is not " +
                            "expired yet, cannot withdraw!");
            }
            // Kiểm tra xem có rút hêt toàn bộ không
            if(withdrawalSlipDto.money().compareTo(totalMoney) < 0){
                throw new DataNotValidException("Must withdraw " +
                            "the entire balance");
            }else if(withdrawalSlipDto.money().compareTo(totalMoney) > 0) {
                throw new DataNotValidException("The withdrawal amount " +
                            " has exceeded balance");
            }
        }
        commonCusPassbookService.updateMoneyByPassbookCode(passbook.getPassbookCode(),
                                                             moneyLeft);
        // Nếu rút hết tiền thì đóng sổ - đóng luôn Customer :V
        if(moneyLeft.equals(BigInteger.valueOf(0))) {
            commonCusPassbookService.deleteCustomerByCustomerCode(customer.getCustomerCode());
        }
        var withdralSlip = WithdrawalConverter.convertDTOtoEntity(
                withdrawalSlipDto, passbook);
        withdrawalSlipRepository.save(withdralSlip);
        System.out.println("-> Inserted " + withdralSlip);
        return "Withdraw successfully";
    }

    public void deleteAllWithdrawalSlip() {
        withdrawalSlipRepository.deleteAll();
    }
}