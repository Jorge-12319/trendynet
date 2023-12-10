package com.trendynet.backend.models.dto;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.trendynet.backend.models.entities.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private Integer stock;
    private String url;
    private String category;
    private String brand;
    private String colour;
    private String genre;
    private String size;

    public static ProductDto fromProduct(Product product) {
        String url = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/api/v1/products/image/")
                .path(String.valueOf(product.getId()))
                .toUriString();

        return ProductDto.builder()
                .id(product.getId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .url(url)
                .category(product.getCategory().getName())
                .brand(product.getBrand().getName())
                .colour(product.getColour().getName())
                .genre(product.getGenre().getName())
                .size(product.getSize().getSize())
                .build();
    }
}
