package com.project.boot.product.service;

import com.project.boot.product.dao.ProductMapper;
import com.project.boot.product.domain.ProductVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductMapper productMapper;

    public List<ProductVo> findProductsByPage(int page, int pageSize, String category, String keyword) {
        int offset = (page - 1) * pageSize;
        List<ProductVo> productList = productMapper.findProductsByPage(offset, pageSize, category, keyword);
        System.out.println("ProductService.findProductsByPage");
        System.out.println("offset = " + offset);
        System.out.println("page = " + page);
        System.out.println("pageSize = " + pageSize);
        System.out.println("category = " + category);
        System.out.println("keyword = " + keyword);
        return productList;
    }
    public int countProducts(String category, String keyword){
        return productMapper.countProducts(category, keyword);
    }
}
