import React, {useEffect, useState} from 'react';
import data from "bootstrap/js/src/dom/data";
import '../styles/GlobalStyles.css';
import axios from "axios";
function Mypage(){
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios
            .get('/api/hello')
            .then((response) => setHello(response.data))
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            <h2>마이페이지</h2>
            <div>본문 내용이 들어갈 자리, 백엔드에서 가져온 데이터: {hello}</div>
        </div>
    );
};

export default Mypage;
