//package com.project.boot.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/productList") // CORS를 허용할 경로
//                .allowedOrigins("http://localhost:3000") // 허용할 오리진
//                .allowedMethods("GET"); // 허용할 HTTP 메서드
//    }
//}
