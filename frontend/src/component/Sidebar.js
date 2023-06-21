import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar(){
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><Link to="/bestlist">인기목록</Link></li>
                    <li><Link to="/productlist">물품목록</Link></li>
                    <li><Link to="/boardlist">게시판</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
