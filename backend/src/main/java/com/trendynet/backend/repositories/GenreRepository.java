package com.trendynet.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trendynet.backend.models.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    
}
