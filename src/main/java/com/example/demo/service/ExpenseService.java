package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dto.ExpenseCategoryDto;
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

    // SAVE EXPENSE LIST
    public void saveExpenseList(
            List<ExpenseDto> expenseList,
            User user) {

        for (ExpenseDto dto : expenseList) {
            saveExpense(dto, user);
        }
    }
    
    // DELETE EXPENSE
    public void deleteExpense(Long id){
        expenseRepository.deleteById(id);
    }
    
    // TOTAL EXPENSE
    public Double getTotalExpense(User user){
    	
    	LocalDate now = LocalDate.now();
    	
        return expenseRepository.getTotalExpenseByMonth(
	            user,
	            now.getMonthValue(),
	            now.getYear()
	    );
    }

    // TOTAL EXPENSE BY CATEGORY
    public List<ExpenseCategoryDto> getCategoryTotals(User user) {
    	
        LocalDate now = LocalDate.now();

        return expenseRepository.getCategoryTotals(
                user,
                now.getMonthValue(),
                now.getYear());
    	
    }

	// TOTAL EXPENSE BY YEAR & MONTH
    public Integer getTotalExpenseByYearAndMonth(
            User user,
            int year,
            int month) {

        return expenseRepository.getTotalExpenseByYearAndMonth(
                user,
                year,
                month);
    }
    
    // TOP CATEGORY
    public String getTopExpenseCategory(
            User user,
            int year,
            int month) {

        String category =
                expenseRepository.getTopExpenseCategory(
                        user,
                        year,
                        month);

        return category != null ? category : "-";
    }

    // CATEGORY SUMMARY
	public List<ExpenseCategoryDto> getExpenseCategorySummary( 
			 User user, 
			 int year, 
			 int month) {
	 
	    return expenseRepository.getCategoryTotals(
	            user,
	            month,
	            year);
	}
 	
}