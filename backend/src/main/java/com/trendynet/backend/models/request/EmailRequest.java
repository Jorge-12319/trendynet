package com.trendynet.backend.models.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class EmailRequest {
    private String sender;
    private String msgBody;
    private String subject;
    private MultipartFile attachment;
}
