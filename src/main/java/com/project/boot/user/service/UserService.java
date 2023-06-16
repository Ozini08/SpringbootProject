package com.project.boot.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.product.user.model.UserMapper;
import project.product.user.model.UserVO;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

//    public UserVO idPassCheck(final String id){
//        return userMapper.idPassCheck(id);
//    }

    public void insertUser(UserVO uservo){
        userMapper.insertUser(uservo);
    }

    public UserVO findById(String id) {
        return userMapper.findById(id);
    }
}