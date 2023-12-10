package com.trendynet.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trendynet.backend.models.entities.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    
}
