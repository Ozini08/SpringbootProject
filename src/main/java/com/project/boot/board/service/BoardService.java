package com.project.boot.board.service;

import com.project.boot.board.dao.BoardMapper;
import com.project.boot.board.domain.BoardVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class BoardService {
    @Autowired
    private BoardMapper boardMapper;
    private static final Logger logger = LoggerFactory.getLogger(BoardService.class);
    public List<BoardVo> findBoard(int page, int pageSize, String category, String keyword) {
        int offset = (page - 1) *pageSize;
        List<BoardVo> boardList = boardMapper.findBoard(offset, pageSize, category, keyword);
        return boardList;
    }
    public int countBoard(String category, String keyword){
        return boardMapper.countBoard(category, keyword);
    }
    public void boardAdd(String title, String writer, String content){
        boardMapper.boardAdd(title,writer,content);
    }

    public void boardDelete(int boardNo) {
        boardMapper.boardDelete(boardNo);
    }

    public void boardModify(int no, String title, String writer, String content) {
        boardMapper.boardModify(no,title,writer,content);
    }

    public List<BoardVo> findBoardInfo(int boardNo) {
        return boardMapper.findBoardInfo(boardNo);
    }

    public void boardViewCount(int no) {
        logger.info("BOARD_NO : {}",no);
        boardMapper.boardViewCount(no);
    }

    public void boardRecommend(int no) {
        logger.info("BOARD_NO : {}",no);
        boardMapper.boardRecommend(no);
    }

}
