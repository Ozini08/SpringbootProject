import React, { useState } from 'react';
import '../styles/BoardAdd.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const BoardAdd = () => {
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const AddBoard = {
            board_title: title,
            board_writer: writer,
            board_content: content
        };

        try {
            const response = await axios.post('/api/boardAdd', AddBoard);
            console.log('게시글이 추가되었습니다:', response.data);
            navigate('/boardList');
        } catch (error) {
            console.error('게시글 추가 실패:', error);
        }
    };

    return (
        <div className="board-container">
            <h2>새글 작성 페이지</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="writer">작성자</label>
                    <input
                        type="text"
                        id="writer"
                        value={writer}
                        onChange={(e) => setWriter(e.target.value)}
                        // onChange={(e)=>setAuthor({...author, author : e.target.value})}
                        placeholder="작성자를 입력하세요"
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        required
                    ></textarea>
                </div>

                <button type="submit">글쓰기</button>
            </form>
        </div>
    );
};

export default BoardAdd;
