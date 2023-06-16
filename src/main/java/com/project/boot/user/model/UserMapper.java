package com.project.boot.user.model;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
//    UserVO idPassCheck(String id);
    void insertUser(UserVO uservo);
    UserVO findById(String id);
}