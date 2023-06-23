package com.project.boot.product.dao;

import com.project.boot.product.domain.ProductVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ProductMapper {
    List<ProductVo> findProduct();
}
