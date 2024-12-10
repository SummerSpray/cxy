package com.example.springboot.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class VerificationController {

    private final Map<String, String> verificationCodes = new HashMap<>();

    @PostMapping("/verify-code")
    public ResponseEntity<String> verifyCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("verificationCode");

        if (email == null || code == null || !code.equals(verificationCodes.get(email))) {
            return ResponseEntity.badRequest().body("验证码错误或已过期");
        }

        return ResponseEntity.ok("验证码验证成功");
    }
}