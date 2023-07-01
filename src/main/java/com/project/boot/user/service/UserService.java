package com.project.boot.user.service;

import com.project.boot.board.service.BoardService;
import com.project.boot.user.dao.UserMapper;
import com.project.boot.user.domain.UserVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public String userLogin(String id, String password){
        String checkUserPassword= userMapper.userLoginPassFind(id);
        if (!checkUserPassword.equals(password)) { //로그인 실패
            return "fail";
        }
        return "success"; //로그인 성공
    }

    public String userSignIdCheck(String id){
        String check = userMapper.userSignIdCheck(id);
        if (check == null) {//가입가능, 아이디 중복 없음
            return "success";
        }
        return "fail";//가입 불가, 아이디 있음
    }

    public void userSignUp(String id, String password, String nickname, String address) {
        userMapper.userSignUp(id,password,nickname,address);
    }

    public UserVo userFindData(String loginMember) {
//        logger.info("id:{}", loginMember);
        return userMapper.userFindData(loginMember);
    }
}
