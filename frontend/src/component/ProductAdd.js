import '../styles/GlobalStyles.css';
import React, {useState} from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

// ...

const ProductAdd = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [file, setFile] = useState(null);
    const [imageName, setImageName] = useState("");
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [category, setCategory] = useState('');
    const [origin, setOrigin] = useState('');
    const navigate = useNavigate();

    const onUpload = (e) => {
        setFile(e.target.files[0]);
        const file = e.target.files[0];
        const fileName = file.name;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const imageData = reader.result;
            console.log('imageSrc:', imageData);
            console.log('imageName:', fileName);
            setImageSrc(imageData);
            setImageName(fileName);
        };
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('file', file);
            console.log('file:', file)
            formData.append('imageName', imageName);
            console.log('imageName', imageName)
            formData.append('title', title);
            console.log('title', title);
            formData.append('price', price);
            console.log('price', price);
            formData.append('manufacturer', manufacturer);
            console.log('manufacturer', manufacturer);
            formData.append('category', category);
            console.log('category', category);
            formData.append('origin', origin);
            console.log('origin', origin);

            for (const keyValue of formData) console.log(keyValue);
            const response = await axios.post('/api/productAdd', formData, {
                // await axios
                //     .post('/api/productAdd', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('상품이 추가되었습니다:', response.data);

            // 페이지 이동
            navigate('/productList');
        } catch (error) {
            console.error('상품 추가 실패:', error);
        }
    };

    return (
        <div>
            <h2>상품 추가 페이지</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <img width={'50%'} src={imageSrc} alt=""/>
                <div className="form-row">
                    <label htmlFor="image"></label>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={onUpload}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="title">상품이름</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        // placeholder="제목을 입력하세요"
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="price">가격</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        // placeholder="작성자를 입력하세요"
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="manufacturer">제조사</label>
                    <input
                        type="text"
                        id="manufacturer"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        // placeholder="내용을 입력하세요"
                        required
                    ></input>
                </div>
                <div className="form-row">
                    <label htmlFor="origin">원산지</label>
                    <input
                        type="text"
                        id="origin"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        // placeholder="내용을 입력하세요"
                        required
                    ></input>
                </div>
                <div className="form-row">
                    <label htmlFor="category">분류</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        // placeholder="내용을 입력하세요"
                        required
                    ></input>
                </div>

                <button type="submit">저장</button>
            </form>
        </div>
    );
}
export default ProductAdd;