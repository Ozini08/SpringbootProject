import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Mypage from './Mypage';
import Signup from './Signup';
import BestList from './Bestlist';
import ProductList from './Productlist';
import BoardList from './Boardlist';
import '../App.css';

function App() {
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios
            .get('/api/hello')
            .then((response) => setHello(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Router>
            <Header/>
            <Sidebar/>
            <div className="container">
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/mypage" element={<Mypage/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/bestlist" element={<BestList/>}/>
                        <Route path="/productlist" element={<ProductList/>}/>
                        <Route path="/boardlist" element={<BoardList/>}/>
                    </Routes>
                    <div>본문 내용이 들어갈 자리, 백엔드에서 가져온 데이터: {hello}</div>
                </main>
            </div>
        </Router>
    );
}

export default App;
