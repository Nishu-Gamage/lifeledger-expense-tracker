package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IncomeCategoryDto {

    private String category;
    private Double totalAmount;
}
