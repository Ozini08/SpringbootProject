package com.project.boot.user.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class UserVo {
    private int user_no;
    private String user_id;
    private String user_password;
    private String user_nickname;
    private String user_address;
//    private String user_profileImage;
}
