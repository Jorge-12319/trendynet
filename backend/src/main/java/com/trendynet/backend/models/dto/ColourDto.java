package com.trendynet.backend.models.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.trendynet.backend.models.entities.Colour;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ColourDto {
    private Long id;
    private String name;
    private List<ProductDto> products;

    public static ColourDto fromColour(Colour colour){
        return ColourDto.builder()
                .id(colour.getId())
                .name(colour.getName())
                .products(colour.getProducts().stream().map(ProductDto::fromProduct).collect(Collectors.toList()))
                .build();
    }
}
