import React from "react";
import { useNavigate } from "react-router-dom";

const API_URL="http://localhost:5000/api/product";
const Addproduct = () => {
  const [name, setname] = React.useState("");
  const [price, setprice] = React.useState("");
  const [category, setcategory] = React.useState("");
  const [Company, setcompany] = React.useState("");
  const [imgurl, setimgurl] = React.useState("");
  const [error, seterror] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const navigate = useNavigate();

const addproduct = async () => {
    if (!name || !price || !category || !Company || !imgurl) {
      seterror(true);
      return;
    }
  
    const userid = JSON.parse(localStorage.getItem("User"))._id;
  
    const response = await fetch(`${API_URL}/addproduct`, {
      method: "POST",
      body: JSON.stringify({ name, price, category, Company, userid, imgurl }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const result = await response.json();
    console.warn(result);
  
    if (response.status === 200) {
      setMessage(result.message );
      setTimeout(() => {
        navigate("/product-list");
      }, 2000);
    } else {
      setMessage(result.message ||"❌ Failed to add product.");
    }
  };
  
  return (
    <>
      <div className="product">
        <h1 className="Rtext">Add Product</h1>

        {message && <div className="message">{message}</div>}

        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        {error && !name && <span className="invalid-input">Enter valid Name</span>}

        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
        {error && !price && <span className="invalid-input">Enter valid Price</span>}

        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product category"
          value={category}
          onChange={(e) => setcategory(e.target.value)}
        />
        {error && !category && <span className="invalid-input">Enter valid category</span>}

        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product company"
          value={Company}
          onChange={(e) => setcompany(e.target.value)}
        />
        {error && !Company && <span className="invalid-input">Enter valid Company</span>}

        <input
          className="inputBox"
          type="text"
          placeholder="Enter image url"
          value={imgurl}
          onChange={(e) => setimgurl(e.target.value)}
        />
        {error && !imgurl && <span className="invalid-input">Enter valid URL</span>}

        <button className="addprod" onClick={addproduct}>
          Add Product
        </button>
      </div>
    </>
  );
};

export default Addproduct;
