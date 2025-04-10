import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const TopSellingBikes = () => {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopSellingBikes = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/sales/top-bikes");
                setBikes(response.data);
            } catch (err) {
                setError("Failed to fetch top-selling bikes");
            } finally {
                setLoading(false);
            }
        };
        fetchTopSellingBikes();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (bikes.length === 0) return <p>No top-selling bikes found.</p>;

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <h2>Top Selling Bikes</h2>

            {/* List of Bikes and Sales Count */}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {bikes.map((bike, index) => (
                    <li key={index} style={{ padding: "5px", borderBottom: "1px solid #ddd" }}>
                        <strong>{bike.name}</strong> - {bike.count} sold
                    </li>
                ))}
            </ul>

            {/* Bar Chart Visualization */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bikes} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopSellingBikes;
