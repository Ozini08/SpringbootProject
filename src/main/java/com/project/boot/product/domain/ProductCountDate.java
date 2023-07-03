package com.project.boot.product.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductCountDate {
    private String year;
    private String month;
    private String count_by_year_month;
//    private String countByYearMonth;
}
