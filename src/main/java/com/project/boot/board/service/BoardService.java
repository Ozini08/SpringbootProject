package com.project.boot.board.service;

import com.project.boot.board.dao.BoardMapper;
import com.project.boot.board.domain.BoardVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BoardService {
    @Autowired
    private BoardMapper boardMapper;

    public List<BoardVo> findBoard(int page, int pageSize, String category, String keyword) {
        int offset = (page - 1) *pageSize;
        List<BoardVo> boardList = boardMapper.findBoard(offset, pageSize, category, keyword);
        return boardList;
    }
    public int countBoard(String category, String keyword){
        return boardMapper.countBoard(category, keyword);
    }
}
