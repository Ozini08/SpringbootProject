import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Mypage from './Mypage';
import Signup from './Signup';
import BestList from './BestList';
import ProductList from './ProductList';
import BoardList from './BoardList';
import '../App.css';
import ProductAdd from "./ProductAdd";
import BoardAdd from "./BoardAdd";

function App() {
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
                        <Route path="/bestList" element={<BestList/>}/>
                        <Route path="/productList" element={<ProductList/>}/>
                        <Route path="/boardList" element={<BoardList/>}/>
                        <Route path="/productAdd" element={<ProductAdd/>}/>
                        <Route path="/boardAdd" element={<BoardAdd/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
