import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import '../App.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Mypage from './Mypage';
import Signup from './Signup';
import BestList from './BestList';
import ProductList from './ProductList';
import ProductAdd from "./ProductAdd";
import ProductInfo from './ProductInfo';
import ProductModify from "./ProductModify";
import Board from "./Board"
import BoardAdd from "../component/BoardAdd";
import BoardInfo from "../component/BoardInfo";
import BoardModify from "../component/BoardModify";
import BoardList from "../component/BoardList";

function App() {
    return (<Router>
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
                    <Route path="/productAdd" element={<ProductAdd/>}/>
                    <Route path="/productInfo/:productNo" element={<ProductInfo/>}/>
                    <Route path="/productModify/:productNo" element={<ProductModify/>}></Route>
                    <Route path="/boardList" element={<BoardList/>}/>
                    <Route path="/boardAdd" element={<BoardAdd/>}/>
                    <Route path="/boardInfo/:boardNo" element = {< BoardInfo/>}></Route>
                    <Route path="/boardModify/:boardNo" element={<BoardModify/>}></Route>
                </Routes>
            </main>
        </div>
    </Router>);
}

export default App;
