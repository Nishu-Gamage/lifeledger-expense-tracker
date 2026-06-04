package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.MonthlySummaryDto;
import com.example.demo.entity.User;

@Service
public class DashboardService {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    
    public DashboardService(
            IncomeService incomeService,
            ExpenseService expenseService) {

        this.incomeService = incomeService;
        this.expenseService = expenseService;
    }
    
    public List<MonthlySummaryDto> getMonthlySummaries(
            User user,
            int year) {

        List<MonthlySummaryDto> list = new ArrayList<>();

        for (int month = 1; month <= 12; month++) {

            Integer income =
                    incomeService.getTotalIncomeByYearAndMonth(
                            user,
                            year,
                            month);

            Integer expense =
                    expenseService.getTotalExpenseByYearAndMonth(
                            user,
                            year,
                            month);
            
            list.add(
                    new MonthlySummaryDto(
                            month,
                            income,
                            expense
                    )
            );
            
        }

        return list;
    }
    
}
