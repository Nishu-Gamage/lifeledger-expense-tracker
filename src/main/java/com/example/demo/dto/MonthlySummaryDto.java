package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlySummaryDto {

    private Integer month;
    private Integer totalIncome;
    private Integer totalExpense;
    private String topCategory;
    
    public MonthlySummaryDto(
            Integer month,
            Integer totalIncome,
            Integer totalExpense) {

        this.month = month;
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
    }
}
