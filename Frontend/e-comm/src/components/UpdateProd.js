import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL="http://localhost:5000/api/product"
const UpdateProd = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [Company, setCompany] = useState('');
    const [imgurl, setImgUrl] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        console.log("Received product in UpdateProd:", product);
        if (!product) {
            setMessage({ type: 'error', text: 'No product data found!' });
            setTimeout(() => navigate('/ProductList'), 2000);
        } else {
            setName(product.name || '');
            setPrice(product.price || '');
            setCategory(product.category || '');
            setCompany(product.Company || '');
            setImgUrl(product.imgurl || '');
        }
    }, [product, navigate]);

    const updateProduct = async (e) => {
        e.preventDefault();
        const updatedData = { name, price, category, Company, imgurl };

        try {
            const response = await fetch(`${API_URL}/updateprod/${product._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            const result = await response.json();
            console.log("Update response:", result);

            if (response.ok) {
                setMessage({ type: 'success', text: result.message ||'Product updated successfully!' });
                setTimeout(() => navigate('/product-list'), 2000);
            } else {
                setMessage({ type: 'error', text: result.message || 'Update failed.' });
            }
        } catch (err) {
            console.error('Error:', err);
            setMessage({ type: 'error', text: 'Error updating product.' });
        }
    };

    return (
        <div className="product">
            {message.text && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`} role="alert">
                    {message.text}
                </div>
            )}
            <h1 className="Rtext">Update Product</h1>
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Product category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Product company"
                value={Company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="Enter image url"
                value={imgurl}
                onChange={(e) => setImgUrl(e.target.value)}
            />
            <button className="addprod" onClick={updateProduct}>Update Product</button>
        </div>
    );
};

export default UpdateProd;














// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const UpdateProd = () => {
//     const [name, setname] = React.useState('');
//     const [price, setprice] = React.useState('');
//     const [category, setcategory] = React.useState('');
//     const [Company, setcompany] = React.useState('');
//     const [imgurl, setimgurl] = React.useState('');
//     const params = useParams();

//     useEffect(() => {
//         const getproductdetail = async () => {
//             try {
//                 const result = await fetch(`http://localhost:5000/api/product/update/${params.id}`);
//                 const data = await result.json();
//                 console.log("Fetched product details:", data);
    
//                 setname(data.name || '');
//                 setprice(data.price || '');
//                 setcategory(data.category || '');
//                 setcompany(data.Company || ''); // ← correct capitalization
//                 setimgurl(data.imgurl || '');
//             } catch (error) {
//                 console.error("Error fetching product:", error);
//             }
//         };
//         getproductdetail();
//     }, [params.id]);
//      // ✅ Only runs once when params.id is available
    
//     const updateprod = async () => {
//         console.warn(name, price, category, Company, imgurl);
//         const datas = await fetch(`http://localhost:5000/api/product/updateprod/${params.id}`,{
//              method:'put',
//              body:JSON.stringify({name, price, category, Company, imgurl}),
//              headers:{
//                 "Content-Type":"application/json"
//              }
//         });
//         const prod=await datas.json()
//         console.warn(prod);
//     };

//     return (
//         <div className="product">
//             <h1 className="Rtext">Update Product</h1>
//             <input className="inputBox" type="text" placeholder="Enter Product name"
//                 value={name} onChange={(e) => setname(e.target.value)} />

//             <input className="inputBox" type="text" placeholder="Enter Product price"
//                 value={price} onChange={(e) => setprice(e.target.value)} />

//             <input className="inputBox" type="text" placeholder="Enter Product category"
//                 value={category} onChange={(e) => setcategory(e.target.value)} />

//             <input className="inputBox" type="text" placeholder="Enter Product company"
//                 value={Company} onChange={(e) => setcompany(e.target.value)} />

//             <input className="inputBox" type="text" placeholder="Enter image url"
//                 value={imgurl} onChange={(e) => setimgurl(e.target.value)} />

//             <button className="addprod" onClick={updateprod}>Update Product</button>
//         </div>
//     );
// };

// export default UpdateProd;
