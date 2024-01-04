package com.earntogether.qlysotietkiem.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DepositSlipDTO(
    @Positive(message = "Invalid passbook code") int passbookCode,
    @NotEmpty(message = "Customer name is missing") String customerName,
    @NotNull(message = "Invalid deposit date") LocalDate depositDate,
    @Positive(message = "Invalid deposit amount") BigDecimal money
){}