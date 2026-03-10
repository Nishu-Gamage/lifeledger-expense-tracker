package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

	@Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
        .authorizeHttpRequests(auth -> auth
                .requestMatchers("/registration","/login","/css/**").permitAll()
                .anyRequest().authenticated()
        )
        .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard", true)
                .permitAll()
        )
        .logout(logout -> logout
                .logoutSuccessUrl("/login?logout")
        );

        return http.build();
    }
	
}
