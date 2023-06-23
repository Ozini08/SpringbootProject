import '../styles/GlobalStyles.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function Home(){
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios
            .get('/api/hello')
            .then((response) => setHello(response.data))
            .catch((error) => console.log(error));
    }, []);
    return(
        <div>
            <h2>메인페이지</h2>
            <div>본문 내용이 들어갈 자리, 백엔드에서 가져온 데이터: {hello}</div>
        </div>
    );
}
export default Home;