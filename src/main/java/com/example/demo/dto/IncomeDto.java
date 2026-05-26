package com.example.demo.dto;

import lombok.Data;

@Data
public class IncomeDto {

    private String incomeDate;
    private String category;
    private Integer amount;
    private String noteText;
    
}
