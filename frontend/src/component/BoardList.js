import React, {useEffect, useLayoutEffect, useState} from 'react';
import '../styles/BoardList.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardList = () => {
    const [boardList, setBoardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchCategory, setSearchCategory] = useState('BOARDTITLE');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [totalDataCount, setTotalDataCount] = useState(0);
    const itemsPerPage = 10;
    const pageButtonCount = 5;
    const navigate = useNavigate();

    useLayoutEffect(() => {
        fetchBoardsByPage(1);
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '게시판목록';
    }, []);

    const fetchBoardsByPage = (page) => {
        axios
            .get('/api/boardList', {
                params: {
                    page: page,
                    pageSize: itemsPerPage,
                    category: searchCategory,
                    keyword: searchKeyword,
                },
            })
            .then((response) => {
                console.log(response.data);
                const boardList = response.data[0]; // 받아오는 리스트
                const totalCount = response.data[1]; // 받아오는 리스트 개수
                console.log(boardList);
                console.log(totalCount);
                setBoardList(boardList);
                setTotalDataCount(totalCount);
                setCurrentPage(page);
            })
            .catch((error) => console.log(error));
    };

    const handleRefresh = () => {
        setSearchCategory('BOARDTITLE'); // 카테고리 선택창 초기화
        setSearchKeyword(''); // 검색창 초기화
        fetchBoardsByPage(1); // 1페이지로 이동
    };

    const handlePageChange = (page) => {
        fetchBoardsByPage(page);
    };

    const handleSearchCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };

    const handleSearchKeywordChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = () => {
        fetchBoardsByPage(1);
    };

    const handleWrite = () => {
        navigate('/boardAdd');
    };
    const handleKeywordKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const renderPageButtons = () => {
        const pageCount = Math.ceil(totalDataCount / itemsPerPage);
        const buttons = [];
        let startPage = 1;
        let endPage = pageCount;

        if (pageCount > pageButtonCount) {
            const halfButtonCount = Math.floor(pageButtonCount / 2);
            startPage = Math.max(currentPage - halfButtonCount, 1);
            endPage = startPage + pageButtonCount - 1;

            if (endPage > pageCount) {
                endPage = pageCount;
                startPage = endPage - pageButtonCount + 1;
            }
        }

        buttons.push(
            <button
                key="first"
                className={currentPage === 1 ? 'disabled' : ''}
                onClick={() => handlePageChange(1)}
            >
                처음
            </button>
        );
        buttons.push(
            <button
                key="prev"
                className={currentPage === 1 ? 'disabled' : ''}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                이전
            </button>
        );

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={currentPage === i ? 'active' : ''}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        buttons.push(
            <button
                key="next"
                className={currentPage === pageCount ? 'disabled' : ''}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                다음
            </button>
        );
        buttons.push(
            <button
                key="last"
                className={currentPage === pageCount ? 'disabled' : ''}
                onClick={() => handlePageChange(pageCount)}
            >
                마지막
            </button>
        );

        return buttons;
    };

    return (
        <div>
            <h2>게시판 목록</h2>
            <div className="board-header">
                <div className="board-search">
                    <select
                        value={searchCategory}
                        onChange={handleSearchCategoryChange}
                    >
                        <option value="BOARDTITLE">제목</option>
                        <option value="BOARDWRITER">작성자</option>
                        <option value="BOARDCONTENT">내용</option>
                    </select>
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={handleSearchKeywordChange}
                        onKeyPress={handleKeywordKeyPress}
                    />
                    <button onClick={handleSearch}>검색</button>
                    <button onClick={handleRefresh}>새로고침</button>
                </div>
                <div className="board-buttons">
                    <button onClick={handleWrite}>글쓰기</button>
                </div>
            </div>
            <div className="board-table-container">
                <table className="board-table">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                    </thead>
                    <tbody>
                    {boardList.map((board) => (
                        <tr key={board.board_no}>
                            <td>{board.board_no}</td>
                            <td>{board.board_title}</td>
                            <td>{board.board_writer}</td>
                            <td>{board.board_writtendate}</td>
                            <td>{board.board_viewcount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                {renderPageButtons()}
            </div>
        </div>
    );
};

export default BoardList;
