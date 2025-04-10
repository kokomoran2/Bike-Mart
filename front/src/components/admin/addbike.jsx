import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopUp from "../popup";

function Addbike() {
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [date, setDate] = useState("");
    const [engine, setEngine] = useState("");
    const [power, setPower] = useState("");
    const [mileage, setMileage] = useState("");
    const [price, setPrice] = useState("");
    const [Stock, setStock] = useState("");
    const [bikeImage, setBikeImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState("");
    const [popUpVisible, setPopupVisible] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setBikeImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("model", model);
        formData.append("date", date);
        formData.append("engine", engine);
        formData.append("power", power);
        formData.append("mileage", mileage);
        formData.append("price", price);
        formData.append("Stock", Stock);
        formData.append("bikeImage", bikeImage);

        try {
            await axios.post("http://localhost:5000/api/bikes/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setPopupVisible(true);
            setShowPopup(`${name} has been registered successfully!`);
            
            setTimeout(() => {
                setPopupVisible(false);
                navigate("/admin");
            }, 3000);
        } catch (err) {
            console.error("Error uploading bike:", err);
            alert("Error: Failed to register bike. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg,rgb(5, 12, 82), #1e1e1e,rgb(11, 4, 64))',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div className="bg-dark text-white p-4 rounded w-25" style={{ boxShadow: "rgba(51, 66, 80, 0.63)" }}>
                <h2 className="text-center text-success">ADD NEW BIKE</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label><strong>Bike Name</strong></label>
                        <input type="text" placeholder="Enter Bike Name" className="form-control bg-secondary text-white" 
                            onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Model</strong></label>
                        <input type="text" placeholder="Enter Bike Model" className="form-control bg-secondary text-white" 
                            onChange={(e) => setModel(e.target.value)} value={model} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Date</strong></label>
                        <input type="date" className="form-control bg-secondary text-white" 
                            onChange={(e) => setDate(e.target.value)} value={date} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Engine</strong></label>
                        <input type="text" className="form-control bg-secondary text-white" placeholder="Enter Engine Capacity"
                            onChange={(e) => setEngine(e.target.value)} value={engine} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Power</strong></label>
                        <input type="text" className="form-control bg-secondary text-white" placeholder="Enter Power in BHP"
                            onChange={(e) => setPower(e.target.value)} value={power} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Mileage</strong></label>
                        <input type="text" className="form-control bg-secondary text-white" placeholder="Enter Mileage in KM/L"
                            onChange={(e) => setMileage(e.target.value)} value={mileage} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Price</strong></label>
                        <input type="text" className="form-control bg-secondary text-white" placeholder="Enter Price"
                            onChange={(e) => setPrice(e.target.value)} value={price} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Stock</strong></label>
                        <input type="text" className="form-control bg-secondary text-white" placeholder="Enter Stock Left"
                            onChange={(e) => setStock(e.target.value)} value={Stock} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Bike Image</strong></label>
                        <input type="file" className="form-control bg-secondary text-white" accept="image/*"
                            onChange={handleFileChange} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0" disabled={loading}>
                        {loading ? "Uploading..." : "Add Bike"}
                    </button>
                </form>
            </div>
            {popUpVisible && <PopUp message={showPopup} onClose={() => setPopupVisible(false)} />}
        </div>
    );
}

export default Addbike;
