package com.trendynet.backend.models.dto;


import java.util.List;
import java.util.stream.Collectors;

import com.trendynet.backend.models.entities.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CategoryDto {
    private Long id;
    private String name;
    private List<ProductDto> products;

    public static CategoryDto fromCategory(Category category){
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .products(category.getProducts().stream().map(ProductDto::fromProduct).collect(Collectors.toList()))
                .build();
    }
}
