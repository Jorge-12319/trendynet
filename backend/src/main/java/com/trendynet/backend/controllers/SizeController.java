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

import com.trendynet.backend.models.dto.SizeDto;
import com.trendynet.backend.repositories.SizeRepository;

@RestController
@RequestMapping("/api/v1/sizes")
@CrossOrigin(origins = "http://localhost:5173/")
public class SizeController {
    
    @Autowired
    private SizeRepository sizeRepository;
    @GetMapping
    public ResponseEntity<List<SizeDto>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(sizeRepository.findAll().stream().map(SizeDto::fromSize).collect(Collectors.toList()));
    }
}
