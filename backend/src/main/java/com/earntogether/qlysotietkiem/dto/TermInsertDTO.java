package com.earntogether.qlysotietkiem.dto;

import jakarta.validation.constraints.*;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record TermInsertDTO(
        @PositiveOrZero(message = "Invalid number of term months") int monthsOfTerm,
        @PositiveOrZero(message = "Invalid interest rate") double interestRate,
        @NotNull(message = "Invalid minimum deposit amount") BigDecimal minDeposit
) {}