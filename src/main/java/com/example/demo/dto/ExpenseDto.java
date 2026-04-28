package com.example.demo.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class ExpenseDto {
	
	private Long id;
    private String mainCategory;
    private String subCategory;
    private Double amount;
    private String note;
    private LocalDate expenseDate;
    
}
