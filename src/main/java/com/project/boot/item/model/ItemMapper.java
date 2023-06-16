package com.project.boot.item.model;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ItemMapper {
//    List<ItemVO>findAll();
    /**
     * 게시글 리스트 조회
     * @return 게시글 리스트
     */
    List<ItemVO> findAll(SearchDto params);

    /**
     * 게시글 수 카운팅
     * @return 게시글 수
     */
    int count(SearchDto params);
    ItemVO findByNo(int no);
    void editItem(ItemVO itemvo);

//    int totalCount(HashMap<String, Object> map);
}
