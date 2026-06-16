package com.example.demo.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.IncomeCategoryDto;
import com.example.demo.dto.IncomeDto;
import com.example.demo.dto.MonthlySummaryDto;
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
		
		LocalDate now = LocalDate.now();

	    return incomeRepository.getTotalIncomeByMonth(
	            user,
	            now.getMonthValue(),
	            now.getYear()
	    );
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
	
	// GET TOP INCOME CATEGORY BY YEAR & MONTH
	public String getTopIncomeCategory(
	        User user,
	        int year,
	        int month) {

		String category =
	            incomeRepository.getTopIncomeCategory(
	                    user,
	                    year,
	                    month);
		
	    return category != null ? category : "-";
	}
	
	// GET ALL　TOTAL INCOME CATEGORY BY YEAR & MONTH
	public List<IncomeCategoryDto> getIncomeCategorySummary(
	        User user,
	        int year,
	        int month) {

	    List<Object[]> rows =
	            incomeRepository.getIncomeCategorySummary(
	                    user,
	                    year,
	                    month);

	    List<IncomeCategoryDto> result =
	            new ArrayList<>();

	    for (Object[] row : rows) {

	        String category = (String) row[0];

	        Double total =
	                ((Number) row[1]).doubleValue();

	        result.add(
	                new IncomeCategoryDto(
	                        category,
	                        total));
	    }

	    return result;
	}
	
	// GET ALL　INCOME DATA BY YEAR & MONTH
	public List<Income> getIncomeList(
	        User user,
	        int year,
	        int month) {

	    return incomeRepository.findByUserAndYearAndMonth(
	            user,
	            year,
	            month);
	}
	
	// DELETE INCOME
	public void deleteIncome(Long incomeId) {

	    incomeRepository.deleteById(
	            incomeId);
	}
	
	// UPDATE INCOME
	public void updateIncome(
	        Long incomeId,
	        String incomeDate,
	        String category,
	        Integer amount,
	        String noteText) {

	    Income income =
	            incomeRepository.findById(incomeId)
	                    .orElseThrow();

	    income.setIncomeDate(
	            LocalDate.parse(incomeDate));

	    income.setCategory(category);

	    income.setAmount(amount);

	    income.setNoteText(noteText);

	    incomeRepository.save(income);
	}
	
	// GET THE TOTAL MONTHLY INCOME
	public List<MonthlySummaryDto> getMonthlyIncomeSummary(
	        User user,
	        int year) {

	    List<MonthlySummaryDto> list = new ArrayList<>();

	    for (int month = 1; month <= 12; month++) {

	        Integer totalIncome =
	                getTotalIncomeByYearAndMonth(
	                        user,
	                        year,
	                        month);

	        String topCategory =
	                getTopIncomeCategory(
	                        user,
	                        year,
	                        month);

	        MonthlySummaryDto dto =
	                new MonthlySummaryDto();

	        dto.setMonth(month);
	        dto.setTotalIncome(totalIncome);
	        dto.setTopCategory(topCategory);

	        list.add(dto);
	    }

	    return list;
	}
	
	// CHECK IF THE USER HAS DATA
	public boolean hasIncomeData(User user) {

	    return incomeRepository.existsByUser(user);
	}
	
}
