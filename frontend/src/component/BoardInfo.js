import React, { useEffect, useLayoutEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import '../styles/BoardInfo.css';

const BoardInfo = () => {
    const { boardNo } = useParams();
    const [board, setBoard] = useState(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        fetchBoardInfo();
    }, []);

    const fetchBoardInfo = () => {
        axios
            .get(`/api/boardInfo/${boardNo}`)
            .then((response) => {
                const boardData = response.data[0];
                const {
                    board_title,
                    board_writer,
                    board_content,
                    board_writtendate,
                    board_viewcount,
                    board_recommendcount
                } = boardData;
                setBoard({
                    board_title,
                    board_writer,
                    board_content,
                    board_writtendate,
                    board_viewcount,
                    board_recommendcount
                });
            })
            .catch((error) => console.log(error));
    };

    if (!board) {
        return null;
    }

    const handleBoardDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios
                .get(`/api/boardDelete/${boardNo}`)
                .then(() => {
                    alert("삭제되었습니다.");
                    navigate('/boardList');
                })
                .catch((error) => console.log(error));
        } else {
            alert("취소합니다.");
        }
    };
    const handleBoardModify = () => {
        navigate(`/boardModify/${boardNo}`);
    };
    const handleBoardRecommend = () => {
        axios
            .get(`/api/boardRecommend/${boardNo}`)
            .then(() => {
                setBoard((prevBoard) => ({
                    ...prevBoard,
                    board_recommendcount: prevBoard.board_recommendcount + 1
                }));
            })
            .catch((error) => console.error(error));
    };
    return (
        <div>
            <h2>게시글</h2>
            <table className="board-info-container">
                <thead>
                <tr>
                    <th colSpan="3">{board.board_title}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>작성자</td>
                    <td colSpan="2">{board.board_writer}</td>
                </tr>
                <tr>
                    <td>작성일</td>
                    <td colSpan="2">{board.board_writtendate}</td>
                </tr>
                <tr>
                    <td className="board-info-content"></td>
                    <td colSpan="2">{board.board_content}</td>
                </tr>
                <tr>
                    <td>조회</td>
                    <td colSpan="2">{board.board_viewcount}</td>
                </tr>
                <tr>
                    <td>공감</td>
                    <td>{board.board_recommendcount}</td>
                    <td colSpan="2"><button onClick = {handleBoardRecommend}>👍</button></td>
                </tr>
                </tbody>
            </table>
            <div className="button-container">
                <button onClick={handleBoardModify}>수정</button>
                <button onClick={handleBoardDelete}>삭제</button>
            </div>
        </div>
    );
};

export default BoardInfo;
