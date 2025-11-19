import React, { useState, useEffect } from "react";
//import { fetchOrders, deleteOrder } from "../services/api";
import axios from "axios";

const API_URL = "http://localhost:5000/api/order"
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await fetchOrders();
    setOrders(data);
  };

  const deleteOrder = async (orderId) => {
    const response = await fetch(`${API_URL}/delete/${orderId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.message || "Failed to delete order");
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/showorder`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await deleteOrder(orderId);
      setOrders(orders.filter((order) => order._id !== orderId));
      alert("✅ Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("❌ Failed to delete order.");
    }
  };

  return (
    <div className="flex items-center justify-content-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          📦 Received Orders
        </h2>

        <div className="w-full overflow-x-auto flex justify-content-center">
          <table className="table table-striped table-hover table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Order Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.CustomerName}</td>
                    <td>{order.ProductName}</td>
                    <td>{order.Qty}</td>
                    <td>${order.Total}</td>
                    <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="btn btn-danger btn-sm"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No orders received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
