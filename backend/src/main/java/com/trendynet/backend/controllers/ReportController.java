package com.trendynet.backend.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trendynet.backend.services.ReportService;
import com.trendynet.backend.services.UserService;

import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/api/v1/reports")
@CrossOrigin(origins = "http://localhost:5173/")
public class ReportController {

    @Autowired
    private UserService userService;

    @Autowired
    ReportService reportService;

    @GetMapping("user-report/{format}")
    public ResponseEntity<ByteArrayResource> getItemReport(@PathVariable String format)
            throws JRException, IOException {

        byte[] reportContent = reportService.getUserReport(userService.findAll(), format);

        ByteArrayResource resource = new ByteArrayResource(reportContent);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(resource.contentLength())
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment().filename("user-report." + format).build().toString())
                .body(resource);
    }
}
