import '../styles/GlobalStyles.css';
import React, {useEffect, useLayoutEffect, useState} from "react";
import axios from "axios";

function Home(){

    useLayoutEffect(() => {

    }, []);
    return(
        <div>
            <h2>MAIN</h2>
            <div>본문 내용이 들어갈 자리</div>
        </div>
    );
}
export default Home;