import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useNavigate, Link} from 'react-router-dom';
import '../styles/BoardModify.css'
const BoardModify = () => {
    const [board, setBoard] = useState(null);
    const {boardNo} = useParams();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        fetchBoardInfo();
        console.log("aasddsasd")
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
                console.log("title:", board_title);
            })
            .catch((error) => console.log(error));
    };

    const handleBoardSave = () => {
        const modifiedBoard = {
            board_no:boardNo,
            board_title: board.board_title,
            board_writer: board.board_writer,
            board_content: board.board_content
        }
        axios
            .post('/api/boardModify', modifiedBoard)
            .then((response) => {
                navigate(`/boardInfo/${boardNo}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    if (!board) {
        return null;
    }
    return (
        <div>
            <h2>게시글 수정</h2>
            <table className="board-info-container">
                <thead>
                <tr>
                    <td>제목</td>
                    <th colSpan="2">
                        <input
                            className="text-title"
                            type="text"
                            value={board.board_title}
                            onChange={(e) => setBoard({...board, board_title: e.target.value})}
                        />
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>작성자</td>
                    <td>
                        <input
                            className="text-writer"
                            type="text"
                            value={board.board_writer}
                            onChange={(e) => setBoard({...board, board_writer: e.target.value})}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="board-info-content">내용</td>
                    <td>
                        <textarea
                            className="text-content"
                            // type="textarea"
                            value={board.board_content}
                            onChange={(e) => setBoard({...board, board_content: e.target.value})}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="button-container">
                <button onClick={handleBoardSave}>저장</button>
            </div>
        </div>
    );
}
export default BoardModify;