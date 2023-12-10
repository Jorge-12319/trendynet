package com.trendynet.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trendynet.backend.models.entities.Size;

public interface SizeRepository extends JpaRepository<Size, Long>{
    
}
