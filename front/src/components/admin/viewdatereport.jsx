import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const ViewDateReport = () => {
    const [dateData, setDateData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState(""); // Start Date State
    const [endDate, setEndDate] = useState(""); // End Date State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch ALL sales data initially
    const fetchAllSales = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("http://localhost:5000/api/sold");
            if (response.data && Array.isArray(response.data)) {
                processDateData(response.data);
            } else {
                setDateData([]);
            }
        } catch (error) {
            console.error("Error fetching sales data:", error);
            setError("Failed to fetch sales data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllSales();
    }, [fetchAllSales]);

    // Process Date Data for Bar Chart
    const processDateData = (salesData) => {
        const dateCount = {};

        salesData.forEach((sale) => {
            const saleDate = new Date(sale.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
            dateCount[saleDate] = (dateCount[saleDate] || 0) + 1;
        });

        const chartData = Object.entries(dateCount).map(([date, count]) => ({
            date,
            sales: count,
        }));

        setDateData(chartData);
        setFilteredData(chartData); // Show full data initially
    };

    // Function to apply date filter
    const applyFilter = () => {
        if (!startDate || !endDate) {
            setFilteredData(dateData); // If no filter, show all data
            return;
        }

        const filtered = dateData.filter((item) => {
            const itemDate = new Date(item.date).getTime();
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();

            return itemDate >= start && itemDate <= end;
        });

        setFilteredData(filtered);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Date-wise Bike Sales Report</h2>

            {/* Date Filter Inputs */}
            <div style={styles.filterContainer}>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.input} />
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.input} />
                <button onClick={applyFilter} style={styles.button}>Filter</button>
                <button onClick={() => setFilteredData(dateData)} style={styles.resetButton}>Reset</button>
            </div>

            {loading && <p style={styles.message}>Loading sales data...</p>}
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            {/* Sales Chart */}
            {filteredData.length > 0 ? (
                <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p style={styles.message}>No sales data available for the selected period.</p>
            )}
        </div>
    );
};

// Styles for UI
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
    filterContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap",
    },
    input: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px",
    },
    button: {
        padding: "8px 12px",
        border: "none",
        background: "#007bff",
        color: "white",
        cursor: "pointer",
        borderRadius: "5px",
    },
    resetButton: {
        padding: "8px 12px",
        border: "none",
        background: "#ff4444",
        color: "white",
        cursor: "pointer",
        borderRadius: "5px",
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

export default ViewDateReport;
