import axios from 'axios';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import '../styles/ProductList.css';
import '../styles/GlobalStyles.css';
import { useNavigate, Link } from 'react-router-dom';
// import StarRatingComponent from 'react-star-rating-component';
import Rating from 'react-rating-stars-component';
const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchCategory, setSearchCategory] = useState('PRODUCTNAME');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [totalDataCount, setTotalDataCount] = useState(0);
    const itemsPerPage = 16;
    const pageButtonCount = 5;
    const navigate = useNavigate();

    useLayoutEffect(() => {
        fetchProductsByPage(1);
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '물품목록';
    }, []);

    const fetchProductsByPage = (page) => {
        axios
            .get('/api/productList', {
                params: {
                    page: page,
                    pageSize: itemsPerPage,
                    category: searchCategory,
                    keyword: searchKeyword
                }
            })
            .then((response) => {
                console.log(response.data);
                const productList = response.data[0]; // 받아오는 리스트
                const totalCount = response.data[1]; // 받아오는 리스트 개수
                console.log(productList);
                console.log(totalCount);
                setProductList(productList);
                setTotalDataCount(totalCount);
                setCurrentPage(page);
            })
            .catch((error) => console.log(error));
    };

    const handleRefresh = () => {
        setSearchCategory('PRODUCTNAME'); // 카테고리 선택창 초기화
        setSearchKeyword(''); // 검색창 초기화
        fetchProductsByPage(1); // 1페이지로 이동
    };

    const handlePageChange = (page) => {
        fetchProductsByPage(page);
    };

    const handleCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };

    const handleKeywordChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleKeywordKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        fetchProductsByPage(1);
    };

    const renderPageButtons = () => {
        const pageCount = Math.ceil(totalDataCount / itemsPerPage);
        const buttons = [];
        let startPage = 1;
        let endPage = pageCount;

        if (pageCount > pageButtonCount) {
            const halfButtonCount = Math.floor(pageButtonCount / 2);
            startPage = Math.max(currentPage - halfButtonCount, 1);
            endPage = startPage + pageButtonCount - 1;

            if (endPage > pageCount) {
                endPage = pageCount;
                startPage = endPage - pageButtonCount + 1;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={currentPage === i ? 'active' : ''}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };
    const handleProductClick = (product) => {
        navigate(`/productInfo/${product.product_no}`);
    };

    // const createGrid = () => {
    //     return productList.map((product, index) => {
    //         return (
    //             <div className="grid-item" key={product.product_no}>
    //                 <img className="product-image" src={product.product_image} onClick={() => handleProductClick(product)} />
    //                 <div className="product-name" onClick={() => handleProductClick(product)}>
    //                     {product.product_name}
    //                 </div>
    //                 <div className="product-price">{product.product_price}원</div>
    //                 <div className="product-rating">{product.product_rating}</div>
    //                 <div className="product-viewcount">조회수 {product.product_viewcount}</div>
    //             </div>
    //         );
    //     });
    // };
    const createGrid = () => {
        return productList.map((product, index) => {
            return (
                <div className="grid-item" key={product.product_no}>
                    <img
                        className="product-image"
                        src={product.product_image}
                        onClick={() => handleProductClick(product)}
                    />
                    <div
                        className="product-name"
                        onClick={() => handleProductClick(product)}
                    >
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
                    <div className="product-viewcount">
                        조회수 {product.product_viewcount}
                    </div>
                </div>
            );
        });
    };





    const handleProductAdd = () => {
        // Use navigate function to navigate to '/product/add' path
        navigate('/productAdd');
    };


    return (
        <div>
            <h2>전체 물품 목록</h2>
            <div className="search">
                <select value={searchCategory} onChange={handleCategoryChange}>
                    <option value="PRODUCTNAME">이름</option>
                    <option value="PRODUCTORIGIN">원산지</option>
                    <option value="PRODUCTCATEGORY">카테고리</option>
                </select>
                <input type="text" value={searchKeyword} onChange={handleKeywordChange} onKeyPress={handleKeywordKeyPress} />
                <button onClick={handleSearch}>검색</button>
                <button onClick={handleRefresh}>목록 새로고침</button>
                <button onClick={handleProductAdd}>상품 추가</button>
            </div>
            {productList.length > 0 ? (
                <>
                    <div className="grid-container">{createGrid()}</div>
                    <div className="pagination">
                        <button onClick={() => handlePageChange(1)}>처음</button>
                        {currentPage > 1 && (
                            <button onClick={() => handlePageChange(currentPage - 1)}>이전</button>
                        )}
                        {renderPageButtons()}
                        {currentPage < totalDataCount / itemsPerPage && (
                            <button onClick={() => handlePageChange(currentPage + 1)}>다음</button>
                        )}
                        <button onClick={() => handlePageChange(Math.ceil(totalDataCount / itemsPerPage))}>
                            마지막
                        </button>
                    </div>
                </>
            ) : (
                <div>데이터를 로드 중입니다...</div>
            )}
        </div>
    );
};

export default ProductList;
