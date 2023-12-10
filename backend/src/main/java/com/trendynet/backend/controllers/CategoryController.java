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

import com.trendynet.backend.models.dto.CategoryDto;
import com.trendynet.backend.repositories.CategoryRepository;

@RestController
@RequestMapping("/api/v1/categories")
@CrossOrigin(origins = "http://localhost:5173/")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;
    @GetMapping
    public ResponseEntity<List<CategoryDto>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryRepository.findAll().stream().map(CategoryDto::fromCategory).collect(Collectors.toList()));
    }

}
