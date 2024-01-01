package com.earntogether.qlysotietkiem.utils.converter;

import com.earntogether.qlysotietkiem.dto.DepositSlipDTO; 
import com.earntogether.qlysotietkiem.entity.DepositSlip;
import com.earntogether.qlysotietkiem.entity.Passbook;
import com.earntogether.qlysotietkiem.model.DepositSlipModel; 

public class DepositConverter {
    public static DepositSlipModel convertEntityToModel(DepositSlip depositSlip) {
        return DepositSlipModel.builder()
                .id(depositSlip.getId())
                .customerCode(depositSlip.getCustomerCode())
                .passbookCode(depositSlip.getPassbookCode())
                .type(depositSlip.getType())
                .depositDate(depositSlip.getDepositDate())
                .money(depositSlip.getMoney())
                .build();
    }

    public static DepositSlip convertDTOtoEntity(DepositSlipDTO depositDto,
                                                 Passbook passbook) {
        return DepositSlip.builder()
                .passbookCode(depositDto.passbookCode())
                .customerCode(passbook.getCustomerCode())
                .type(passbook.getTerm().getType())
                .depositDate(depositDto.depositDate())
                .money(depositDto.money())
                .build();
    }
}
