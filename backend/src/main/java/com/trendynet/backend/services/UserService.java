package com.trendynet.backend.services;

import java.util.List;
import java.util.Optional;

import com.trendynet.backend.models.dto.UserDto;
import com.trendynet.backend.models.entities.User;

public interface UserService {
    List<UserDto> findAll();
    Optional<UserDto> findById(Long id);
    UserDto save(User user);
    Optional<UserDto> update(User user, Long id);
    void deleteById(Long id);
}
