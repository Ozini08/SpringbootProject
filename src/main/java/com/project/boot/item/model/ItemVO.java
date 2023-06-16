package com.project.boot.item.model;

import lombok.*;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemVO {
    private int no;
    private String productname;
    private String productorigin;
    private int productprice;
    private String productcategory;
    private String productfilename;
    private String id;
    private String today;
}
