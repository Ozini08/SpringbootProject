import axios from 'axios';
import React, {useEffect, useLayoutEffect, useState} from 'react';
// import '../styles/ProductList.css';
import {useNavigate} from 'react-router-dom';
import '../styles/GlobalStyles.css';
import '../styles/BestList.css';
import Rating from "react-rating-stars-component";

const BestList = () => {
    const [productList, setProductList] = useState([]);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        fetchBestProducts();
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '인기TOP10';
    }, []);

    const fetchBestProducts = () => {
        axios
            .get('/api/bestList')
            .then((response) => {
                const productList = response.data;
                setProductList(productList);
            })
            .catch((error) => console.log(error));
    };
    const handleProductClick = (product) => {
        navigate(`/productInfo/${product.product_no}`);
    };
    const createGrid = () => {
        return productList.map((product, index) => {
            return (
                <div className="grid-item" key={index}>
                    <span className="product-number">{renderRank(index + 1)}</span>
                    <img className="product-image" src={product.product_image} onClick={() => handleProductClick(product)}/>
                    <div className="product-name" onClick={() => handleProductClick(product)}>
                        {product.product_name}
                    </div>
                    <div className="product-price">{product.product_price}원</div>
                    <div className="product-rating">
                        <Rating
                            count={5}
                            size={18}
                            value={product.product_rating}
                            activeColor="#ffb400"
                            emptyIcon={<span style={{ fontSize: '18px' }}>★</span>}
                            halfIcon={<span style={{ fontSize: '18px' }}>✩</span>}
                            filledIcon={<span style={{ fontSize: '18px' }}>★</span>}
                            edit={false}
                        />
                    </div>
                    <div className="product-viewcount">조회수 {product.product_viewcount}</div>
                </div>
            );
        });
    };


    const renderRank = (rank) => {
        if (rank >= 1 && rank <= 3) {
            return renderRankIcon(rank); // 1등부터 3등은 아이콘으로 표시
        } else {
            return rank; // 4등부터 10등은 숫자로 표시
        }
    };

    const renderRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <span className="rank-icon gold">🥇</span>; // 1등 아이콘
            case 2:
                return <span className="rank-icon silver">🥈</span>; // 2등 아이콘
            case 3:
                return <span className="rank-icon bronze">🥉</span>; // 3등 아이콘
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>인기 TOP 10</h2>
            {productList.length > 0 ? (
                <>
                    <div className="grid-container">{createGrid()}</div>
                </>
            ) : (
                <div>데이터를 로드 중입니다...</div>
            )}
        </div>
    );
};

export default BestList;
