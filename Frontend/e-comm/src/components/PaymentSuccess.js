import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const saveOrder = async () => {
      const orderData = JSON.parse(localStorage.getItem("pendingOrder"));
      if (!orderData) return;

      await fetch("http://localhost:5000/api/order/createorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      localStorage.removeItem("pendingOrder");
    };

    saveOrder();
  }, []);

  return <h2>✅ Payment Successful! Your order has been saved.</h2>;
};

export default PaymentSuccess;
