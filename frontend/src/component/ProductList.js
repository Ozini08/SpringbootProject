import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/ProductList.css'; // CSS 파일 import
import '../styles/GlobalStyles.css';

const ProductList = () => {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios
            .get('/productList')
            .then((response) => setProductList(response.data))
            .catch((error) => console.log(error));
    }, []);

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

    return (
        <div>
            <h2>전체 물품 목록</h2>
            <div  className="grid-container">
            {createGrid()}
            </div>
        </div>
    );
};

export default ProductList;
