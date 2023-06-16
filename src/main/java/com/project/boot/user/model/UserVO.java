package com.project.boot.user.model;

import lombok.*;

@Getter @Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserVO {
    private int no;
    private String id;
    private String password;
    private String name;
}
