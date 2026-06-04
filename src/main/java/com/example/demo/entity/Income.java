package com.example.demo.entity;

import jakarta.persistence.Entity;
import java.time.LocalDate;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "income")
@Data
public class Income {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate incomeDate;
    private String category;
    private Integer amount;
    private String noteText;

    // relationship with user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
