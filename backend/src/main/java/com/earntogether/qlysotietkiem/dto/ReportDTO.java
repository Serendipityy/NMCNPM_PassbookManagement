package com.earntogether.qlysotietkiem.dto;
 
import jakarta.validation.constraints.NotNull; 
import jakarta.validation.constraints.PositiveOrZero;

import java.time.YearMonth;

public record ReportDTO(
        @PositiveOrZero(message = "Invalid term type") int type,
        @NotNull(message = "Invalid year and month") YearMonth monthYear
) {}