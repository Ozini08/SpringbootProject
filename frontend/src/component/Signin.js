import React, {useEffect, useLayoutEffect, useState} from 'react';
import '../styles/GlobalStyles.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const handleFindIdPass = () => {
        navigate('/findIdPassword');
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const UserSign = {
            user_id: id,
            user_password: password,
        };

        try {
            await axios.post('/api/signin', UserSign)
            .then((response) => {
                console.log(response.data);
                //fail 받았지 않을 때 성공 하고 navigate('/'); 여기로 이동
                //fail 받았을 때 실패 메시지 띄우고 그대로 유지
                if (response.data==="loginFail") {
                    alert("로그인 실패, 아이디와 비밀번호를 확인해주세요");
                }else if(response.data === "redirect:/"){
                    navigate("/");
                }
            })

        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };
    return (
        <div>
            <h2>LOGIN</h2>
            <form className="login-container" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="id">아이디</label>
                    <input
                        type="text"
                        id="id"
                        onChange={(e) => setId(e.target.value)}
                        placeholder="아이디를 입력하세요"
                    /><br/>
                </div>
                <div>
                    <label htmlFor='password'>비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                    /><br/>
                </div>
                <div>
                    <button type="submit">로그인</button>
                    <button onClick={handleFindIdPass}>아이디/비밀번호 찾기</button>
                </div>
            </form>
        </div>
    );
};

export default Signin;
