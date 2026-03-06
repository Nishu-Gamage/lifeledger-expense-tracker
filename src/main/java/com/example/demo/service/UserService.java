package com.example.demo.service;

import java.time.LocalDateTime;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.dto.RegistrationDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // check duplicate email
    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
   
    // register user
    public String registerUser(RegistrationDto dto) {

        User user = new User();
        
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());

        // password encryption
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        
        // created time
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);

        return "SUCCESS";
    }
    
}
