package com.trendynet.backend.services;

import java.util.Optional;

import com.trendynet.backend.models.dto.RoleDto;
import com.trendynet.backend.models.entities.Role;

import java.util.List;


public interface RoleService {
    List<RoleDto> findAll();

    Optional<Role> findById(Long id);

    Role saveOrUpdate(Role role);

    void deleteById(Long id);
}
