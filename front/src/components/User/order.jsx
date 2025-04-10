import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Correct usage here
    const customerEmail = localStorage.getItem("customerEmail"); 

    const fetchOrders = useCallback(async () => {
        try {
            if (!customerEmail) {
                console.error("No customer email found in local storage");
                setError("No customer email found.");
                return;
            }
    
            const encodedEmail = encodeURIComponent(customerEmail); 
            console.log("Fetching orders for email:", customerEmail, "Encoded:", encodedEmail);
    
            const response = await axios.get(`http://localhost:5000/api/sales/customer/${encodedEmail}`);
            console.log("Orders fetched:", response.data);
    
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data || error);
            setError(error.response?.data?.message || "Failed to fetch orders.");
        } finally {
            setLoading(false);
        }
    }, [customerEmail]);
    
    useEffect(() => {
        if (customerEmail) {
            fetchOrders();
        }
    }, [customerEmail, fetchOrders]);

    if (loading) return <p style={{ textAlign: "center", fontSize: "18px", color: "gray" }}>Loading orders...</p>;
    if (error) return <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{error}</p>;

    return (
        <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
            <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Your Orders</h2>
            {orders.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "16px" }}>No orders found.</p>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Bike Name</th>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Price</th>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>District</th>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Order Status</th>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "10px" }}>{order.bike?.name || "Bike details unavailable"}</td>
                                    <td style={{ padding: "10px" }}>₹{order.bike?.price.toLocaleString()}</td>
                                    <td style={{ padding: "10px" }}>{order.district || "N/A"}</td>
                                    <td style={{ padding: "10px", fontWeight: "bold" }}>
                                        {order.orderStatus.outForDelivery 
                                            ? "Out for Delivery" 
                                            : order.orderStatus.packageDispatched 
                                            ? "Package Dispatched" 
                                            : "Initiated"}
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => navigate(`/feedback?orderId=${order._id}`)} 
                                            style={{
                                                backgroundColor: "#f44336", 
                                                color: "white", 
                                                padding: "8px 12px", 
                                                borderRadius: "5px", 
                                                border: "none", 
                                                cursor: "pointer"
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Order;
