package com.example.springboot.controller;

import com.example.springboot.entity.Village;
import com.example.springboot.repository.VillageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/villages")
public class VillageController {

    @Autowired
    private VillageRepository villageRepository;

    @PostMapping("/create")
    public Village createVillage(@RequestBody Village village) {
        return villageRepository.save(village);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVillage(@PathVariable Long id) {
        if (!villageRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        villageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}