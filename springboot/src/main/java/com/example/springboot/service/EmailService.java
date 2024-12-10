package com.example.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationCode(String toEmail, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("1922856923@qq.com");
        message.setTo(toEmail); // 收件人
        message.setSubject("验证码 - 你的验证码是"); // 邮件主题
        message.setText("你好！\n\n你的验证码是： " + code + "\n\n此验证码有效期为5分钟。"); // 邮件内容

        mailSender.send(message); // 发送邮件
    }
}
