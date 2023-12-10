package com.trendynet.backend.models.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.trendynet.backend.models.entities.Genre;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class GenreDto {
    private Long id;
    private String name;
    private List<ProductDto> products;

    public static GenreDto fromGenre(Genre genre){
        return GenreDto.builder()
                .id(genre.getId())
                .name(genre.getName())
                .products(genre.getProducts().stream().map(ProductDto::fromProduct).collect(Collectors.toList()))
                .build();
    }
}
