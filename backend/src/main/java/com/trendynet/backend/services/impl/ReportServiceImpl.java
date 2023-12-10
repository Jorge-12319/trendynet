package com.trendynet.backend.services.impl;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.trendynet.backend.models.dto.UserDto;
import com.trendynet.backend.services.ReportService;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.util.JRSaver;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

@Service
public class ReportServiceImpl implements ReportService{
    public byte[] getUserReport(List<UserDto> users, String format) throws JRException {

    JasperReport jasperReport;

    try {
        // Try to load the compiled report from the file system
        jasperReport = (JasperReport) JRLoader.loadObject(ResourceUtils.getFile("user-report.jasper"));
    } catch (FileNotFoundException | JRException e) {
        try {
            // If the compiled report is not found, compile the JRXML and save the compiled report
            File file = ResourceUtils.getFile("classpath:user-report.jrxml");
            jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
            JRSaver.saveObject(jasperReport, "user-report.jasper");
        } catch (FileNotFoundException | JRException ex) {
            throw new RuntimeException(ex);
        }
    }

    // Set report data
    JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(users);
    Map<String, Object> parameters = new HashMap<>();
    parameters.put("title", "User Report");

    // Fill report
    JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

    // Export the filled report to the specified format
    byte[] reportContent;
    try {
        switch (format) {
            case "pdf" -> reportContent = JasperExportManager.exportReportToPdf(jasperPrint);
            case "xml" -> reportContent = JasperExportManager.exportReportToXml(jasperPrint).getBytes();
            case "xlsx" -> reportContent = exportToExcel(jasperPrint);
            // Add more cases for other formats if needed
            default -> throw new RuntimeException("Unknown report format");
        }
    } catch (JRException e) {
        throw new RuntimeException(e);
    }

    return reportContent;
}

    private byte[] exportToExcel(JasperPrint jasperPrint) throws JRException{
        JRXlsxExporter exporter = new JRXlsxExporter();
        byte reportContent[];
        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(byteArrayOutputStream));
        exporter.exportReport();
        reportContent = byteArrayOutputStream.toByteArray();
        return reportContent;
    }

}
