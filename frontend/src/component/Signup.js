import React, {useEffect, useState} from 'react';
import '../styles/GlobalStyles.css';
import axios from "axios";
const Signup = () => {
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios
            .get('/api/hello')
            .then((response) => setHello(response.data))
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            <h2>회원가입페이지</h2>
            {/* 내용 추가 */}
            <div>본문 내용이 들어갈 자리, 백엔드에서 가져온 데이터: {hello}</div>
        </div>
    );
};

export default Signup;