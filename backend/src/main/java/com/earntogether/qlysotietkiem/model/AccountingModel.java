package com.earntogether.qlysotietkiem.model;


import java.math.BigDecimal;

public record AccountingModel(String termName, int type,
                              BigDecimal totalRevenue,
                              BigDecimal totalExpenditure
) {}
