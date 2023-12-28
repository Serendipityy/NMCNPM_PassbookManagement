package com.earntogether.qlysotietkiem.dto;

import jakarta.validation.constraints.*;

import java.math.BigInteger;
import java.time.LocalDate;

public record CustomerPassbookDTO(
        @Size(min = 5, max = 5, message = "Code must have exactly 5 digits") String passbookCode,
        @NotEmpty(message = "Customer name is blank") String name,
        @NotEmpty(message = "Address cannot be blank") String address,
        @NotNull(message = "Invalid amount") BigInteger money,
        @PositiveOrZero(message = "Invalid code") int type,
        @NotEmpty(message = "Invalid Identity card number")
        @Size(min = 10, max = 10, message = "Identity card number must have exactly " +
                "10 digits") String identityNumber,
        @NotNull(message = "Invalid passbook opening date") LocalDate dateOpened
        ) {}