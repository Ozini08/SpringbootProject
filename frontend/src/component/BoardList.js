import React, { useState } from 'react';
import '../styles/BoardList.css'; // CSS 파일을 import 해주세요.
import { useNavigate } from 'react-router-dom';
const BoardList = () => {
    const boardData = [
        { id: 1, title: '첫 번째 게시물', author: '홍길동', date: '2023-06-21', views: 10, likes: 5 },
        { id: 2, title: '두 번째 게시물', author: '김철수', date: '2023-06-22', views: 5, likes: 3 },
        // ... 나머지 게시물 데이터
    ];

    const [searchCategory, setSearchCategory] = useState('제목');
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();
    const handleSearchCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };

    const handleSearchKeywordChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = () => {
        // 검색 로직 구현
    };

    const handleWrite = () => {
        // 글쓰기 버튼 클릭 시 동작할 로직 구현
        navigate('/boardAdd');
    };

    return (
        <div>
            <h2>게시판 목록</h2>
            <div className="board-header">
                <div className="board-search">
                    <select value={searchCategory} onChange={handleSearchCategoryChange}>
                        <option value="제목">제목</option>
                        <option value="글쓴이">글쓴이</option>
                        <option value="내용">내용</option>
                        {/* 추가적인 카테고리 옵션 추가 */}
                    </select>
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={handleSearchKeywordChange}
                        placeholder="검색어를 입력하세요"
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
                <button className="write-button" onClick={handleWrite}>글쓰기</button>
            </div>
            <table className="board-table">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>등록일</th>
                    <th>조회</th>
                    <th>추천</th>
                </tr>
                </thead>
                <tbody>
                {boardData.map((board) => (
                    <tr key={board.id}>
                        <td>{board.id}</td>
                        <td>{board.title}</td>
                        <td>{board.author}</td>
                        <td>{board.date}</td>
                        <td>{board.views}</td>
                        <td>{board.likes}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BoardList;
