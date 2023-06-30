import '../styles/GlobalStyles.css';
import React, {memo, useEffect, useLayoutEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../styles/ProductInfo.css';
import ReactStars from 'react-rating-stars-component';
import Rating from "react-rating-stars-component";

const ProductInfo = () => {
    const [product, setProduct] = useState(
        // {"product_rating": 0,}
        null
    );
    const [rating, setRating] = useState(0);

    const {product_rating = 0} = {...product};
    const {productNo} = useParams();
    const navigate = useNavigate();
    const [selectedRating, setSelectedRating] = useState(0);
    useLayoutEffect( () => {
         fetchProductInfo();
        document.title = `상세페이지`;
    }, []);

    const fetchProductInfo = () => {
        axios
            .get(`/api/productInfo/${productNo}`)
            .then((response) => {
                const productData = response.data[0];
                console.log(productData);
                const {
                    product_name,
                    product_price,
                    product_manufacturer,
                    product_origin,
                    product_category,
                    product_rating,
                    product_viewcount,
                    product_image,
                    product_ratingcount
                } = productData;

                setProduct({
                    ...product,
                    product_name,
                    product_price,
                    product_manufacturer,
                    product_origin,
                    product_category,
                    product_rating,
                    product_viewcount,
                    product_image,
                    product_ratingcount
                });
            })
            .catch((error) => console.log(error));
    };

    if (!product) {
        return null;
    }

    const handleProductDelete = () => {
        console.log('productNO:', productNo);
        if (window.confirm('정말 삭제하시겠습니까?')) {
            axios
                .get(`/api/productDelete/${productNo}`)
                .then(() => {
                    alert('삭제되었습니다.');
                    navigate('/productList');
                })
                .catch((error) => console.log(error));
        } else {
            alert('취소합니다.');
        }
    };

    const handleProductModify = () => {
        console.log('productNAME:', product.product_name);
        console.log('productPRICE:', product.product_price);
        console.log('productMANUFACTURER:', product.product_manufacturer);
        console.log('productORIGIN:', product.product_origin);
        console.log('productCATEGORY:', product.product_category);
        console.log('productIMAGE:', product.product_image);

        navigate(`/productModify/${productNo}`);
    };

    const handleProductRating = async () => {
        const productRating = {
            product_no: productNo,
            product_rating: selectedRating,
        };
        await axios
            .post(`/api/productRating`, productRating)
            .then(()=>{
                    axios
                        .get(`/api/productInfo/${productNo}`)
                        .then((response) => {
                            const productData = response.data[0];
                            console.log(productData);
                            const {
                                product_rating,
                                product_ratingcount
                            } = productData;

                            setProduct({
                                ...product,
                                product_rating,
                                product_ratingcount
                            });
                        })
                        .catch((error) => console.log(error));
            }
            ).catch((error) => {
                console.log(error);
            });
        setSelectedRating(0);
    };
    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };
    const MyComponent = memo(({product_rating}) =>{
        return <ReactStars count={5}
                           size={35}
                           value={product_rating}
                           activeColor="#ffb400"
                           emptyIcon={<span style={{ fontSize: '35px' }}>★</span>}
                           halfIcon={<span style={{ fontSize: '35px' }}>✩</span>}
                           filledIcon={<span style={{ fontSize: '35px' }}>★</span>}
                           edit={false}
        />;
    })
    const MyComponent2 = memo(({selectedRating}) =>{
        return <ReactStars
            count={5}
            size={25}
            value={selectedRating}
            activeColor="#ffb400"
            emptyIcon={<span style={{ fontSize: '25px' }}>★</span>}
            halfIcon={<span style={{ fontSize: '25px' }}>✩</span>}
            filledIcon={<span style={{ fontSize: '25px' }}>★</span>}
            edit={true}
            onChange={handleRatingChange}
        />
    })
    return (
        <div>
            <h2>상세 페이지</h2>
            <div className="product-info-container">
                <table className="product-info-table">
                    <tbody>
                    <tr>
                        <td>
                            <img
                                src={product.product_image}
                                alt="Product"
                                className="product-info-image"
                            />
                        </td>
                        <td>
                            <div className="product-info-details">
                                <div className ="product-info-title">{product.product_name}</div>
                                <div>판매가: {product.product_price}원</div>
                                <div>제조사: {product.product_manufacturer}</div>
                                <div>원산지: {product.product_origin}</div>
                                <div>분류: {product.product_category}</div>
                                <div className="product-rating">
                                    <MyComponent product_rating={product_rating}/>
                                    {product.product_rating} ({product.product_ratingcount})
                                </div>
                                <div>조회수: {product.product_viewcount}</div>
                                <br />
                                <div className="rating-save">
                                    <MyComponent2 selectedRating={selectedRating}/>
                                    <button onClick={handleProductRating}>평점 저장</button>
                                </div>
                                <div className="product-info-modifydelete">
                                    <button onClick={handleProductModify}>수정</button>
                                    <button onClick={handleProductDelete}>삭제</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default ProductInfo;
