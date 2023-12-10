package com.trendynet.backend.services.impl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.trendynet.backend.models.dto.ProductDto;
import com.trendynet.backend.models.entities.Brand;
import com.trendynet.backend.models.entities.Category;
import com.trendynet.backend.models.entities.Colour;
import com.trendynet.backend.models.entities.Genre;
import com.trendynet.backend.models.entities.Product;
import com.trendynet.backend.models.entities.Size;
import com.trendynet.backend.repositories.BrandRepository;
import com.trendynet.backend.repositories.CategoryRepository;
import com.trendynet.backend.repositories.ColourRepository;
import com.trendynet.backend.repositories.GenreRepository;
import com.trendynet.backend.repositories.ProductRepository;
import com.trendynet.backend.repositories.SizeRepository;
import com.trendynet.backend.services.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ColourRepository colourRepository;

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Transactional(readOnly = true)
    @Override
    public List<ProductDto> findAll() {

        return productRepository.findAll().stream().map(ProductDto::fromProduct).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<ProductDto> findById(Long id) {
        return productRepository.findById(id).map(ProductDto::fromProduct);
    }

    @Transactional
    @Override
    public ProductDto save(MultipartFile image, Product product) throws IOException {
        String imageName = StringUtils.cleanPath(image.getOriginalFilename());
        Product pro = new Product(imageName, image.getContentType(), image.getBytes());
        mapProductFields(product, pro);

        Category categoryFound = categoryRepository.findById(product.getCategory().getId()).orElseThrow();
        handleCategoryProductRelation(categoryFound, pro);

        Brand brandFound = brandRepository.findById(product.getBrand().getId()).orElseThrow();
        handleBrandProductRelation(brandFound, pro);

        Colour colourFound = colourRepository.findById(product.getColour().getId()).orElseThrow();
        handleColourProductRelation(colourFound, pro);

        Genre genreFound = genreRepository.findById(product.getGenre().getId()).orElseThrow();
        handleGenreProductRelation(genreFound, pro);

        Size sizeFound = sizeRepository.findById(product.getSize().getId()).orElseThrow();
        handleSizeProductRelation(sizeFound, pro);

        return ProductDto.fromProduct(productRepository.save(pro));
    }

    @Transactional
    @Override
    public Optional<ProductDto> update(Optional<MultipartFile> image, Product product, Long id) throws IOException {
        Optional<Product> productDB = productRepository.findById(id);

        if (productDB.isPresent()) {
            Product existingProduct = productDB.get();

            // Actualizar campos de imagen si es proporcionada
            if (image.isPresent()) {
                try {
                    String imageName = StringUtils.cleanPath(image.get().getOriginalFilename());
                    existingProduct.setName(imageName);
                    existingProduct.setData(image.get().getBytes());
                    existingProduct.setType(image.get().getContentType());
                } catch (IOException e) {
                    throw new RuntimeException("Error al manejar la imagen del producto.", e);
                }
            }

            // Actualizar otros campos del producto
            mapProductFields(product, existingProduct);

            // Actualizar relaciones bidireccionales
            updateProductRelations(existingProduct, product);

            // Guardar el producto actualizado
            return Optional.of(ProductDto.fromProduct(productRepository.save(existingProduct)));
        }

        return Optional.empty();
    }

    private void updateProductRelations(Product existingProduct, Product updatedProduct) {
        // Actualizar relación con la categoría
        Category categoryFound = categoryRepository.findById(updatedProduct.getCategory().getId()).orElseThrow();
        handleCategoryProductRelation(categoryFound, existingProduct);

        // Actualizar relación con la marca
        Brand brandFound = brandRepository.findById(updatedProduct.getBrand().getId()).orElseThrow();
        handleBrandProductRelation(brandFound, existingProduct);

        // Actualizar relación con el color
        Colour colourFound = colourRepository.findById(updatedProduct.getColour().getId()).orElseThrow();
        handleColourProductRelation(colourFound, existingProduct);

        // Actualizar relación con el género
        Genre genreFound = genreRepository.findById(updatedProduct.getGenre().getId()).orElseThrow();
        handleGenreProductRelation(genreFound, existingProduct);

        Size sizeFound = sizeRepository.findById(updatedProduct.getSize().getId()).orElseThrow();
        handleSizeProductRelation(sizeFound, updatedProduct);
    }

    @Transactional
    @Override
    public ProductDto removeById(Long id) {
        Optional<Product> op = productRepository.findById(id);
        if (op.isPresent()) {
            productRepository.deleteById(id);
        }
        return op.map(ProductDto::fromProduct).orElseThrow();
    }

    private void mapProductFields(Product source, Product destination) {
        destination.setTitle(source.getTitle());
        destination.setDescription(source.getDescription());
        destination.setPrice(source.getPrice());
        destination.setStock(source.getStock());
        destination.setCategory(source.getCategory());
        destination.setBrand(source.getBrand());
        destination.setColour(source.getColour());
        destination.setGenre(source.getGenre());
        destination.setSize(source.getSize());
    }

    private void handleCategoryProductRelation(Category category, Product product) {
        category.getProducts().add(product);
        categoryRepository.save(category);
    }

    private void handleBrandProductRelation(Brand brand, Product product) {
        brand.getProducts().add(product);
        brandRepository.save(brand);
    }

    private void handleColourProductRelation(Colour colour, Product product) {
        colour.getProducts().add(product);
        colourRepository.save(colour);
    }

    private void handleGenreProductRelation(Genre genre, Product product) {
        genre.getProducts().add(product);
        genreRepository.save(genre);
    }

    private void handleSizeProductRelation(Size size, Product product) {
        size.getProducts().add(product);
        sizeRepository.save(size);
    }

    
}
