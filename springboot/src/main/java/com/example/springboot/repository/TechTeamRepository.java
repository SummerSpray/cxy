package com.example.springboot.repository;

import com.example.springboot.entity.TechTeam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechTeamRepository extends JpaRepository<TechTeam, Long> {
}