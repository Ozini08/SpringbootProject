package com.project.boot.product.controller;

import com.project.boot.board.domain.BoardVo;
import com.project.boot.product.domain.*;
import com.project.boot.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import static java.util.Arrays.stream;


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
        productService.productViewCount(productNo);
        List<ProductVo> product = productService.findProductInfo(productNo);
        System.out.println("product = " + product);
        return product;
    }

    @PostMapping("/api/productAdd")
    public void productAdd(
            @ModelAttribute ProductAddList productAddList
    ) {
        MultipartFile file = productAddList.getFile();
        String imageName = productAddList.getImageName();
        String title = productAddList.getTitle();
        int price = productAddList.getPrice();
        String manufacturer = productAddList.getManufacturer();
        String category = productAddList.getCategory();
        String origin = productAddList.getOrigin();
        productService.productAdd(file, title, price, manufacturer, category, origin);
    }

    @GetMapping("/api/productDelete/{productNo}")
    public void productDelete(@PathVariable int productNo) {
        productService.productDelete(productNo);
    }
//    @PutMapping
//    @PatchMapping
//    @DeleteMapping
    @PostMapping("/api/productModify")
    public void productModify( //이미지 파일 변경하지 않은 수정할 경우
            @RequestBody ProductVo productVo
    ) {
        int productNo = productVo.getProduct_no();
        String productName = productVo.getProduct_name();
        int productPrice = productVo.getProduct_price();
        String productManufacturer = productVo.getProduct_manufacturer();
        String productOrigin = productVo.getProduct_origin();
        String productCategory = productVo.getProduct_category();
        productService.productModify(productNo,productName,productPrice,productManufacturer,productCategory,productOrigin);
    }
    @PostMapping("/api/productModifyAndImage")
    public void productModifyAndImage( // 이미지 파일 변경까지 포함하여 수정하는 경우
            @ModelAttribute ProductAddList productAddList
    ){
        MultipartFile file = productAddList.getFile();
        String title = productAddList.getTitle();
        int no = productAddList.getNo();
        int price = productAddList.getPrice();
        String manufacturer = productAddList.getManufacturer();
        String category = productAddList.getCategory();
        String origin = productAddList.getOrigin();
        productService.productModifyAndImage(file,title,price,manufacturer,category,origin,no);
    }

    @PostMapping("/api/productRating")
    public void productRatingAdd(
            @RequestBody ProductVo productVo
    ){
        int no = productVo.getProduct_no();
        float rating = productVo.getProduct_rating();
        productService.productRatingAdd(no, rating);
    }

    @GetMapping("/api/productRegdate")
    public List<ProductCountDate> findProductRegdate(){
        List<ProductCountDate> productList = productService.findProductRegdate();
        List<String> productMonthList = new ArrayList<>();

//        logger.info("LIST_before:{}", productList);
        for(int i=0;i<productList.toArray().length;i++){
//            logger.info("LIST_before:{}", productList.get(i).getMonth());
            String productMonth =productList.get(i).getMonth()+"월";
            productMonthList.add(productMonth);
            productList.get(i).setMonth(productMonth);
//            logger.info("LIST_after:{}", productList.get(i).getMonth());
        }
        return productList;
    }

    @GetMapping("/api/productViewcount")
    public List<ProductCountView> findProductCountView() {
        List<ProductCountView> productView = productService.findProductCountView();
//        logger.info("viewList:{}",productView);
        return productView;
    }

    @GetMapping("/api/productManufacturercount")
    public List<ProductManufacturerCount> findProductManufacturer(){
        List<ProductManufacturerCount> manufacturerCount=productService.findProductManufacturer();
        logger.info("manufacturer:{}",manufacturerCount);
        return manufacturerCount;
    }
}