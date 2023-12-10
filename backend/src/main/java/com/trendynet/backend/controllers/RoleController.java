package com.trendynet.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trendynet.backend.models.dto.RoleDto;
import com.trendynet.backend.services.RoleService;


@RestController
@RequestMapping("/api/v1/roles")
@CrossOrigin(origins = "http://localhost:5173/")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    public ResponseEntity<List<RoleDto>> findAll() {
        List<RoleDto> roles = roleService.findAll();

        return ResponseEntity.ok().body(roles);
    }

}
