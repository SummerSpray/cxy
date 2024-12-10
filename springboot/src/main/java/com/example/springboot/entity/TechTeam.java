package com.example.springboot.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Table(name = "techteams")
public class TechTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false)
    private String type = "驻镇工作队"; // 设置默认值

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdAt", updatable = false)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updatedAt")
    private Date updatedAt;

    // 构造函数
    public TechTeam() {
        this.type = "驻镇工作队"; // 确保默认值
    }

    public TechTeam(String name, String type) {
        this.name = name;
        this.type = type != null ? type : "驻镇工作队"; // 确保默认值
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type != null ? type : "驻镇工作队"; // 确保默认值
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
