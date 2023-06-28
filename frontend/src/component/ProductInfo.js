import '../styles/GlobalStyles.css';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../styles/ProductInfo.css';

const ProductInfo = () => {
    const [product, setProduct] = useState(null);
    const { productNo } = useParams();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        fetchProductInfo();
        document.title = `상세페이지`;
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
        return ;
    }

    const handleProductDelete = () => {
        console.log("productNO:", productNo);
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios
                .get(`/api/productDelete/${productNo}`)
                .then(() => {
                    alert("삭제되었습니다.");
                    navigate('/productList');
                })
                .catch((error) => console.log(error));
        } else {
            alert("취소합니다.");
        }
    };

    const handleProductModify = () => {
        console.log("productNAME:", product.product_name);
        console.log("productPRICE:", product.product_price);
        console.log("productMANUFACTURER:", product.product_manufacturer);
        console.log("productORIGIN:", product.product_origin);
        console.log("productCATEGORY:", product.product_category);
        console.log("productIMAGE:", product.product_image);

        navigate(`/productModify/${productNo}`);
    };

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
                    <br /><br />
                    <div className="product-info-modifydelete">
                        <button onClick={handleProductModify}>수정</button>
                        <button onClick={handleProductDelete}>삭제</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
