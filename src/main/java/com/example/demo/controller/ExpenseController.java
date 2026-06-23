package com.example.demo.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.dto.ExpenseDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ExpenseService;

@Controller
public class ExpenseController {

    private final ExpenseService expenseService;
    private final UserRepository userRepository;

    public ExpenseController(ExpenseService expenseService,
                             UserRepository userRepository) {
        this.expenseService = expenseService;
        this.userRepository = userRepository;
    }

    /* =====================================
	    	SINGLE EXPENSE SAVE
	 ===================================== */
    @PostMapping("/addExpense")
    public String addExpense(@ModelAttribute ExpenseDto expenseDto,
                             Principal principal) {

        if (principal == null) {
            return "redirect:/login";
        }

        String email = principal.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        expenseService.saveExpense(expenseDto, user);

        return "redirect:/expense";
    }
    

    /* =====================================
		    EXPENSE LIST SAVE
	 ===================================== */
    @PostMapping("/saveExpenseList")
    @ResponseBody
    public String saveExpenseList(
            @RequestBody
            List<ExpenseDto> expenseList,
            Principal principal) {

        if (principal == null) {
            return "LOGIN_REQUIRED";
        }

        String email =
                principal.getName();

        User user =
                userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));

        expenseService.saveExpenseList(
                expenseList,
                user
        );

        return "SUCCESS";
    }
    

    /* =====================================
		   DELETE EXPENSE FROM DB
	 ===================================== */
    
    @PostMapping("/deleteExpense")
    public String deleteExpense(
    		@RequestParam Long expenseId) {

        expenseService.deleteById(expenseId);

        return "redirect:/expense";
    }
    
}