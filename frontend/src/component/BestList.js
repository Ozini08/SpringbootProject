import axios from 'axios';
import React, {useEffect, useState} from 'react';
// import '../styles/ProductList.css';
import {useNavigate} from 'react-router-dom';
import '../styles/GlobalStyles.css';
import '../styles/BestList.css';

const BestList = () => {
    const [productList, setProductList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBestProducts();
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
            const rating = product.product_rating; // 제품의 평점
            const filledStars = Math.floor(rating); // 채워진 별 아이콘 개수
            const halfStar = rating - filledStars === 0.5; // 절반 별 아이콘 여부

            const stars = [];
            for (let i = 0; i < filledStars; i++) {
                stars.push(<span key={i} className="star-icon">⭐</span>);
            }
            if (halfStar) {
                stars.push(<span key={filledStars} className="star-icon">⭐</span>);
            }

            const emptyStars = 5 - stars.length;
            for (let i = 0; i < emptyStars; i++) {
                stars.push(<span key={filledStars + i} className="star-icon">☆</span>);
            }

            return (
                <div className="grid-item" key={index}>
                    <span className="product-number">{renderRank(index + 1)}</span>
                    <img className="product-image" src={product.product_image} onClick={() => handleProductClick(product)}/>
                    <div className="product-name" onClick={() => handleProductClick(product)}>
                        {product.product_name}
                    </div>
                    <div className="product-price">{product.product_price}원</div>
                    <div className="product-rating">{stars}</div>
                    <div className="product-viewcount">조회수: {product.product_viewcount}</div>
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
