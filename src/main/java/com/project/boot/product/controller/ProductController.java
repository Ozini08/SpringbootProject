package com.project.boot.product.controller;

import com.project.boot.product.domain.ProductVo;
import com.project.boot.product.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
public class ProductController {
    @Autowired
    private ProductService productService;
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    @GetMapping("/api/productList")
    public List<Object> findProductsByPage(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "16") int pageSize,
            @RequestParam(defaultValue = "") String category,
            @RequestParam(defaultValue = "") String keyword
    ) {
        System.out.println("ProductController.findProductsByPage");
        List<Object> result = new ArrayList<>(); //리턴할 전체 리스트 생성
        List<ProductVo> productList = productService.findProductsByPage(page, pageSize, category, keyword);
        result.add(productList); //result 첫번째에 productList 저장
        int countList = productService.countProducts(category, keyword); // 두번째에 countList 저장
        result.add(countList);
        return result;
    }

    @GetMapping("/api/bestList")
    public List<ProductVo> findBestProducts() {
        return productService.findBestProducts();
    }

    @GetMapping("/api/productInfo/{productNo}")
    public List<ProductVo> findProductInfo(@PathVariable int productNo) {
        List<ProductVo> product = productService.findProductInfo(productNo);
        logger.info("productNo = {}, prolist = {}", productNo, product);
        return product;
    }
}