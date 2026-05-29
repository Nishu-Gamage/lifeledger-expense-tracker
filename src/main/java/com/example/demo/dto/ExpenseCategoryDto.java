package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExpenseCategoryDto {

    private String mainCategory;
    private Double totalAmount;
        
    public ExpenseCategoryDto(String mainCategory, Number totalAmount) {
        this.mainCategory = mainCategory;
        this.totalAmount = totalAmount.doubleValue();        
    }
    
}
