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

import com.trendynet.backend.models.dto.BrandDto;
import com.trendynet.backend.repositories.BrandRepository;

@RestController
@RequestMapping("/api/v1/brands")
@CrossOrigin(origins = "http://localhost:5173/")
public class BrandController {

    @Autowired
    private BrandRepository brandRepository;
    @GetMapping
    public ResponseEntity<List<BrandDto>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(brandRepository.findAll().stream().map(BrandDto::fromBrand).collect(Collectors.toList()));
    }

}
