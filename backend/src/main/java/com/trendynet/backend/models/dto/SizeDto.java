package com.trendynet.backend.models.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.trendynet.backend.models.entities.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SizeDto {
    private Long id;
    private String name;
    private List<ProductDto> products;

    public static SizeDto fromSize(Size size){
        return SizeDto.builder()
                .id(size.getId())
                .name(size.getSize())
                .products(size.getProducts().stream().map(ProductDto::fromProduct).collect(Collectors.toList()))
                .build();
    }
}
