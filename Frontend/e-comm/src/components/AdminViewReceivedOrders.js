import React, { useState, useEffect } from "react";
//import { fetchOrders, deleteOrder } from "../services/api";
import axios from "axios";

const API_URL="http://localhost:5000/api/order"
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
      throw new Error(response.message||"Failed to delete order");
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
          <table className="w-auto text-center border-collapse">
            <thead className="bg-gray-800 text-red">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`border-b transition duration-200 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                    } hover:bg-gray-300`}
                  >
                    <td className="py-3 px-4">{order._id}</td>
                    <td className="py-3 px-4">{order.CustomerName}</td>
                    <td className="py-3 px-4">{order.ProductName}</td>
                    <td className="py-3 px-4">{order.Qty}</td>
                    <td className="py-3 px-4">${order.Total}</td>
                    <td className="py-3 px-4">
                      {new Date(order.OrderDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-500 hover:bg-red-600 text-red px-4 py-2 rounded-md transition duration-200 shadow-md transform hover:scale-105"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
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
