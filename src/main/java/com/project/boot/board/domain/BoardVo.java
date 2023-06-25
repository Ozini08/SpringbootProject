package com.project.boot.board.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class BoardVo {
    private int board_no;
    private String board_title;
    private String board_content;
    private String board_writer;
    private String board_writtendate;
    private int board_viewcount;
    private int board_recommendcount;
}