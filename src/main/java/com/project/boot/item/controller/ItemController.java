package com.project.boot.item.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.project.boot.item.model.ItemVO;
import com.project.boot.item.model.SearchDto;
import com.project.boot.item.service.ItemService;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

//    @GetMapping("/item/list")
//    public String list(Model model,HttpServletRequest request) {
////        List<ItemVO> itemList = itemService.findAll();
//        List<ItemVO> itemList = itemService.findAll();
//        System.out.println("itemList = " + itemList);
//        model.addAttribute("itemList", itemList);
//        return "item/itemList";
//    }
//    @GetMapping("/item/list")
//    public String listAll(@ModelAttribute("params") final SearchDto params, Model model) {
//        List<ItemVO> itemList = itemService.findAllPost(params);
//        System.out.println("itemList = " + itemList);
//        model.addAttribute("itemList", itemList);
//        return "item/itemList";
//    }
@GetMapping("/item/list")
public String listAll(@ModelAttribute("params") final SearchDto params,
                      @RequestParam(value = "pageNum", defaultValue = "1") int pageNum,
                      Model model) {
    int pageSize = 10; // 페이지당 게시물 수
    System.out.println("pageNum = " + pageNum);
    // 페이징 계산 로직
    int startRow = (pageNum - 1) * pageSize;

    // 전체 게시물 수와 페이지 개수 가져오기
//    int totalRecordCount = itemService.getTotalRecordCount(params);
//    int pageCount = (int) Math.ceil((double) totalRecordCount / pageSize)/**/;

    // 페이지 번호 리스트 생성
//    List<Integer> pageList = new ArrayList<>();
//    for (int i = 1; i <= pageCount; i++) {
//        pageList.add(i);
//    }
//
//    // 페이징에 필요한 데이터를 모델에 추가
//    model.addAttribute("pageCount", pageCount); // 전체 페이지 개수
//    model.addAttribute("pageNum", pageNum); // 현재 페이지 번호
//    model.addAttribute("pageList", pageList); // 페이지 번호 리스트
//
//    // 게시글 조회
//    List<ItemVO> itemList = itemService.findAllPost(params, startRow, pageSize);
//    model.addAttribute("itemList", itemList);

    return "item/itemList";
}

    @PostMapping("/item/list")
    public String listFind(@RequestParam(value = "query",required = false) String query,
                           @RequestParam(value = "data",required = false)String data,
                           HttpServletRequest request,
                           Model model){
        System.out.println("query = " + query);
        System.out.println("data = " + data);
        return "item/itemList";
    }
    @GetMapping("/item/{no}")
    public String itemView(@PathVariable int no, Model model){
//        ItemVO item = itemService.findByNo(no);
//        System.out.println("item = " + item);
//        model.addAttribute("item",item);
        return "item/itemView";
    }
    @GetMapping("/item/edit/{no}")
    public String itemEdit(@PathVariable int no, Model model){
//        ItemVO item = itemService.findByNo(no);
//        model.addAttribute("item",item);
        return "item/itemEdit";
    }
    @PostMapping("/item/edit")
    public String itemUpdate(@ModelAttribute ItemVO itemvo){
//        System.out.println("itemvo = " + itemvo);
//        List<ItemVO>list=itemService.editItem();
//        System.out.println("list = " + list);
//        itemService.editItem();

//        itemService.editItem(itemvo);
        return "redirect:/item/list";
    }
}
