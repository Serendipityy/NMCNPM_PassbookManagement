package com.earntogether.qlysotietkiem.utils.converter;
 
import com.earntogether.qlysotietkiem.entity.Passbook;
import com.earntogether.qlysotietkiem.model.PassbookModel;

public class PassBookConverter {

    public static PassbookModel convertEntityToModel(Passbook passbook,
                                                     String customerName) {
        return new PassbookModel(passbook.getPassbookCode(),
        passbook.getTerm().getName(),
                passbook.getTerm().getType(),
                customerName,
                passbook.getMoney());
    }
}
