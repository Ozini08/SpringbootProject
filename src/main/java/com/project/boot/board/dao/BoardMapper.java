package com.project.boot.board.dao;

import com.project.boot.board.domain.BoardVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface BoardMapper{
    List<BoardVo>findBoard(
            @Param("offset") int offset,
            @Param("limit") int limit,
            @Param("category") String category,
            @Param("keyword") String keyword
    );

    int countBoard(
            @Param("category") String category,
            @Param("keyword") String keyword
    );

    void boardAdd(
            @Param("title") String title,
            @Param("writer") String writer,
            @Param("content") String content
    );

    void boardDelete(
            @Param("boardNo") int boardNo
    );


    void boardModify(
            @Param("no") int no,
            @Param("title") String title,
            @Param("writer") String writer,
            @Param("content") String content
    );

    List<BoardVo> findBoardInfo(int boardNo);

    void boardViewCount(
            @Param("no") int no
    );

    void boardRecommend(@Param("no") int no);
}