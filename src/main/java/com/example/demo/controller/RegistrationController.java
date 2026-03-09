package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.dto.RegistrationDto;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;

@Controller
public class RegistrationController {

	private final UserService userService;

    public RegistrationController(UserService userService) {
        this.userService = userService;
    }
    
    // Show Registration Page
    @GetMapping("/registration")
    public String registrationPage(Model model) {
        model.addAttribute("registrationDto", new RegistrationDto());
        return "member/registration/r-registration";
    }

    // Submit Registration Form
    @PostMapping("/registration")
    public String submitForm(
            @Valid @ModelAttribute("registrationDto") RegistrationDto registrationDto,
            BindingResult bindingResult,
            Model model) {

        // password match check
        if (!registrationDto.getPassword().equals(registrationDto.getPasswordConfirm())) {
            bindingResult.rejectValue("passwordConfirm", "error.passwordConfirm", "パスワードが一致しません");
        }
    	
    	 // validation errors
        if (bindingResult.hasErrors()) {
            return "member/registration/r-registration";
        }

        // email duplicate check
        if (userService.emailExists(registrationDto.getEmail())) {
            model.addAttribute("emailError", "このメールはすでに登録されています");
            return "member/registration/r-registration";
        }
        
        // go to confirm page
        return "member/registration/r-registration-check";
    }

    // Final Confirm - Save to DB
    @PostMapping("/registration/confirm")
    public String registrationConfirm(
            @ModelAttribute("registrationDto") RegistrationDto registrationDto,
            Model model) {

        String result = userService.registerUser(registrationDto);

        if (!result.equals("SUCCESS")) {
            model.addAttribute("error", result);
            return "member/registration/r-registration";
        }

        return "portal";
    }
     
}
