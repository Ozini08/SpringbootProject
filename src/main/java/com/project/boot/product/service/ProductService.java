package com.project.boot.product.service;

import com.project.boot.product.controller.ProductController;
import com.project.boot.product.dao.ProductMapper;
import com.project.boot.product.domain.ProductCountDate;
import com.project.boot.product.domain.ProductCountView;
import com.project.boot.product.domain.ProductVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductMapper productMapper;
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    public List<ProductVo> findProductsByPage(int page, int pageSize, String category, String keyword) {
        int offset = (page - 1) * pageSize;
        List<ProductVo> productList = productMapper.findProductsByPage(offset, pageSize, category, keyword);
        return productList;
    }

    public int countProducts(String category, String keyword) {
        return productMapper.countProducts(category, keyword);
    }

    public List<ProductVo> findBestProducts() {
        List<ProductVo> productList = productMapper.findBestProducts();
        return productList;
    }

    public List<ProductVo> findProductInfo(int productNo) {
        return productMapper.findProductInfo(productNo);
    }

    public void productAdd(MultipartFile imageSrc, String title, int price, String manufacturer, String category, String origin) {
        // 파일 저장 경로 설정
//        String uploadDir = "/frontend/public/product_images";
        String uploadDir = "/Users/wonjin/project/BootProject/frontend/public/product_images";

        // 이미지 파일 저장
        String filename = generateUniqueFileName(imageSrc.getOriginalFilename());
        String imagePath = "/product_images" + "/" + filename;
        try {
            Path path = Path.of(uploadDir, filename);
            Files.copy(imageSrc.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
            // 파일 저장 중 오류 발생 시 예외 처리
            throw new RuntimeException("이미지 파일 저장에 실패했습니다.");
        }
//        System.out.println("imageSrc = " + imageSrc + ", imageName = " + imageName + ", title = " + title + ", price = " + price + ", manufacturer = " + manufacturer + ", category = " + category + ", origin = " + origin);
        // 상품 정보 저장
        productMapper.productAdd(title, price, manufacturer, category, origin, imagePath);
    }

    // 파일명을 고유하게 생성하는 메서드
    private String generateUniqueFileName(String originalFilename) {
        String extension = getFileExtension(originalFilename);
        String uniqueFileName = UUID.randomUUID().toString();
        return uniqueFileName + extension;
    }

    // 파일의 확장자를 추출하는 메서드
    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
            return fileName.substring(dotIndex);
        }
        return "";
    }

    public void productDelete(int productNo) {
        productMapper.productDelete(productNo);
    }

    public void productModify(int productNo,String productName, int productPrice, String productManufacturer, String productCategory, String productOrigin) {
        productMapper.productModify(productNo,productName,productPrice,productManufacturer,productCategory,productOrigin);
    }

    public void productModifyAndImage(MultipartFile imageFile, String productName, int productPrice, String productManufacturer, String productCategory, String productOrigin, int productNo) {
        // 파일 저장 경로 설정
        String uploadDir = "/Users/wonjin/project/BootProject/frontend/public/product_images";

        // 이미지 파일 저장
        String filename = generateUniqueFileName(imageFile.getOriginalFilename());
        String imagePath = "/product_images" + "/" + filename;
        try {
            Path path = Path.of(uploadDir, filename);
            Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
            // 파일 저장 중 오류 발생 시 예외 처리
            throw new RuntimeException("이미지 파일 저장에 실패했습니다.");
        }
        productMapper.productModifyAndImage(imagePath,productName,productPrice,productManufacturer,productCategory,productOrigin,productNo);
    }

    public void productViewCount(int no) {
        productMapper.productViewCount(no);
    }

    public void productRatingAdd(int no, float rating) {
        productMapper.productIncreaseRating(no,rating); //db에 rating+1, rating 값추가
        ProductVo prevRating = productMapper.productFindRating(no);
        int ratingCount = prevRating.getProduct_ratingcount(); //평점 개수
        int ratingTotal = prevRating.getProduct_ratingsum(); //평점 전체 합
        float ratingAvg = (float) ratingTotal / ratingCount; //평점의 평균
        productMapper.productUpdateRating(no,ratingAvg);
    }

    public List<ProductCountDate> findProductRegdate() {
        List<ProductCountDate>productList = productMapper.findProductRegdate();
        return productList;
    }

    public List<ProductCountView> findProductCountView() {
        List<ProductCountView>productList=productMapper.findProductCountView();
        return productList;
    }
}

