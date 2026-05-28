package com.example.demo.controller;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.dto.IncomeDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ExpenseService;

@Controller
public class HomeController {

    private final UserRepository userRepository;
    private final ExpenseService expenseService;

    public HomeController(UserRepository userRepository, ExpenseService expenseService) {
        this.userRepository = userRepository;
        this.expenseService = expenseService;
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
    public String dashboard(Model model,
                            Authentication authentication) {

        model.addAttribute("currentPage", "dashboard");

        model.addAttribute("incomeDto", new IncomeDto());

        if (!model.containsAttribute("showIncomeConfirm")) {

            model.addAttribute("showIncomeConfirm", false);
        }

        if (!model.containsAttribute("income")) {

            model.addAttribute("income", new IncomeDto());
        }

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
    public String income(Model model) {

        model.addAttribute("currentPage", "income");

        return "member/loged/income/income";
    }
}