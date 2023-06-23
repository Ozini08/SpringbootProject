package com.project.boot.product.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class ProductVo {
    private String productname;
    private String productorigin;
    private int productprice;
    private String productcategory;
    private String today;
}