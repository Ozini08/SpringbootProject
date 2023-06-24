import '../styles/GlobalStyles.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/ProductInfo.css';

const ProductInfo = () => {
    const [product, setProduct] = useState(null);
    const { productNo } = useParams();

    useEffect(() => {
        fetchProductInfo();
    }, []);

    const fetchProductInfo = () => {
        axios
            .get(`/api/productInfo/${productNo}`)
            .then((response) => {
                const productData = response.data[0];
                const {
                    product_name,
                    product_price,
                    product_manufacturer,
                    product_origin,
                    product_category,
                    product_rating,
                    product_viewcount,
                    product_image,
                } = productData;
                setProduct({
                    product_name,
                    product_price,
                    product_manufacturer,
                    product_origin,
                    product_category,
                    product_rating,
                    product_viewcount,
                    product_image,
                });
            })
            .catch((error) => console.log(error));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>상세 페이지</h2>
            <div className="product-info-container">
                <img
                    src={product.product_image}
                    alt="Product"
                    className="product-info-image"
                />
                <div className="product-info-details">
                    <div>{product.product_name}</div>
                    <div>판매가: {product.product_price}원</div>
                    <div>제조사: {product.product_manufacturer}</div>
                    <div>원산지: {product.product_origin}</div>
                    <div>분류: {product.product_category}</div>
                    <div>평점: {product.product_rating}</div>
                    <div>조회수: {product.product_viewcount}</div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
