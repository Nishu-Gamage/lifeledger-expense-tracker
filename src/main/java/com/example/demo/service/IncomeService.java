package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.IncomeDto;
import com.example.demo.entity.Income;
import com.example.demo.entity.User;
import com.example.demo.repository.IncomeRepository;

@Service
public class IncomeService {

	private final IncomeRepository incomeRepository;
	
	public IncomeService(
            IncomeRepository incomeRepository) {

        this.incomeRepository = incomeRepository;
    }
	
	public void saveIncome(IncomeDto incomeDto, User user) {
		Income income = new Income();

        income.setIncomeDate(incomeDto.getIncomeDate());
        income.setCategory(incomeDto.getCategory());
        income.setAmount(incomeDto.getAmount());
        income.setNoteText(incomeDto.getNoteText());
        
        income.setUser(user);        

        incomeRepository.save(income);		
	}
	
	//	TOTAL INCOME
	public Double getTotalIncome(User user) {
		return incomeRepository.getTotalIncomeByUser(user);
	}
	
	//	TOTAL INCOME BY YEAR & MONTH
	public Integer getTotalIncomeByYearAndMonth(
	        User user,
	        int year,
	        int month) {

	    return incomeRepository.getTotalIncomeByYearAndMonth(
	            user,
	            year,
	            month);
	}
}
