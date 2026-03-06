package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegistrationDto {

    @NotBlank(message = "名前を入力ください。")
	private String fullName;

    @NotBlank(message = "メールアドレスを入力ください。")
    @Email(message = "無効なメール形式です。")
	private String email;

    @NotBlank(message = "パスワードを入力ください。")
    @Size(min = 6, message = "パスワードは6文字以上でなければなりませ。")
	private String password;
    
    private String passwordConfirm;
    
}
