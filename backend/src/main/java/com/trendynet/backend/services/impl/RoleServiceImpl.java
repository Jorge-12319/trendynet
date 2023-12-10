package com.trendynet.backend.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trendynet.backend.models.dto.RoleDto;
import com.trendynet.backend.models.dto.UserDto;
import com.trendynet.backend.models.entities.Role;
import com.trendynet.backend.repositories.RoleRepository;
import com.trendynet.backend.services.RoleService;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

     @Override
    public List<RoleDto> findAll() {
        List<Role> roles = roleRepository.findAll();

        return roles.stream()
            .map(role -> {
                RoleDto roleDto = new RoleDto();
                roleDto.setId(role.getId());
                roleDto.setName(role.getName());
                roleDto.setUsers(role.getUsers().stream().map(UserDto::fromUser).collect(Collectors.toList()));
                return roleDto;
            })
            .collect(Collectors.toList());
    }

    @Override
    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }

    @Override
    public Role saveOrUpdate(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void deleteById(Long id) {
        roleRepository.deleteById(id);
    }    
}
