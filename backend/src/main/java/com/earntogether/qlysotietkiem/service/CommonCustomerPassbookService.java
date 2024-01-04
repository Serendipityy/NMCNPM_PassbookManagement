package com.earntogether.qlysotietkiem.service;

import com.earntogether.qlysotietkiem.entity.*;
import com.earntogether.qlysotietkiem.exception.DataNotValidException;
import com.earntogether.qlysotietkiem.exception.ResourceNotFoundException;
import com.earntogether.qlysotietkiem.repository.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal; 
import java.time.LocalDate; 
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

/**
 * Mục đích: Tạo các method chung cho các Service, tránh việc class này gọi
 * phương thức class kia và class kia cũng gọi phương thức class này dẫn đến
 * lỗi "Relying upon circular references"
 * @Author:
 * @Version:
 * ...
 * */

@Service
@AllArgsConstructor
public class CommonCustomerPassbookService {
    private CustomerRepository customerRepository;
    private DepositSlipRepository depositSlipRepository;
    private WithdrawalSlipRepository withdrawalSlipRepository;
    private TermRepository termRepository;
    private PassbookRepository passbookRepository;

    // CustomerService
    public void deleteCustomerByCustomerCode(int code) {
        customerRepository.deleteByCustomerCode(code).ifPresentOrElse(
                deletedCustomer -> {
                    updatePassbookStatus(deletedCustomer.getPassbookCode(), 0);
                    System.out.println("-> Deleted " + deletedCustomer);
                },
                () -> { throw new DataNotValidException(
                        "Customer with customer code : " + code + " does not exist! ");}
        );
    }

    public Optional<Customer> getCustomerByNameAndPassbookCode(String name,
                                                                int code){
        return customerRepository.findByNameAndPassbookCode(name, code);
    }

    public void updateMoneyByPassbookCode( @Positive int code,
                                           @NotNull BigDecimal money, LocalDate date){
        var passbook = passbookRepository.findByPassbookCodeAndStatus(code, 1)
                .orElseThrow(() -> new ResourceNotFoundException("Not found " +
                        "passbook with passbook code: " + code));
                        
        passbook.setMoney(money);
        passbook.setDateTransaction(date);
        System.out.println(passbook);
        passbookRepository.save(passbook);
    }
    public String getNameByCustomerCode(int code) {
        var customer = customerRepository.findByCustomerCode(code).orElseThrow(
                () -> new ResourceNotFoundException("Not found " +
                        "customer with customer code: " + code));
        return customer.getName();
    }

    // PassbookService
    public void updatePassbookStatus(int code, int status){
        Passbook passbook = passbookRepository.findByPassbookCodeAndStatus(code, 1)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Passbook with passbook code = " + code + " is not found"));
        passbook.setStatus(status);
        passbookRepository.save(passbook);
    }

    // DepositSlip Service
    public BigDecimal getSumDepositMoney(int type, @NotNull LocalDate date) {
        List<DepositSlip> listDepositSlip = depositSlipRepository
                .findByTypeAndDepositDate(type, date);
        var sumMoney = listDepositSlip.stream()
                .map(DepositSlip::getMoney)
                .reduce(BigDecimal.valueOf(0), BigDecimal::add);
        return sumMoney;
    }

    // WithdrawalSlip Service
    public BigDecimal getSumWithdrawalMoney(int type, @NotNull LocalDate date) {
        List<WithdrawalSlip> listWithdrawalSlip = withdrawalSlipRepository
                .findByTypeAndWithdrawalDate(type, date);
        var sumMoney = listWithdrawalSlip.stream()
                .map(WithdrawalSlip::getMoney)
                .reduce(BigDecimal.valueOf(0), BigDecimal::add);
        return sumMoney;
    }

    // Passbook Service
    public BigDecimal calculateInterestRate(Passbook passbook, LocalDate date){
        // Tính số lần đáo hạn
        var term = passbook.getTerm();
        if (passbook.getDateTransaction().isBefore(date)) {
            int monthsFromPassbookOpened = Math.toIntExact(ChronoUnit.MONTHS
                    .between(passbook.getDateTransaction(), date));
            // Dùng floorDiv để lấy phần nguyên cho an toàn
            int timesMaturity = Math.floorDiv(monthsFromPassbookOpened,
                    term.getMonthsOfTerm());
            double interestRate = (double) timesMaturity * term.getInterestRate()
                    * (double) term.getMonthsOfTerm()
                    * passbook.getMoney().doubleValue();
            return BigDecimal.valueOf(interestRate);
        }
        return BigDecimal.valueOf(0);
    }
}