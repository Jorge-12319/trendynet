package com.trendynet.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trendynet.backend.models.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
}
