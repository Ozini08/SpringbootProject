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

    void productAdd(
//            @Param("imageName") String imageName,
            @Param("title") String title,
            @Param("price") int price,
            @Param("manufacturer") String manufacturer,
            @Param("category") String category,
            @Param("origin") String origin,
            @Param("imagePath") String imagePath
    );

    void productDelete(int productNo);

    void productModifyAndImage(
            @Param("imagePath") String imagePath,
            @Param("productName") String productName,
            @Param("productPrice") int productPrice,
            @Param("productManufacturer") String productManufacturer,
            @Param("productCategory") String productCategory,
            @Param("productOrigin") String productOrigin,
            @Param("productNo") int productNo
    );

    void productModify(
            @Param("productNo") int productNo,
            @Param("productName") String productName,
            @Param("productPrice") int productPrice,
            @Param("productManufacturer") String productManufacturer,
            @Param("productCategory") String productCategory,
            @Param("productOrigin") String productOrigin
    );
}
