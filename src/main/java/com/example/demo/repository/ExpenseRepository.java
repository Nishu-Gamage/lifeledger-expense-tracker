package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.ExpenseCategoryDto;
import com.example.demo.entity.Expense;
import com.example.demo.entity.User;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(User user);

	/* --------------------------------------------------
	 *    Get the total expense for the current month 
	 * --------------------------------------------------*/
    @Query("""
		    SELECT COALESCE(SUM(e.amount), 0)
		    FROM Expense e
		    WHERE e.user = :user
		      AND MONTH(e.expenseDate) = :month
		      AND YEAR(e.expenseDate) = :year
		""")
    	Double getTotalExpenseByMonth(
		        @Param("user") User user,
		        @Param("month") int month,
		        @Param("year") int year);	

    
	/* --------------------------------------------------
	 *    Get monthly expenses by main category
	 * --------------------------------------------------*/
    @Query("""
    	    SELECT new com.example.demo.dto.ExpenseCategoryDto(
    	        e.mainCategory,
    	        COALESCE(SUM(e.amount),0)
    	    )
    	    FROM Expense e
    	    WHERE e.user = :user
	    		AND MONTH(e.expenseDate) = :month
	    		AND YEAR(e.expenseDate) = :year
    	    GROUP BY e.mainCategory
    		ORDER BY SUM(e.amount) DESC
    	""")
	List<ExpenseCategoryDto> getCategoryTotals(
	        @Param("user") User user,
	        @Param("month") int month,
	        @Param("year") int year);
 
    
	/* --------------------------------------------------
	 *     Get total monthly expense
	 * --------------------------------------------------*/
    @Query(value = """
            SELECT COALESCE(SUM(amount),0)
            FROM expenses
            WHERE user_id = :#{#user.id}
              AND YEAR(expense_date) = :year
              AND MONTH(expense_date) = :month
            """,
            nativeQuery = true)
    Integer getTotalExpenseByYearAndMonth(User user, int year, int month);
    

	/* --------------------------------------------------
	 *     	Get Top Category
	 * --------------------------------------------------*/
    @Query(value = """
    	    SELECT main_category
    	    FROM expenses
    	    WHERE user_id = :#{#user.id}
    	      AND YEAR(expense_date) = :year
    	      AND MONTH(expense_date) = :month
    	    GROUP BY main_category
    	    ORDER BY SUM(amount) DESC
    	    LIMIT 1
    	    """,
    	    nativeQuery = true)
    
    	String getTopExpenseCategory(
    	        @Param("user") User user,
    	        @Param("year") int year,
    	        @Param("month") int month);    
    
}
