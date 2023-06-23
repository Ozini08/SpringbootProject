package com.project.boot.product.controller;

import com.project.boot.product.domain.ProductVo;
import com.project.boot.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

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

//    @GetMapping("/productAdd")
//    public String ProductAddPage(){
//        return "/api/productAdd";
//    }
//    @PostMapping("/api/productAdd"){
//
//    }
}

