import React, {useEffect, useLayoutEffect, useState} from 'react';
import '../styles/GlobalStyles.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../styles/Signup.css';
const Signup = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [nickName, setNickName] = useState('');
    const [address, setAddress] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        const UserSignup={
            user_id:id,
            user_password:password,
            user_passwordCheck:passwordCheck,
            user_nickname : nickName,
            user_address : address,
        };

        try {
            await axios.post('/api/signup', UserSignup)
                .then((response) => {
                    console.log(response.data);
                    if(response.data === "redirect:/"){
                        alert("회원가입 완료");
                        navigate("/signin");
                    }
                })

        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };
    const handleIdChecked = async (e) => {
        e.preventDefault();
        const UserIdChecked = {
            user_id: id,
        };

        try {
            const response = await axios
                .post('/api/userIdCheck', UserIdChecked)
                .then((response)=>{
                    if (response.data === 'fail') {
                        alert("이미 사용 중인 아이디입니다.");
                    }else if (response.data === "success"){
                        alert("사용 가능한 아이디입니다.")
                    }
                })
        } catch (error) {
        }
    };
    return (
        <div>
            <h2 className="signup-title">회원가입</h2>
            <form className="login-container" onSubmit={handleSignup}>
                <div>
                    <label htmlFor="id">아이디</label>
                    <input
                        type="text"
                        id="id"
                        onChange={(e) => setId(e.target.value)}
                        placeholder="아이디를 입력하세요"
                    />
                    <button onClick={handleIdChecked}>아이디 체크</button>
                    <br/>
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
                    <label htmlFor='passwordCheck'>비밀번호체크</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPasswordCheck(e.target.value)}
                        placeholder="비밀번호를 한번 더 입력하세요"
                    /><br/>
                </div>
                <div>
                    <label htmlFor='nickName'>닉네임</label>
                    <input
                        type="text"
                        id="nickName"
                        onChange={(e) => setNickName(e.target.value)}
                        placeholder="사용하실 닉네임을 입력하세요"
                    /><br/>
                </div>
                <div>
                    <label htmlFor='address'>주소</label>
                    <input
                        type="text"
                        id="address"
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="주소를 입력해주세요"
                    /><br/>
                </div>
                <div>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
