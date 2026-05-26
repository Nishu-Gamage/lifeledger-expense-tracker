package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.dto.IncomeDto;

@Controller
public class IncomeController {

	@PostMapping("/addIncome")
	public String incomeConfirm(
			@ModelAttribute IncomeDto incomeDto,
            RedirectAttributes redirectAttributes) {

        // popup data
        redirectAttributes.addFlashAttribute("income", incomeDto);

        // popup open flag
        redirectAttributes.addFlashAttribute(
                "showIncomeConfirm",
                true);

        return "redirect:/dashboard";

	}
}
