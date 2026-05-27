package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Income;

public interface IncomeRepository extends JpaRepository<Income, Long>{

}
