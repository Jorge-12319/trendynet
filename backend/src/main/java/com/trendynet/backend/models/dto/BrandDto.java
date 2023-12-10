package com.trendynet.backend.models.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.trendynet.backend.models.entities.Brand;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class BrandDto {
    private Long id;
    private String name;
    private List<ProductDto> products;

    public static BrandDto fromBrand(Brand brand){
        return BrandDto.builder()
                .id(brand.getId())
                .name(brand.getName())
                .products(brand.getProducts().stream().map(ProductDto::fromProduct).collect(Collectors.toList()))
                .build();
    }
}
