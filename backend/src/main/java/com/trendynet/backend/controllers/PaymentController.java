package com.trendynet.backend.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import com.trendynet.backend.models.dto.RequestDto;
import com.trendynet.backend.repositories.ProductRepository;
import com.trendynet.backend.services.ProductService;
import com.trendynet.backend.utils.CustomerUtil;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class PaymentController {

    String STRIPE_API_KEY = "";

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    List<Integer> newStocks = new ArrayList<>();
    List<Long> ids = new ArrayList<>();

    @PostMapping("/checkout/hosted")
    public String hostedCheckout(@RequestBody RequestDto requestDTO) throws StripeException, IOException {
        // Initialize Stripe and client base URL
        Stripe.apiKey = STRIPE_API_KEY;
        String clientBaseURL = "http://localhost:5173";

        // Find or create Stripe customer
        Customer customer = CustomerUtil.findOrCreateCustomer(requestDTO.getCustomerEmail(),
                requestDTO.getCustomerName());

        // Create checkout session parameters builder
        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder();
        paramsBuilder.setMode(SessionCreateParams.Mode.PAYMENT);
        paramsBuilder.setCustomer(customer.getId());
        paramsBuilder.setSuccessUrl(clientBaseURL + "/success?session_id={CHECKOUT_SESSION_ID}");
        paramsBuilder.setCancelUrl(clientBaseURL + "/failure");

        // Process checkout items
        int counter = 0;
        for (Product product : requestDTO.getItems()) {
            // Get product from database
            Optional<com.trendynet.backend.models.entities.Product> productFound = productRepository
                    .findById(Long.parseLong(product.getId()));

            if (productFound.isPresent()) {
                // Update product stock
                Long quantity = requestDTO.getQuantities()[counter];
                Integer newStock = productFound.get().getStock() - Integer.parseInt(String.valueOf(quantity));

                newStocks.add(newStock);
                ids.add(productFound.get().getId());


                

                // Add line item to checkout session
                paramsBuilder.addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(quantity)
                                .setPriceData(
                                        PriceData.builder()
                                                .setProductData(
                                                        PriceData.ProductData.builder()
                                                                .putMetadata("app_id", product.getId())
                                                                .setName(productFound.get().getTitle())
                                                                .build())
                                                .setCurrency("usd")
                                                .setUnitAmountDecimal(
                                                        BigDecimal.valueOf(productFound.get().getPrice() * 100))
                                                .build())
                                .build());
            }
            counter++;
        }

        // Create checkout session and return its URL
        Session session = Session.create(paramsBuilder.build());
        return session.getUrl();
    }

    @GetMapping("/success")
    String handlePaymentSuccess(@RequestParam("session_id") String sessionId) throws IOException {
        if(!newStocks.isEmpty() && !ids.isEmpty()){
            for (int i = 0; i < newStocks.size(); i++) {
                Long id = ids.get(i);
                Integer newStock = newStocks.get(i);
        
                Optional<com.trendynet.backend.models.entities.Product> productFound = productRepository.findById(id);
                if (productFound.isPresent()) {
                    productFound.get().setStock(newStock);
        
                    // Update product in database
                    productService.update(Optional.empty(), productFound.get(), id);
                }
            }
            newStocks.clear();
            ids.clear();
        }
        return "EXITOSO PAGO";
    }


}
