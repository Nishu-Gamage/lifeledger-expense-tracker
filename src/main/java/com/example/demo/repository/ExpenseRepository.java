package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.dto.ExpenseCategoryDto;
import com.example.demo.entity.Expense;
import com.example.demo.entity.User;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(User user);
    
    @Query("SELECT COALESCE(SUM(e.amount),0) FROM Expense e WHERE e.user = :user")
    Double getTotalExpenseByUser(User user);

    @Query("""
    	    SELECT new com.example.demo.dto.ExpenseCategoryDto(
    	        e.mainCategory,
    	        COALESCE(SUM(e.amount),0)
    	    )
    	    FROM Expense e
    	    WHERE e.user = :user
    	    GROUP BY e.mainCategory
    		ORDER BY SUM(e.amount) DESC
    	""")
	List<ExpenseCategoryDto> getCategoryTotals(User user);
    
}
