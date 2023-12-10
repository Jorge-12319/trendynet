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

import com.trendynet.backend.models.dto.ColourDto;
import com.trendynet.backend.repositories.ColourRepository;

@RestController
@RequestMapping("/api/v1/colours")
@CrossOrigin(origins = "http://localhost:5173/")
public class ColourController {

    @Autowired
    private ColourRepository colourRepository;
    @GetMapping
    public ResponseEntity<List<ColourDto>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(colourRepository.findAll().stream().map(ColourDto::fromColour).collect(Collectors.toList()));
    }

}
