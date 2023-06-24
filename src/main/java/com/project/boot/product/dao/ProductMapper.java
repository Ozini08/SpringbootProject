package com.project.boot.product.dao;

import com.project.boot.product.domain.ProductVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ProductMapper {
    List<ProductVo> findProductsByPage(
            @Param("offset") int offset,
            @Param("limit") int limit,
            @Param("category") String category,
            @Param("keyword") String keyword
    );

    int countProducts(
            @Param("category") String category,
            @Param("keyword") String keyword
    );
    List<ProductVo> findBestProducts();
    List<ProductVo> findProductInfo(int productNo);
}
