package com.earntogether.qlysotietkiem.utils.converter;

import com.earntogether.qlysotietkiem.dto.CustomerPassbookDTO;
import com.earntogether.qlysotietkiem.entity.Customer;
import com.earntogether.qlysotietkiem.exception.DataNotValidException;

import java.util.regex.Pattern;

public class CustomerConverter {
    public static Customer covertDTOtoEntity(CustomerPassbookDTO cusPassbookDto){
        if(!Pattern.matches("\\d{5}",cusPassbookDto.passbookCode())){
            throw new DataNotValidException("Passbook code does not have enough 5 digits");
        }
        int passbookCode = Integer.valueOf(cusPassbookDto.passbookCode());
        return Customer.builder()
                .customerCode(-1)
                .name(cusPassbookDto.name())
                .address(cusPassbookDto.address())
                .identityNumber(cusPassbookDto.identityNumber())
                .passbookCode(passbookCode)
                .build();
    }
}
