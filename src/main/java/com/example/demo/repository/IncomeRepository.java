package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Income;
import com.example.demo.entity.User;

public interface IncomeRepository extends JpaRepository<Income, Long>{

	@Query("SELECT COALESCE(SUM(e.amount),0) FROM Income e WHERE e.user = :user")
	Double getTotalIncomeByUser(User user);
	
	 @Query(value = """
		            SELECT COALESCE(SUM(amount),0)
		            FROM income
		            WHERE user_id = :#{#user.id}
		              AND YEAR(income_date) = :year
		              AND MONTH(income_date) = :month
		            """,
		        nativeQuery = true)
	 
    Integer getTotalIncomeByYearAndMonth(User user, int year, int month);
}
