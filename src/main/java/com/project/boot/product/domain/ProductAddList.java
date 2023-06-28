package com.project.boot.product.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
@ToString
public class ProductAddList {
    private MultipartFile file;
    private String imageName;
    private String title;
    private int price;
    private String manufacturer;
    private String category;
    private String origin;
    private int no;
}


//    @RequestParam MultipartFile file,
//            @RequestParam(defaultValue = "") String imageName,
//            @RequestParam(defaultValue = "") String title,
//            @RequestParam(defaultValue = "0") int price,
//            @RequestParam(defaultValue = "") String manufacturer,
//            @RequestParam(defaultValue = "") String category,
//            @RequestParam(defaultValue = "") String origin