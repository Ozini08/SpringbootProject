package com.project.boot.product.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class ProductVo {
    private int product_no;
    private String product_name;
    private int product_price;
    private String product_manufacturer;
    private String product_origin;
    private String product_category;
    private float product_rating;
    private int product_viewcount;
    private String product_image;
    private String product_regdate;
    private int product_ratingcount;
    private int product_ratingsum;
}