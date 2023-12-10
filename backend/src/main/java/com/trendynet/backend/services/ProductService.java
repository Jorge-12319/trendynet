package com.trendynet.backend.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.trendynet.backend.models.dto.ProductDto;
import com.trendynet.backend.models.entities.Product;

public interface ProductService {
    
    List<ProductDto> findAll();
    Optional<ProductDto> findById(Long id);
    ProductDto save(MultipartFile image, Product product) throws IOException;
    Optional<ProductDto> update(Optional<MultipartFile> image, Product product, Long id) throws IOException;
    ProductDto removeById(Long id);
}
