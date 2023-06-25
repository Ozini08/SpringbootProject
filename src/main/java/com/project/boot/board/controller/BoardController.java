package com.project.boot.board.controller;

import com.project.boot.board.domain.BoardVo;
import com.project.boot.board.service.BoardService;
import com.project.boot.product.controller.ProductController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BoardController {
    @Autowired
    private BoardService boardService;

    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

    @GetMapping("/api/boardList")
    public List<Object> findBoard(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String category,
            @RequestParam(defaultValue = "") String keyword
    ) {
        List<Object> list = new ArrayList<>();
        List<BoardVo> boardList = boardService.findBoard(page, pageSize, category, keyword);
        list.add(boardList);
        int countList = boardService.countBoard(category, keyword);
        list.add(countList);
        return list;
    }
}
