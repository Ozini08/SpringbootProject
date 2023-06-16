package com.project.boot.item.model;

import lombok.Getter;
import lombok.Setter;
import project.product.item.paging.Pagination;

@Getter
@Setter
public class SearchDto {

    private int offset;
    private int page;                 // 현재 페이지 번호
    private int recordSize;           // 페이지당 출력할 데이터 개수
    private int pageSize;             // 화면 하단에 출력할 페이지 사이즈
    private String keyword;           // 검색 키워드
    private String searchType;        // 검색 유형
    private Pagination pagination;    // 페이지네이션 정보

    //    public SearchDto() {
//        this.page = 1;
//        this.recordSize = 5;
//        this.pageSize = 10;
//    }
    public SearchDto() {
        this.offset = 0;
        this.recordSize = 0;
    }

    public SearchDto(int offset, int recordSize) {
        this.offset = offset;
        this.recordSize = recordSize;
    }

//    public int getOffset() {
//        return (page - 1) * recordSize;
//    }

}