package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Income;
import com.example.demo.entity.User;

public interface IncomeRepository extends JpaRepository<Income, Long>{

	@Query("""
		    SELECT COALESCE(SUM(e.amount), 0)
		    FROM Income e
		    WHERE e.user = :user
		      AND MONTH(e.incomeDate) = :month
		      AND YEAR(e.incomeDate) = :year
		""")
		Double getTotalIncomeByMonth(
		        @Param("user") User user,
		        @Param("month") int month,
		        @Param("year") int year);	
	
	
	 @Query(value = """
		            SELECT COALESCE(SUM(amount),0)
		            FROM income
		            WHERE user_id = :#{#user.id}
		              AND YEAR(income_date) = :year
		              AND MONTH(income_date) = :month
		            """,
		        nativeQuery = true)
	 
    Integer getTotalIncomeByYearAndMonth(User user, int year, int month);
	 
	 
	 @Query(value = """
			    SELECT category
			    FROM income
			    WHERE user_id = :#{#user.id}
			      AND YEAR(income_date) = :year
			      AND MONTH(income_date) = :month
			    GROUP BY category
			    ORDER BY SUM(amount) DESC
			    LIMIT 1
			    """,
			    nativeQuery = true)
	String getTopIncomeCategory(
			        @Param("user") User user,
			        @Param("year") int year,
			        @Param("month") int month);
	 
}
