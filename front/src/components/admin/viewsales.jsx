import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewSales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/sales/all");
            setSales(response.data);
        } catch (error) {
            console.error("Error fetching sales data:", error);
            setError("Failed to fetch sales data.");
        } finally {
            setLoading(false);
        }
    };

    const deleteSale = async (saleId) => {
        if (window.confirm("Are you sure you want to delete this sale?")) {
            try {
                await axios.delete(`http://localhost:5000/api/sales/${saleId}`);
                setSales((prevSales) => prevSales.filter((sale) => sale._id !== saleId));
                alert("Sale deleted successfully!");
            } catch (error) {
                console.error("Error deleting sale:", error);
                alert("Failed to delete sale.");
            }
        }
    };
    const Sold = async (saleId) => {
        if (window.confirm("Are you sure you want to Mark As Sold?")) {
          try {
            const response = await axios.post(`http://localhost:5000/api/sold/${saleId}`);
            setSales((prevSales) => prevSales.filter((sale) => sale._id !== saleId));
            alert(response.data.message);
          } catch (error) {
            console.error("Error Marking:", error);
            alert(error.response?.data?.message || "Failed to Mark.");
          }
        }
      };      

    const toggleOrderStatus = async (saleId, status) => {
        try {
            const updatedSales = sales.map((sale) => {
                if (sale._id === saleId) {
                    const currentStatus = sale.orderStatus || { 
                        initiated: false, 
                        packageDispatched: false, 
                        outForDelivery: false 
                    };

                    const newStatus = !currentStatus[status];

                    axios.put("http://localhost:5000/api/sales/update-status", { saleId, status });

                    return {
                        ...sale,
                        orderStatus: { ...currentStatus, [status]: newStatus },
                    };
                }
                return sale;
            });

            setSales(updatedSales);
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update order status.");
        }
    };

    if (loading) return <p style={{ textAlign: "center", fontSize: "18px", color: "gray" }}>Loading sales data...</p>;
    if (error) return <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{error}</p>;

    return (
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
            <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Bike Bookings</h2>
            {sales.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "16px" }}>No sales records found.</p>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Bike</th>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Price</th>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Customer</th>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>District</th>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Address</th>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Date</th>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Order Status</th>
                                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) => (
                                <tr key={sale._id} style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "10px" }}>{sale.bike.name || "Unknown"}</td>
                                    <td style={{ padding: "10px", color: "green", fontWeight: "bold" }}>
                                        ₹{!isNaN(Number(sale.bike.price)) ? Number(sale.bike.price).toLocaleString() : "N/A"}
                                    </td>
                                    <td style={{ padding: "10px" }}>{sale.customer.name || "Unknown"}</td>
                                    <td style={{ padding: "10px" }}>{sale.district || "Unknown"}</td> {/* ✅ Fix: District from backend */}
                                    <td style={{ padding: "10px" }}>{sale.customer.address || "No address provided"}</td>
                                    <td style={{ padding: "10px" }}>{new Date(sale.date).toLocaleDateString()}</td>
                                    <td style={{ padding: "10px" }}>
                                        {['initiated', 'packageDispatched', 'outForDelivery'].map((status) => (
                                            <button 
                                                key={status} 
                                                onClick={() => toggleOrderStatus(sale._id, status)} 
                                                style={{ 
                                                    margin: "5px", 
                                                    padding: "5px 10px", 
                                                    borderRadius: "5px", 
                                                    backgroundColor: sale.orderStatus?.[status] ? "#4CAF50" : "#ccc", 
                                                    color: "white", 
                                                    border: "none", 
                                                    cursor: "pointer", 
                                                    transition: "background-color 0.3s ease"
                                                }}
                                            >
                                                {status.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                            </button>
                                        ))}
                                    </td>
                                    <td style={{ padding: "10px" }}>
                                        <button onClick={() => deleteSale(sale._id)} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Delete</button>
                                    </td>
                                    <td style={{ padding: "10px" }}>
                                        <button onClick={() => Sold(sale._id)} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Sold</button>
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

export default ViewSales;
