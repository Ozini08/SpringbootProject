// src/main/frontend/src/App.js

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Link} from "react-router-dom";

function App() {
    const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <BrowserRouter>
            백엔드에서 가져온 데이터입니다 : {hello}
        </BrowserRouter>
    );
}

export default App;