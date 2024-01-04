package com.earntogether.qlysotietkiem.service;

import com.earntogether.qlysotietkiem.dto.DepositSlipDTO; 
import com.earntogether.qlysotietkiem.exception.DataNotValidException;
import com.earntogether.qlysotietkiem.exception.ResourceNotFoundException;
import com.earntogether.qlysotietkiem.model.DepositSlipModel;
import com.earntogether.qlysotietkiem.repository.DepositSlipRepository;
import com.earntogether.qlysotietkiem.repository.PassbookRepository;
import com.earntogether.qlysotietkiem.utils.converter.DepositConverter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class DepositSlipService {
    private DepositSlipRepository depositSlipRepository;
    private PassbookRepository passbookRepository;
    private CommonCustomerPassbookService commonCusPassbookService;

    // Will be deleted
    public List<DepositSlipModel> getAllDepositSlip(){
        return depositSlipRepository.findAll().stream()
                .map(DepositConverter::convertEntityToModel)
                .toList();
    }

    public void insertDepositSlip(DepositSlipDTO depositSlipDto) {
        var customer = commonCusPassbookService.getCustomerByNameAndPassbookCode(
                depositSlipDto.customerName(), depositSlipDto.passbookCode())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Does not exist customer: " + depositSlipDto.customerName() +
                                " with passbook code: " + depositSlipDto.passbookCode()));
        // Check type of the indicated passbook
        var passbook = passbookRepository.findByPassbookCodeAndStatus(customer.getPassbookCode(),1)
                .orElseThrow(() -> new ResourceNotFoundException("Not found " +
                                        "passbook with passbook code: " + customer.getPassbookCode()));
        // if (passbook.getStatus() == 0) {
        //     throw new DataNotValidException("Can not deposit with closed passbook");
        // }
                        var term = passbook.getTerm();
        if (term.getType() != 0) {
            throw new DataNotValidException("Only accept deposits " +
                    "for non-term passbook");
        }
        if (depositSlipDto.money().compareTo(term.getMinDeposit()) < 0) {
            throw new DataNotValidException("Deposit amount cannot be " +
                    "less than minimum deposit amount of " + term.getMinDeposit());
        } 

        var moneyAdded = passbook.getMoney().add(depositSlipDto.money());
        commonCusPassbookService.updateMoneyByPassbookCode(
                passbook.getPassbookCode(), moneyAdded);
        var depositSlip = DepositConverter.convertDTOtoEntity(depositSlipDto,
                passbook);
        depositSlipRepository.save(depositSlip);
        System.out.println("-> Inserted " + depositSlip);
    }

    // Will be deleted
    public void deleteAllDepositSlip() {
        depositSlipRepository.deleteAll();
    }
}