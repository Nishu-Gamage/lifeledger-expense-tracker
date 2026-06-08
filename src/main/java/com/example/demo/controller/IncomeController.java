package com.example.demo.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.dto.IncomeDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.IncomeService;

@Controller
public class IncomeController {

    private final IncomeService incomeService;
    private final UserRepository userRepository;
    
    public IncomeController(IncomeService incomeService,
    						UserRepository userRepository) {

        this.incomeService = incomeService;
        this.userRepository = userRepository;
    }

	@PostMapping("/addIncome")
	public String incomeConfirm(
			@ModelAttribute IncomeDto incomeDto,
	        @RequestParam String sourcePage,
            RedirectAttributes redirectAttributes) {

        // popup data
        redirectAttributes.addFlashAttribute("income", incomeDto);

        // popup open flag
        redirectAttributes.addFlashAttribute(
                "showIncomeConfirm",
                true);

        redirectAttributes.addFlashAttribute("sourcePage", sourcePage);
        
        if ("income".equals(sourcePage)) {
            return "redirect:/income";
        }

        return "redirect:/dashboard";

	}
	
	// save DB
    @PostMapping("/saveIncome")
    public String saveIncome(
            @ModelAttribute IncomeDto incomeDto, Principal principal) {
    	
	  if (principal == null) {
	        return "redirect:/login";
	  }

	  String email = principal.getName();
    
	  User user = userRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("User not found"));
	  
	  incomeService.saveIncome(incomeDto, user);    	
	
	  return "redirect:/income";
    }
}
