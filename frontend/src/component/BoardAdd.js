import React, { useState } from 'react';
import '../styles/BoardAdd.css';
import axios from 'axios';

const BoardAdd = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 게시글 추가 로직
            const response = await axios.post('/api/boardAdd', {
                title,
                author,
                content,
            });

            console.log('게시글이 추가되었습니다:', response.data);

            // 추가된 게시글을 목록으로 이동
            // 예시: history.push('/board');
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
                    <label htmlFor="author">작성자</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
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
