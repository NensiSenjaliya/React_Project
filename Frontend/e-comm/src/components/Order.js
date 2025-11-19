

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import 'react-toastify/dist/ReactToastify.css';

const API_PAYMENT = "http://localhost:5000/api/payment";

const stripePromise = loadStripe("...."); // Replace with your Stripe public key

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const product = location.state?.product || {};
  const userData = JSON.parse(localStorage.getItem("User")) || {};
  const userId = userData._id || "";
  const userName = userData.name || "";

  useEffect(() => {
    if (!product || !product._id) {
      toast.error("No product selected. Redirecting...");
      const timeout = setTimeout(() => navigate("/user-panel/products"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [product, navigate]);

  const [order, setOrder] = useState({
    ProductId: product._id || "",
    ProductName: product.name || "Unknown Product",
    CustomerId: userId,
    CustomerName: userName,
    Qty: 1,
    price: product.price || 0,
    Total: product.price || 0,
  });

  const handleQtyChange = (qty) => {
    if (qty < 1) return;
    setOrder((prev) => ({
      ...prev,
      Qty: qty,
      Total: qty * prev.price,
    }));
  };

  const handleSubmit = async () => {
    try {
      localStorage.setItem("pendingOrder", JSON.stringify(order));
      const stripe = await stripePromise;

      const response = await fetch(`${API_PAYMENT}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });

      //       const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ order }),
      // });

      const result = await response.json();

      if (!response.ok || !result.id) {
        toast.error(result.error || "Payment session creation failed.");
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: result.id });

      if (error) {
        toast.error(error.message);
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("❌ Error initiating payment.");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Place Order</h2>
      <p><strong>Product:</strong> {order.ProductName}</p>
      <p><strong>Customer:</strong> {order.CustomerName}</p>
      <p><strong>Price:</strong> ₹{order.price}</p>

      <div>
        <button onClick={() => handleQtyChange(order.Qty - 1)} disabled={order.Qty <= 1}>-</button>
        <span style={{ margin: '0 10px' }}>{order.Qty}</span>
        <button onClick={() => handleQtyChange(order.Qty + 1)}>+</button>
      </div>

      <p><strong>Total:</strong> ₹{order.Total}</p>
      <button className="btn btn-primary" onClick={handleSubmit}>Pay with Stripe</button>
    </div>
  );
};

export default Order;



///////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL="http://localhost:5000/api/order"
// const Order = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const product = location.state?.product || {};
//   console.log("Received product:", product);

//   const userData = JSON.parse(localStorage.getItem("User")) || {};
//   const userId = userData._id;
//   const userName = userData.name;

//   // Redirect if no product
//   useEffect(() => {
//     if (!product._id) {
//       toast.error("No product selected. Redirecting...");
//       const timeout = setTimeout(() => navigate("/user-panel/products"), 2000);
//       return () => clearTimeout(timeout); // cleanup
//     }
//   }, [product, navigate]);

//   const [order, setOrder] = useState({
//     ProductId: product._id || "",
//     ProductName: product.name || "",
//     CustomerId: userId || "",
//     CustomerName: userName || "",
//     Qty: 1,
//     price: product.price || 0,
//     Total: product.price || 0,
//   });

//   const handleQtyChange = (qty) => {
//     if (qty < 1) return;
//     setOrder((prev) => ({
//       ...prev,
//       Qty: qty,
//       Total: qty * prev.price,
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!order.ProductId || !order.CustomerId) {
//       toast.error("Missing product or user information.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/createorder`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(order),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         toast.success("✅ Order placed successfully!");
//         setTimeout(() => navigate("/user-panel/products"), 2000);
//       } else {
//         toast.error(result.error || "❌ Failed to place order.");
//         console.log(result.error)
//       }
//     } catch (error) {
//       console.error("Order error:", error);
//       toast.error("❌ Server error while placing order.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <ToastContainer />
//       <h2>Place Order</h2>
//       <p><strong>Product:</strong> {order.ProductName}</p>
//       <p><strong>Customer:</strong> {order.CustomerName}</p>
//       <p><strong>Price:</strong> ₹{order.price}</p>

//       <div>
//         <button onClick={() => handleQtyChange(order.Qty - 1)} disabled={order.Qty <= 1}>-</button>
//         <span style={{ margin: '0 10px' }}>{order.Qty}</span>
//         <button onClick={() => handleQtyChange(order.Qty + 1)}>+</button>
//       </div>

//       <p><strong>Total:</strong> ₹{order.Total}</p>
//       <button className="btn btn-primary" onClick={handleSubmit}>Place Order</button>
//     </div>
//   );
// };

// export default Order;





/////////////////////////////////////////////////////////////////
