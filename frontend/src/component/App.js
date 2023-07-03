import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // 추가
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Mypage from './Mypage';
import Signup from './Signup';
import BestList from './BestList';
import ProductList from './ProductList';
import ProductAdd from './ProductAdd';
import ProductInfo from './ProductInfo';
import ProductModify from './ProductModify';
import Board from './Board';
import BoardAdd from '../component/BoardAdd';
import BoardInfo from '../component/BoardInfo';
import BoardModify from '../component/BoardModify';
import BoardList from '../component/BoardList';
import Signin from './Signin';
import FindIdPassword from './FindIdPassword';
import Logout from './Logout';
import '../App.css';
const theme = createTheme(); // 테마 생성

function App() {
    return (
        <ThemeProvider theme={theme}> {/* ThemeProvider로 감싸기 */}
            <Router>
                <Header />
                <Sidebar />
                <div className="container">
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            {/*-------------UserPage--------------------*/}
                            <Route path="/mypage" element={<Mypage />} />
                            <Route path="/signin" element={<Signin />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/findIdPassword" element={<FindIdPassword />} />
                            {/*-------------ProductPage--------------------*/}
                            <Route path="/bestList" element={<BestList />} />
                            <Route path="/productList" element={<ProductList />} />
                            <Route path="/productAdd" element={<ProductAdd />} />
                            <Route path="/productInfo/:productNo" element={<ProductInfo />} />
                            <Route path="/productModify/:productNo" element={<ProductModify />} />
                            {/*-------------BoardPage------------------------*/}
                            <Route path="/boardList" element={<BoardList />} />
                            <Route path="/boardAdd" element={<BoardAdd />} />
                            <Route path="/boardInfo/:boardNo" element={<BoardInfo />} />
                            <Route path="/boardModify/:boardNo" element={<BoardModify />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
