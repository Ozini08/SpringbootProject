package com.project.boot.user.controller;

import com.project.boot.board.controller.BoardController;
import com.project.boot.user.domain.UserVo;
import com.project.boot.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Member;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    public class SessionConst {
        public static final String LOGIN_MEMBER = "loginMember";
    }
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/api/signin")
    public String userLogin(
            @RequestBody UserVo uservo,
            HttpServletRequest request
    ){
        String userId= uservo.getUser_id();
        String userPassword = uservo.getUser_password();
        String loginResult = userService.userLogin(userId,userPassword);
        if (loginResult == "fail") {
            return "loginFail";
        }
        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_MEMBER,(userId));
        return "redirect:/";
    }

    @GetMapping("/api/logout")
    public void userLogout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
            logger.info("세션제거완료");
        }
        logger.info("SESSION IS NULL");
    }

    @PostMapping("/api/userIdCheck")
    public String userSignIdCheck(@RequestBody UserVo userVo){
        String id = userVo.getUser_id();
        return userService.userSignIdCheck(id);
    }

    @PostMapping("/api/signup")
    public String userSignUp(@RequestBody UserVo userVo){
        String id = userVo.getUser_id();
        String password = userVo.getUser_password();
        String nickname = userVo.getUser_nickname();
        String address = userVo.getUser_address();
        userService.userSignUp(id,password,nickname,address);
        return "redirect:/";
    }
}
