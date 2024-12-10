package com.example.springboot.repository;

import com.example.springboot.entity.Village;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VillageRepository extends JpaRepository<Village, Long> {
}