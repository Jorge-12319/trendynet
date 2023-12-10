package com.trendynet.backend.controllers;


import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendynet.backend.models.dto.ProductDto;
import com.trendynet.backend.models.entities.Product;
import com.trendynet.backend.repositories.ProductRepository;
import com.trendynet.backend.services.ProductService;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "http://localhost:5173/")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<?> save(@RequestParam("image") MultipartFile image, @RequestParam("model") String jsonObject){
        Product response = null;
        try{
            response = objectMapper.readValue(jsonObject, Product.class);
            ProductDto product = productService.save(image, response);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(product);

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Could not upload the file: " + image.getOriginalFilename() + "!");
        }
    }

    @GetMapping
    public ResponseEntity<?> getProducts(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Optional<ProductDto> op = productService.findById(id);

        if(op.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(op.orElseThrow());
        }

        return ResponseEntity.notFound().build();
    }


    @GetMapping("/image/{id}")
    public ResponseEntity<?> findImageById(@PathVariable Long id){
        Optional<Product> op = productRepository.findById(id);

        if(op.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(op.orElseThrow().getData());
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@RequestParam("image") Optional<MultipartFile> image, @RequestParam("model") String jsonObject,
    @PathVariable Long id) throws IOException{
        
        Product response = objectMapper.readValue(jsonObject, Product.class);
        Optional<ProductDto> productOptional = productService.update(image, response, id);

        if(productOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.CREATED).body(productOptional.orElseThrow());
        }

        return ResponseEntity.notFound().build();

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id){
        Optional<ProductDto> op = productService.findById(id);
        if(op.isPresent()){
            productService.removeById(id);
            return ResponseEntity.ok().body(op.orElseThrow());
        }
        
        return ResponseEntity.notFound().build();
    }

}
