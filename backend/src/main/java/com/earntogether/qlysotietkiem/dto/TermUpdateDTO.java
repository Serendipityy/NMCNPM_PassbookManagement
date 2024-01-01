package com.earntogether.qlysotietkiem.dto;

import jakarta.validation.constraints.NotNull; 
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;

import java.math.BigInteger;

@Builder
public record TermUpdateDTO(
        @PositiveOrZero(message = "Invalid term type") int type,
        @NotNull(message = "Invalid minimum deposit amount") BigInteger minDeposit,
        @PositiveOrZero(message = "Invalid minimum deposit time") int minDepositTime,
        @PositiveOrZero(message = "Invalid interest rate") double interestRate
) {}