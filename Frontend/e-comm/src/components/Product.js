import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL="http://localhost:5000/api/product"
const Product = () => {
    const [product, setproduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getproduct();
    }, []);


    const getproduct = async () => {
        let result = await fetch(`${API_URL}/products`);
        result = await result.json();

        // Check if result.products exists and is an array
        if (Array.isArray(result.products)) {
            setproduct(result.products);
        } else {
            console.error("Unexpected API response:", result);
            setproduct([]); // fallback
        }
    };


    return (

        <>
            <div className="container mt-5">
                <h2 className="text-center text-primary">Product List</h2>

                <div className="row">
                    {product.map((pro) => (
                        <div key={pro._id} className="col-md-4 mb-4">
                            <div className="card shadow-lg border-0">
                                <img
                                    src={pro.imgurl}
                                    alt={pro.name}
                                    className="card-img-top img-fluid"
                                    style={{ height: "300px", objectFit: "contain" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{pro.name}</h5>
                                    <p className="card-text">{pro.category}</p>
                                    <p className="card-text">{pro.Company}</p>
                                    <p className="fw-bold text-success">₹{pro.price}</p>

                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => navigate("/order", { state: { product: pro } })}
                                    >
                                        Shop now
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Product;
