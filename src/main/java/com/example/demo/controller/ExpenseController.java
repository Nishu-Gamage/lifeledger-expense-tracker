package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ExpenseController {
		
	@PostMapping("/addExpense")
	public String addExpense(
	        @RequestParam String item,
	        @RequestParam(required = false) String subcategory,
	        @RequestParam(required = false) String note,
	        @RequestParam String amount,
	        @RequestParam String date) {

	    System.out.println("Item: " + item);
	    System.out.println("Subcategory: " + subcategory);
	    System.out.println("Note: " + note);
	    System.out.println("Amount: " + amount);
	    System.out.println("Date: " + date);

	    return "redirect:/dashboard";
	}
	
}
