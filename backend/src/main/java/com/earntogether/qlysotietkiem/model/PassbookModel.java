package com.earntogether.qlysotietkiem.model;
 
import java.math.BigInteger;

public record PassbookModel(int passbookCode, int type, String customerName,
                            BigInteger money
){}