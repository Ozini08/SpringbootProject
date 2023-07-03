package com.project.boot.product.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductCountView {
    private String product_category;
    private int total_viewcount;
}
