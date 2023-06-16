package com.project.boot.item.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.project.boot.item.model.ItemMapper;
import com.project.boot.item.model.ItemVO;
import com.project.boot.item.model.SearchDto;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemMapper itemMapper;

    public List<ItemVO> findAllPost(SearchDto params, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        SearchDto searchDto = new SearchDto(offset, pageSize);
        return itemMapper.findAll(searchDto);
    }

    public ItemVO findByNo(int no){
        return itemMapper.findByNo(no);
    }

    public void editItem(ItemVO itemvo){
        itemMapper.editItem(itemvo);
    }

    public int getTotalRecordCount(SearchDto searchDto) {
        return itemMapper.count(searchDto);
    }
}


//@Service
//@RequiredArgsConstructor
//public class ItemService {
//    private final ItemMapper itemMapper;
//
////    public List<ItemVO> findAll(){
////        return itemMapper.findAll();
////    }
//    /**
//     * 게시글 리스트 조회
//     * @param params - search conditions
//     * @return 게시글 리스트
//     */
////    public List<ItemVO> findAllPost(final SearchDto params) {
////        return itemMapper.findAll(params);
////    }
//    public List<ItemVO> findAllPost(int page, int pageSize) {
//        int offset = (page - 1) * pageSize;
//        SearchDto searchDto = new SearchDto(offset, pageSize);
//        return itemMapper.findAll(searchDto);
//    }
//
//    public ItemVO findByNo(int no){
//        return itemMapper.findByNo(no);
//    }
//    public void editItem(ItemVO itemvo){
//        itemMapper.editItem(itemvo);
//    }
////    public int totalCount(HashMap<String, Object> map) {
////        return itemMapper.totalCount(map);
//////        return BoardListDaoImp.getBoardListDao().totalCount(map);
////    }
//}
