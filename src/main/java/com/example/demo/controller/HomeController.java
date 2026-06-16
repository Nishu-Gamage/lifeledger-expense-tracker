package com.example.demo.controller;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.dto.ExpenseCategoryDto;
import com.example.demo.dto.IncomeCategoryDto;
import com.example.demo.dto.IncomeDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.DashboardService;
import com.example.demo.service.ExpenseService;
import com.example.demo.service.IncomeService;

@Controller
public class HomeController {

    private final UserRepository userRepository;
    private final ExpenseService expenseService;
    private final IncomeService incomeService;    
    private final DashboardService dashboardService;

    public HomeController(UserRepository userRepository, ExpenseService expenseService, IncomeService incomeService, DashboardService dashboardService) {
        this.userRepository = userRepository;
        this.expenseService = expenseService;
        this.incomeService = incomeService;
        this.dashboardService = dashboardService;
    }
    
    // HOME
    @GetMapping("/")
    public String index(Model model, Authentication authentication) {

        model.addAttribute("currentPage", "home");

        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();

            Optional<User> user = userRepository.findByEmail(email);

            user.ifPresent(value ->
                model.addAttribute("fullName", value.getFullName())
            );
        }

        return "portal";
    }
    
    // LOGIN
    @GetMapping("/login")
    public String login(Authentication authentication) {

        if (authentication != null && authentication.isAuthenticated()) {
            return "redirect:/dashboard";
        }

        return "redirect:/?login";
    }
    
    // DASHBOARD
    @GetMapping("/dashboard")
    public String dashboard(
    						@RequestParam(required = false) Integer year,
    				        @RequestParam(required = false) String tab,
    						Model model,
                            Authentication authentication) {

        model.addAttribute("currentPage", "dashboard");
        model.addAttribute("sourcePage", "dashboard");
        model.addAttribute("incomeDto", new IncomeDto());
        model.addAttribute("activeTab", tab);

        if (!model.containsAttribute("showIncomeConfirm")) {

            model.addAttribute("showIncomeConfirm", false);
        }

        if (!model.containsAttribute("income")) {

            model.addAttribute("income", new IncomeDto());
        }
        
        // Select the year for the displayed results
        int currentYear = Year.now().getValue();
        
        if (year == null) {
        	year = currentYear;
        }

        final int selectedYear = year;

        model.addAttribute("currentYear", year);

        model.addAttribute("years",
                IntStream.rangeClosed(currentYear - 5, currentYear)
                        .boxed()
                        .toList()
        );
        
        if (authentication != null) {

            String email = authentication.getName();

            userRepository.findByEmail(email)
	            	.ifPresent(user -> {
		                	model.addAttribute(
		                        "fullName",
		                        user.getFullName());

	                		Double totalExpense = expenseService.getTotalExpense(user);
	
			                model.addAttribute(
			                        "totalExpense",
			                        totalExpense);
			                
			                Double totalIncome = incomeService.getTotalIncome(user);
			                
			                model.addAttribute(
			                		"totalIncome",
			                		totalIncome);
			                
			                // TOTAL EXPENSE BY CATEGORY
			                List<ExpenseCategoryDto> categoryTotals =  expenseService.getCategoryTotals(user);

			                model.addAttribute(
			                        "categoryTotals",
			                        categoryTotals);
			                
			                // MONTHLY SUMMARY
			                model.addAttribute(
			                        "monthlySummaries",
			                        dashboardService.getMonthlySummaries(
			                                user,
			                                selectedYear)
			                );

            });
        }

        return "member/loged/dashboard";
    }
    
    // EXPENSE PAGE
    @GetMapping("/expense")
    public String expense(Model model) {

        model.addAttribute("currentPage", "expense");

        return "member/loged/expense/expense";
    }

    // INCOME PAGE
    @GetMapping("/income")
    public String income(
	            @RequestParam(required = false) Integer summaryYear,
	            @RequestParam(required = false) Integer comparisonYear,
	            
	            @RequestParam(required = false) Integer month,
	            @RequestParam(required = false) String tab,
	            
	            Model model,
	            Authentication authentication) {

        model.addAttribute("currentPage", "income");
        model.addAttribute("sourcePage", "income");
    	
    	if (!model.containsAttribute("showIncomeConfirm")) {
            model.addAttribute("showIncomeConfirm", false);
        }
    	
    	if (!model.containsAttribute("income")) {
            model.addAttribute("income", new IncomeDto());
        }

        int currentYear = Year.now().getValue();
        int currentMonth = LocalDate.now().getMonthValue();

        if(summaryYear == null){
            summaryYear = currentYear;
        }

        if(comparisonYear == null){
            comparisonYear = currentYear;
        }
        
        if (month == null) {
            month = currentMonth;
        }
        
        model.addAttribute("selectedYear", summaryYear);
        model.addAttribute("selectedMonth", month);
        model.addAttribute("comparisonYear", comparisonYear);
        
        model.addAttribute(
                "years",
                IntStream.rangeClosed(2020, currentYear)
                        .boxed()
                        .toList());

        if (authentication != null) {

            String email = authentication.getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow();

            Integer totalIncome =
                    incomeService.getTotalIncomeByYearAndMonth(
                            user,
                            summaryYear,
                            month);
            
            String topCategory =
                    incomeService.getTopIncomeCategory(
                            user,
                            summaryYear,
                            month);
            
            List<IncomeCategoryDto> incomeCategorySummary =
                    incomeService.getIncomeCategorySummary(
                            user,
                            summaryYear,
                            month);

            model.addAttribute(
                    "incomeCategorySummary",
                    incomeCategorySummary);
            
            model.addAttribute(
                    "incomeList",
                    incomeService.getIncomeList(
                            user,
                            summaryYear,
                            month));

            model.addAttribute(
                    "monthlyIncomeSummary",
                    incomeService.getMonthlyIncomeSummary(
                            user,
                            comparisonYear));

            model.addAttribute(
                    "topCategory",
                    topCategory);

            model.addAttribute(
                    "totalIncome",
                    totalIncome);

        }
        
        model.addAttribute("activeTab", tab);
        
        return "member/loged/income/income";
    }
}