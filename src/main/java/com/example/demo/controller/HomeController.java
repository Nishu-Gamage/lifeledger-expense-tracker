package com.example.demo.controller;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Controller
public class HomeController {

    private final UserRepository userRepository;

    public HomeController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String index(Model model, Authentication authentication) {

        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            Optional<User> user = userRepository.findByEmail(email);
            user.ifPresent(value -> model.addAttribute("fullName", value.getFullName()));
        }

        return "portal";
    }

    // Login Form
    @GetMapping("/login")
    public String login(Authentication authentication) {

        if (authentication != null && authentication.isAuthenticated()) {
            return "redirect:/";
        }
        return "redirect:/?login";
    }
}