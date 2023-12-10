package com.trendynet.backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trendynet.backend.models.dto.GenreDto;
import com.trendynet.backend.repositories.GenreRepository;

@RestController
@RequestMapping("/api/v1/genres")
@CrossOrigin(origins = "http://localhost:5173/")
public class GenreController {

    @Autowired
    private GenreRepository genreRepository;
    @GetMapping
    public ResponseEntity<List<GenreDto>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(genreRepository.findAll().stream().map(GenreDto::fromGenre).collect(Collectors.toList()));
    }

}
