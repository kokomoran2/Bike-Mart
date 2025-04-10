import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ViewDistrictReport = () => {
    const [districtData, setDistrictData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch sales data
    const fetchSales = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/sold");
            if (response.data && Array.isArray(response.data)) {
                processDistrictData(response.data);
            } else {
                setDistrictData([]);
            }
        } catch (error) {
            console.error("Error fetching sales data:", error);
            setError("Failed to fetch sales data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSales();
    }, [fetchSales]);

    // Process District Data for Pie Chart
    const processDistrictData = (salesData) => {
        const districtCount = {};

        salesData.forEach((sale) => {
            const district = sale?.district?.trim() || "Unknown";  // ✅ Fetch district directly from sale
            districtCount[district] = (districtCount[district] || 0) + 1;
        });

        const chartData = Object.entries(districtCount).map(([district, count]) => ({
            name: district,
            value: count,
        }));

        setDistrictData(chartData);
    };

    // Function to generate unique colors for each district
    const generateColor = (index) => {
        const hue = (index * 137) % 360; // Distributes colors evenly
        return `hsl(${hue}, 70%, 50%)`; // Generates a distinct color
    };

    if (loading) return <p style={styles.message}>Loading district sales data...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>District-wise Bike Sales Report</h2>

            {districtData.length > 0 ? (
                <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={districtData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {districtData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={generateColor(index)} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p style={styles.message}>No sales data available.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        background: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
    },
    chartContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
    },
    message: {
        textAlign: "center",
        fontSize: "16px",
        color: "gray",
    },
};

export default ViewDistrictReport;
