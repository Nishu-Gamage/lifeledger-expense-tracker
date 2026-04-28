package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dto.ExpenseDto;
import com.example.demo.entity.Expense;
import com.example.demo.entity.User;
import com.example.demo.repository.ExpenseRepository;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // SAVE EXPENSE
    public void saveExpense(ExpenseDto dto, User user) {

        Expense expense = new Expense();

        expense.setMainCategory(dto.getMainCategory());
        expense.setSubCategory(dto.getSubCategory());
        expense.setNote(dto.getNote());
        expense.setAmount(dto.getAmount());
        expense.setExpenseDate(dto.getExpenseDate());

        expense.setUser(user);

        expenseRepository.save(expense);
    }

    // GET USER EXPENSES
    public List<ExpenseDto> getUserExpenses(User user){

        List<Expense> expenses = expenseRepository.findByUser(user);

        return expenses.stream().map(exp -> {

            ExpenseDto dto = new ExpenseDto();

            dto.setId(exp.getId());
            dto.setMainCategory(exp.getMainCategory());
            dto.setSubCategory(exp.getSubCategory());
            dto.setAmount(exp.getAmount());
            dto.setNote(exp.getNote());
            dto.setExpenseDate(exp.getExpenseDate());

            return dto;

        }).collect(Collectors.toList());
    }

    // DELETE EXPENSE
    public void deleteExpense(Long id){
        expenseRepository.deleteById(id);
    }

}