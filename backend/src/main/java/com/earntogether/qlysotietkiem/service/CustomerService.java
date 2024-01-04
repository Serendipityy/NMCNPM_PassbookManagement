package com.earntogether.qlysotietkiem.service;

import com.earntogether.qlysotietkiem.dto.CustomerPassbookDTO;
import com.earntogether.qlysotietkiem.entity.Customer;
import com.earntogether.qlysotietkiem.entity.Passbook;
import com.earntogether.qlysotietkiem.exception.DataNotValidException;
import com.earntogether.qlysotietkiem.exception.ResourceNotFoundException; 
import com.earntogether.qlysotietkiem.repository.CustomerRepository;
import com.earntogether.qlysotietkiem.repository.TermRepository;
import com.earntogether.qlysotietkiem.utils.converter.CustomerConverter; 
import lombok.AllArgsConstructor; 
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@AllArgsConstructor
public class CustomerService {
    private CustomerRepository customerRepository;
    private PassbookService passbookService;
    private TermRepository termRepository;

    // Will be considered to delete 
    public List<Customer> getAllCustomer(){
        return customerRepository.findAll();
    }

    public Customer getCustomerByCustomerCode(int code){
        var customer = customerRepository.findByCustomerCode(code).orElseThrow(
                () -> new ResourceNotFoundException("Does not exist" +
                        " customer with customer code: " + code));
        return customer;
    }

    public void insertCustomerPassbook(CustomerPassbookDTO cusPassbookDto){
        // Get term instance by type
        var term = termRepository.findByType(cusPassbookDto.type())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Indicated term does not exist. Please create new term!"));
        // Check money sent if is lower than minimum deposit
        if(cusPassbookDto.money().compareTo(term.getMinDeposit()) < 0){
            throw new DataNotValidException("The deposit amount cannot be less " +
                    "than minimum deposit amount of " + term.getMinDeposit());
        }
        // Check if identity number is exist
        if(customerRepository.findByIdentityNumber(cusPassbookDto.identityNumber()).isPresent()){
            throw new DataNotValidException("Customer with ID number: " 
		+ cusPassbookDto.identityNumber() + " already exists.");
        } 

        Customer customer = CustomerConverter.covertDTOtoEntity(cusPassbookDto);
        // Generate customer code for new customer
        customer.setCustomerCode(generateCustomerCode());
        // Check whether the indicated passbook is already exist
        int passbookCode = customer.getPassbookCode();
        passbookService.getPassbookByCodeAndStatus(passbookCode, 1).ifPresent(
                passbook -> {throw new DataNotValidException("Already existed " +
                        "passbook with code: "+ passbook.getPassbookCode());}
        );
        // Create passbook instance
        var passbook = new Passbook(null, passbookCode,
                customer.getCustomerCode(), 1, term,
                cusPassbookDto.dateOpened(), cusPassbookDto.dateOpened(), cusPassbookDto.money());
        customerRepository.save(customer);
        passbookService.insertPassbook(passbook);
        System.out.println("-> Inserted " + customer);
    }

    private int generateCustomerCode() {
        int newCode = 1;
        while(customerRepository.findByCustomerCode(newCode).isPresent()){
            newCode++;
        }
        return newCode;
    }
}