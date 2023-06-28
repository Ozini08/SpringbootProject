import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate ,Link } from 'react-router-dom';

const ProductModify = () => {
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const { productNo } = useParams();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        fetchProductInfo();
        document.title = `수정페이지`;
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
                    product_image,
                    product_no
                } = productData;
                setProduct({
                    product_name,
                    product_price,
                    product_manufacturer,
                    product_origin,
                    product_category,
                    product_image,
                    product_no
                });
            })
            .catch((error) => console.log(error));
    };

    const handleImageChange = (event) => {
        setFile(event.target.files[0]);
        const file = event.target.files[0];
        setSelectedImage(file);

        // 이미지 미리보기를 위해 FileReader 사용
        const reader = new FileReader();
        reader.onload = () => {
            setProduct({ ...product, product_image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleProductSave = () => {
        const modifiedProduct = {
            product_no: productNo,
            product_name: product.product_name,
            product_price: product.product_price,
            product_manufacturer: product.product_manufacturer,
            product_origin: product.product_origin,
            product_category: product.product_category,
            product_image: product.product_image,
        };

        if (selectedImage) {
            const formData = new FormData();
            formData.append('file', file);
            console.log('file:', file)
            formData.append('title', product.product_name);
            console.log('title', product.product_name);
            formData.append('price', product.product_price);
            console.log('price', product.product_price);
            formData.append('manufacturer', product.product_manufacturer);
            console.log('manufacturer', product.product_manufacturer);
            formData.append('category', product.product_category);
            console.log('category', product.product_category);
            formData.append('origin', product.product_origin);
            console.log('origin', product.product_origin);
            formData.append('no',product.product_no);
            console.log('no', product.product_no);
            // formData.append('image', selectedImage);
            axios
                .post('/api/productModifyAndImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    const imageUrl = response.data.imageUrl;
                    modifiedProduct.product_image = imageUrl;
                    updateProduct(modifiedProduct);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            updateProduct(modifiedProduct);
        }
    };

    const updateProduct = (modifiedProduct) => {
        axios
            .post('/api/productModify', modifiedProduct)
            .then((response) => {
                navigate(`/productInfo/${productNo}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (!product) {
        return ;
    }

    return (
        <div>
            <h2>수정 페이지</h2>
            <div className="product-info-container">
                <img src={product.product_image} alt="Product" className="product-info-image" />
                <div className="product-info-details">
                    <br />
                    <div>
                        <label>상품명{"\u00A0\u00A0"}</label>
                        <input
                            value={product.product_name}
                            onChange={(e) => setProduct({ ...product, product_name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>판매가{"\u00A0\u00A0"}</label>
                        <input
                            value={product.product_price}
                            onChange={(e) => setProduct({ ...product, product_price: e.target.value })}
                        />
                        원
                    </div>
                    <div>
                        <label>제조사{"\u00A0\u00A0"}</label>
                        <input
                            value={product.product_manufacturer}
                            onChange={(e) => setProduct({ ...product, product_manufacturer: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>원산지{"\u00A0\u00A0"}</label>
                        <input
                            value={product.product_origin}
                            onChange={(e) => setProduct({ ...product, product_origin: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>분류{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</label>
                        <input
                            value={product.product_category}
                            onChange={(e) => setProduct({ ...product, product_category: e.target.value })}
                        />
                    </div>
                    <br />
                    <br />
                    <div className="product-info-modifydelete">
                        <button onClick={handleProductSave}>저장</button>
                        <Link to={`/productInfo/${productNo}`} className="link">
                            <button>취소</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <p>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</p>
                <label>이미지 변경</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
        </div>
    );
};

export default ProductModify;
