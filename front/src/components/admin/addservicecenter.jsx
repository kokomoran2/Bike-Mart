import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopUp from "../popup";

function AddService() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [status, setStatus] = useState("Open");
    const [closingTime, setClosingTime] = useState("");
    const [services, setServices] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(null);
    const [popUpVisible, setPopupVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const serviceCenterData = {
            name,
            address,  // Make sure this is included
            contact,
            status,
            closingTime,
            services: services ? services.split(",").map((s) => s.trim()) : [],
            location: {
                type: "Point",
                coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
        };
        ;

        try {
            await axios.post("http://localhost:5000/api/service-centers/add", serviceCenterData);
            setShowPopup(`${name} added successfully!`);
            setPopupVisible(true);
            setTimeout(() => {
                setPopupVisible(false);
                navigate("/admin");
            }, 3000);
        } catch (err) {
            console.error("Error submitting service center:", err);
            alert("Error: Failed to submit service center. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate("/admin");
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, rgb(5, 12, 82), #1e1e1e, rgb(11, 4, 64))',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div className="bg-dark text-white p-4 rounded w-25">
                <h2>ADD SERVICE CENTER</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label><strong>Name</strong></label>
                        <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Address</strong></label>
                        <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} value={address} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Contact</strong></label>
                        <input type="text" className="form-control" onChange={(e) => setContact(e.target.value)} value={contact} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Status</strong></label>
                        <select className="form-control" onChange={(e) => setStatus(e.target.value)} value={status} required>
                            <option value="Open">Open</option>
                            <option value="Temporarily Closed">Temporarily Closed</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label><strong>Closing Time</strong></label>
                        <input type="text" className="form-control" onChange={(e) => setClosingTime(e.target.value)} value={closingTime} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Services</strong> (comma separated)</label>
                        <input type="text" className="form-control" onChange={(e) => setServices(e.target.value)} value={services} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Latitude</strong></label>
                        <input type="text" className="form-control" onChange={(e) => setLatitude(e.target.value)} value={latitude} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Longitude</strong></label>
                        <input type="text" className="form-control" onChange={(e) => setLongitude(e.target.value)} value={longitude} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100" disabled={loading}>
                        {loading ? "Adding..." : "Add"}
                    </button>
                    <button type="button" onClick={handleBack} className="btn btn-outline-success w-100 mt-2">Go Home</button>
                </form>
            </div>
            {popUpVisible && <PopUp message={showPopup} onClose={() => setPopupVisible(false)} />}
        </div>
    );
}

export default AddService;
