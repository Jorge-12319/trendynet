package com.trendynet.backend.models.dto;

import com.trendynet.backend.models.entities.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ValidateUserDto {
    private Long id;
    private String username;
    private String email;
    private String role;
    private String password;

    public static ValidateUserDto fromUser(User user) {
        return ValidateUserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole() != null ? user.getRole().getName() : null)
                .password(user.getPassword())
                .build();
    }
}
