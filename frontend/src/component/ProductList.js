import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/ProductList.css';
import '../styles/GlobalStyles.css';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchCategory, setSearchCategory] = useState('PRODUCTNAME');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [totalDataCount, setTotalDataCount] = useState(0);
    const itemsPerPage = 16;
    const pageButtonCount = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductsByPage(1);
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

    const createGrid = () => {
        return productList.map((product, index) => (
            <div className="grid-item" key={index}>
                <div className="product-name">Product Name: {product.productname}</div>
                <div className="product-origin">Product Origin: {product.productorigin}</div>
                <div className="product-price">Product Price: {product.productprice}</div>
                <div className="product-category">Product Category: {product.productcategory}</div>
                <div className="product-today">Today: {product.today}</div>
            </div>
        ));
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
                    <option value="PRODUCTNAME">Product Name</option>
                    <option value="PRODUCTORIGIN">Product Origin</option>
                    <option value="PRODUCTCATEGORY">Product Category</option>
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
