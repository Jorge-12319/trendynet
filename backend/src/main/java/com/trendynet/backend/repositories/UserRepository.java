package com.trendynet.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trendynet.backend.models.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
