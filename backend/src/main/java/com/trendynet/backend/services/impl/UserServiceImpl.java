package com.trendynet.backend.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trendynet.backend.models.dto.UserDto;
import com.trendynet.backend.models.entities.Role;
import com.trendynet.backend.models.entities.User;
import com.trendynet.backend.repositories.UserRepository;
import com.trendynet.backend.services.RoleService;
import com.trendynet.backend.services.UserService;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleService roleService;

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll().stream()
                .map(UserDto::fromUser)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserDto> findById(Long id) {
        return userRepository.findById(id)
                .map(UserDto::fromUser);
    }

    @Override
    public UserDto save(User user) {
        User savedUser = userRepository.save(user);
        if (user.getRole() != null && user.getRole().getId() != null) {
            roleService.findById(user.getRole().getId()).map(role -> {
                role.getUsers().add(user);
                return roleService.saveOrUpdate(role);
            });
        }

        return UserDto.fromUser(savedUser);
    }

    @Override
    public Optional<UserDto> update(User user, Long id) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    // Update fields of existingUser with new values from user
                    existingUser.setUsername(user.getUsername());
                    existingUser.setEmail(user.getEmail());
                    existingUser.setPassword(user.getPassword());

                    // Check if the role is being updated
                    if (user.getRole() != null && user.getRole().getId() != null) {
                        // Remove user from the old role, if any
                        Role oldRole = existingUser.getRole();
                        if (oldRole != null) {
                            oldRole.getUsers().remove(existingUser);
                        }

                        // Set the new role and update the user
                        existingUser.setRole(user.getRole());
                        user.getRole().getUsers().add(existingUser);
                        roleService.saveOrUpdate(user.getRole());
                    }

                    User updatedUser = userRepository.save(existingUser);
                    return UserDto.fromUser(updatedUser);
                });
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
