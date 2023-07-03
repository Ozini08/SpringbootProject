import React, { useEffect, useLayoutEffect, useState } from 'react';
import '../styles/GlobalStyles.css';
import axios from 'axios';
import '../styles/Mypage.css';
import {redirect, useNavigate} from "react-router-dom";

function Mypage() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useLayoutEffect(() => {
        fetchUserMyPage();
    }, []);

    const fetchUserMyPage = () => {
        axios
            .get('/api/mypage')
            .then((response) => {
                const user = response.data[0];
                const { user_id, user_nickname, user_address } = user;
                setUserData({
                    user_id,
                    user_nickname,
                    user_address,
                });
            })
            .catch((error) => console.log(error));
    };

    if (!userData) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h2 className="mypage-title">MY PAGE</h2>
            <div className="mypage-container">
                <table>
                    <tbody>
                    <tr>
                        <th>{userData.user_nickname}님의 페이지</th>
                    </tr>
                    <tr>
                        <td className="profile-image">
                            <img src="프로필 이미지 경로" alt="프로필 이미지" />
                        </td>
                    </tr>
                    <tr>
                        <td className="id">아아디: {userData.user_id}</td>
                    </tr>
                    <tr>
                        <td className="address">주소: {userData.user_address}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Mypage;
