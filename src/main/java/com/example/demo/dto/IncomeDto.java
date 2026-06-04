package com.example.demo.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class IncomeDto {

    private LocalDate incomeDate;
    private String category;
    private Integer amount;
    private String noteText;
    
}
