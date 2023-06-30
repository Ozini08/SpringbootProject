package com.project.boot.board.controller;

import com.project.boot.board.domain.BoardVo;
import com.project.boot.board.service.BoardService;
import com.project.boot.product.controller.ProductController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/api/boardInfo/{boardNo}")
    public List<BoardVo> findBoardInfo(
            @PathVariable int boardNo
    ){
        boardService.boardViewCount(boardNo);
        List<BoardVo> board = boardService.findBoardInfo(boardNo);
        return board;
    }
    @PostMapping("/api/boardAdd")
    public void boardAdd(
            @RequestBody BoardVo boardVo
    ){
        String title = boardVo.getBoard_title();
        String writer = boardVo.getBoard_writer();
        String content = boardVo.getBoard_content();
        logger.info("title:{}",title);
        logger.info("writer:{}",writer);
        logger.info("content:{}",content);
        boardService.boardAdd(title,writer,content);
    }
    @GetMapping("/api/boardDelete/{boardNo}")
    public void boardDelete(@PathVariable int boardNo){
        boardService.boardDelete(boardNo);
    }
    
    @PostMapping("/api/boardModify")
    public void boardModify(
            @RequestBody BoardVo boardVo
    ){
        int no = boardVo.getBoard_no();
        String title = boardVo.getBoard_title();
        String writer = boardVo.getBoard_writer();
        String content = boardVo.getBoard_content();
        boardService.boardModify(no,title,writer,content);
    }

    @GetMapping("/api/boardRecommend/{boardNo}")
    public void boardRecommend(
            @PathVariable int boardNo
    ){
        logger.info("NO:{}",boardNo);
        boardService.boardRecommend(boardNo);
    }
}
