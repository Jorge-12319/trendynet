package com.trendynet.backend.models.dto;



import com.stripe.model.Product;

import lombok.Getter;

@Getter
public class RequestDto {
    Product[] items;
    String customerName;
    String customerEmail;
    Long[] quantities;
}
