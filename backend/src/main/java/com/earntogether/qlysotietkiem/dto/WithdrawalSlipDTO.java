package com.earntogether.qlysotietkiem.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.time.LocalDate;

public record WithdrawalSlipDTO(
    @Positive(message = "Invalid passbook code") int passbookCode,
    @NotEmpty(message = "Customer name is missing") String customerName,
    @NotNull(message = "Invalid withdrawal date") LocalDate withdrawalDate,
    @NotNull(message = "Invalid withdrawal amount") BigInteger money
){}