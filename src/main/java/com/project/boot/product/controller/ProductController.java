package com.project.boot.product.controller;

import com.project.boot.product.domain.ProductVo;
import com.project.boot.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/productList")
    public List<ProductVo> findProduct() {
        List<ProductVo> productList = productService.findProduct();
        System.out.println("productList = " + productList);
        return productList;
    }
}
