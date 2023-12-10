package com.trendynet.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.trendynet.backend.models.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
}
