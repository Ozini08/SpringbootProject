import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../images/snoopy1.png'; // 이미지 파일 경로
function Header(){
    return (
        <header className = "header">
            <nav>
                <ul className="header-ul">
                    <li className="logo-container">
                        <Link to="/">
                            <img src={logo} alt="Logo" className="logo" /> Home
                        </Link>
                    </li>
                    <li className="header-right">
                        <Link to="/mypage">마이페이지</Link>
                    </li>
                    <li className="header-right">
                        <Link to="/signin">로그인</Link>
                    </li>
                    <li className="header-right">
                        <Link to="/logout">로그아웃</Link>
                    </li>
                    <li className="header-right">
                        <Link to="/signup">회원가입</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
