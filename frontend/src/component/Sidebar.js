import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar(){
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><Link to="/bestList">인기목록</Link></li>
                    <li><Link to="/productList">물품목록</Link></li>
                    <li><Link to="/boardList">게시판</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
