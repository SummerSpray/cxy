package com.example.springboot.controller;

import com.example.springboot.entity.TechTeam;
import com.example.springboot.repository.TechTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/techteams")
public class TechTeamController {

    @Autowired
    private TechTeamRepository techTeamRepository;

    @PostMapping("/create")
    public TechTeam createTechTeam(@RequestBody TechTeam techTeam) {
        if (techTeam.getType() == null) {
            techTeam.setType("驻镇工作队"); // 确保默认值
        }
        return techTeamRepository.save(techTeam);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechTeam(@PathVariable Long id) {
        if (!techTeamRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        techTeamRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}