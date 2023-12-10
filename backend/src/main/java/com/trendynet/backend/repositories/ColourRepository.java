package com.trendynet.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trendynet.backend.models.entities.Colour;

public interface ColourRepository extends JpaRepository<Colour, Long>{
    
}
