package com.example.demo.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	
	@GetMapping("/")
    public String index() {
        return "portal";
    }

	// Login Form
    @GetMapping("/login")
    public String login(Authentication authentication) {

        if (authentication != null && authentication.isAuthenticated()) {
            return "redirect:/";
        }

        return "member/login";
    }
    
}
