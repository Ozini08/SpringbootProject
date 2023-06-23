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

    public List<ProductVo> findProduct(){
        return productMapper.findProduct();
    }

}
