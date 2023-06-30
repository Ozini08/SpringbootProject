import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get('/api/logout');
                // 세션 제거 및 클라이언트 상태 변경 등 로그아웃 처리 로직을 추가합니다.
                navigate('/signin'); // 로그아웃 후 이동할 페이지로 설정합니다.
            } catch (error) {
                console.error('로그아웃 실패:', error);
            }
        };

        logout();
    }, [navigate]);

    return (
        <div>
            <h2>로그아웃 중...</h2>
        </div>
    );
};

export default Logout;
