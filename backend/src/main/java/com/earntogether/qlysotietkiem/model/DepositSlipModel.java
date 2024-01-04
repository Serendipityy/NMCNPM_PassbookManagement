package com.earntogether.qlysotietkiem.model;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
public record DepositSlipModel(String id, int customerCode, int passbookCode,
                               int type, LocalDate depositDate,
                               BigDecimal money
) {}
