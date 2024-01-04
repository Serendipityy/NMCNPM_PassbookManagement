package com.earntogether.qlysotietkiem.model;
 
import java.math.BigDecimal;

public record PassbookModel(int passbookCode, int type, String customerName,
                            BigDecimal money
){}