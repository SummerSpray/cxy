package com.example.springboot.controller;

import com.example.springboot.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-verification-code")
    public Map<String, String> sendVerificationCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // 确保 email 存在
        if (email == null || email.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "邮箱不能为空");
            return response;
        }

        // 生成验证码
        String code = String.format("%06d", new Random().nextInt(999999));

        try {
            // 发送邮件
            emailService.sendVerificationCode(email, code);
        } catch (Exception e) {
            // 捕获异常，输出错误信息
            System.out.println("发送验证码失败：" + e.getMessage());
            Map<String, String> response = new HashMap<>();
            response.put("message", "验证码发送失败");
            return response;
        }

        // 返回响应，包含验证码
        Map<String, String> response = new HashMap<>();
        response.put("message", "验证码发送成功");
        response.put("verificationCode", code); // 返回验证码给前端
        return response;
    }

    @PostMapping("/users")
    public Map<String, String> registerUser(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("verificationCode");

        // 校验验证码
        if (!code.equals(request.get("verificationCode"))) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "验证码错误或已过期");
            return response;
        }

        // 注册逻辑（这里只是模拟注册成功）
        String username = request.get("username");
        String password = request.get("password");
        System.out.println("注册成功！用户名：" + username + "，邮箱：" + email);

        Map<String, String> response = new HashMap<>();
        response.put("message", "注册成功");
        return response;
    }
}