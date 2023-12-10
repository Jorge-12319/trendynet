package com.trendynet.backend.services;

import java.util.List;

import com.trendynet.backend.models.dto.UserDto;

import net.sf.jasperreports.engine.JRException;

public interface ReportService {
    byte[] getUserReport(List<UserDto> users, String format) throws JRException;
}
