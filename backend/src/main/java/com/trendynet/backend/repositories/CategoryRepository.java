package com.trendynet.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trendynet.backend.models.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
