package com.project.boot.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.project.boot.user.model.UserVO;
import com.project.boot.user.service.UserService;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user/login")
    public String loginView(@SessionAttribute(name = "userid", required = false)String userid){

        if(userid!=null){//session에 로그인 값있으면 /로 이동
            return "redirect:/";
        }
        return "user/login";
    }

    @PostMapping("/user/login")
    public String loginAccess(@RequestParam(value = "id",required = false) String id,
                              @RequestParam(value = "password",required = false)String password,
                              HttpServletRequest request){
//        UserVO uservo = userService.findById(id);
//        System.out.println(uservo);
//        if (uservo ==null){
//            return "redirect:/user/login";
//        }
//        if(!uservo.getPassword().equals(password)){
//            return "redirect:/user/login";
//        }
//        request.getSession().setAttribute("userid",uservo.getId());
        return "redirect:/item/list";
    }

    @GetMapping("/user/logout")
    public String logout(HttpServletRequest request){
        request.getSession().invalidate();//세션 다 날리기
        return "redirect:/user/login";
    }

    @GetMapping("/user/mypage")
    public String myPage(@SessionAttribute(name = "userid", required = false) String id,
                         Model model) {
        if (id == null) {
            return "redirect:/user/login";
        }
//        UserVO user = userService.findById(id);
//        model.addAttribute("user", user);
        return "user/mypage";
    }
    @GetMapping("/user/signup")
    public String signupView(){
        return "user/signup";
    }

    @PostMapping("/user/signup")
    public String signupAccess(@ModelAttribute UserVO uservo){
        System.out.println(uservo);

        //ID로 회원 조회
//        UserVO findUser = userService.findById(uservo.getId());
////        System.out.println(findUser);
//        //해당 ID를 가진 회원이 존재한다면 가입 실패
//        if (findUser != null) {
//            return "user/signup";
//        }
//
//        //TODO:비밀번호 확인 등 로직 작성
//
//        //회원가입 성공
//        userService.insertUser(uservo);
        return "redirect:/user/login";
    }

}