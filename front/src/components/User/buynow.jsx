import React, { useEffect, useState } from "react";
import axios from "axios";

const Buynow = () => {
    const [bikes, setBikes] = useState([]);
    const [selectedBike, setSelectedBike] = useState(null);
    const [downPayment, setDownPayment] = useState(5000); // Default down payment

    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/bikes/all");
                setBikes(response.data);
            } catch (error) {
                console.error("Error fetching bikes:", error);
            }
        };
        fetchBikes();
    }, []);

    const handleBikeSelect = (bikeId) => {
        const bike = bikes.find((b) => b._id === bikeId);
        setSelectedBike(bike);
        setDownPayment(5000); // Reset down payment when a new bike is selected
    };

    const handleDownPaymentChange = (e) => {
        let value = Number(e.target.value);
        if (value < 0) value = 0; // Ensure non-negative values
        if (selectedBike && value > selectedBike.price) value = selectedBike.price; // Limit to bike price
        setDownPayment(value);
    };

    const handlePayment = () => {
        alert("Purchase Successful!");
    };

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark" style={{
                background: "linear-gradient(135deg, rgb(30, 40, 30), rgb(10, 15, 10))",
                borderBottom: "2px solid rgba(0, 255, 0, 0.5)",
            }}>
                <div className="container-fluid">
                    <a className="navbar-brand text-white fw-bold" href="/">BIKE MART🏍️</a>
                </div>
            </nav>

            {/* Buynow Content */}
            <div className="flex justify-center items-center p-6">
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-5xl">
                    <h2 className="text-2xl font-bold text-center mb-4">Choose Your Bike</h2>
                    {bikes.length === 0 ? (
                        <p className="text-center text-gray-500">No bikes available.</p>
                    ) : (
                        <>
                            {/* Bike Dropdown */}
                            <select 
                                className="block w-full p-2 border border-gray-300 rounded mb-4"
                                onChange={(e) => handleBikeSelect(e.target.value)}
                            >
                                <option value="">Select a bike</option>
                                {bikes.map((bike) => (
                                    <option key={bike._id} value={bike._id}>{bike.name} - ₹{bike.price}</option>
                                ))}
                            </select>

                            {/* Bike Details */}
                            {selectedBike && (
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <img 
                                        src={selectedBike.bikeImage} 
                                        alt={selectedBike.name} 
                                        className="rounded-lg mb-3 w-1/2"
                                    />
                                    <h3 className="text-lg font-bold">{selectedBike.name}</h3>
                                    <p><strong>Model:</strong> {selectedBike.model}</p>
                                    <p><strong>Engine:</strong> {selectedBike.engine}</p>
                                    <p><strong>Power:</strong> {selectedBike.power}</p>
                                    <p><strong>Mileage:</strong> {selectedBike.mileage}</p>
                                    <p><strong>Price:</strong> ₹{selectedBike.price}</p>
                                    
                                    {/* Down Payment Input */}
                                    <label className="block font-bold mt-3">Enter Down Payment:</label>
                                    <input 
                                        type="number"
                                        className="block w-full p-2 border border-gray-300 rounded mb-4"
                                        value={downPayment}
                                        onChange={handleDownPaymentChange}
                                        min="0"
                                        max={selectedBike.price}
                                    />

                                    <p><strong>Final Price:</strong> ₹{selectedBike.price - downPayment}</p>

                                    <button 
                                        className="bg-green-500 text-black p-2 rounded mt-3 w-full"
                                        onClick={handlePayment}
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Buynow;