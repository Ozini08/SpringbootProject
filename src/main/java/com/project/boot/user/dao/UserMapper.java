package com.project.boot.user.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserMapper {
    String userLoginPassFind(
            @Param("id") String id
    );

    String userSignIdCheck(@Param("id") String id);

    void userSignUp(
            @Param("id") String id,
            @Param("password") String password,
            @Param("nickname")String nickname,
            @Param("address") String address
    );

}
