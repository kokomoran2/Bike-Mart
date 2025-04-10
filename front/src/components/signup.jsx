import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import PopUp from "./popup";
import "../styles/signup.css"; // Importing the premium style

function Signup() {
    const districtsOfKerala = [
        "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam",
        "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram",
        "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        location: "",
        landmark: "",
        pinCode: "",
        district: ""
    });

    const [loading, setLoading] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if ((name === "phone" || name === "pinCode") && value && !/^\d*$/.test(value)) return;

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const { name, email, password, phone, location, landmark, pinCode, district } = formData;
    
        if (!name || !email || !password) {
            setPopupMessage("Error: Name, Email, and Password are required.");
            setPopupVisible(true);
            setLoading(false);
            return;
        }
    
        if (!validateEmail(email)) {
            setPopupMessage("Error: Please enter a valid email address.");
            setPopupVisible(true);
            setLoading(false);
            return;
        }
    
        if (district && !districtsOfKerala.includes(district)) {
            setPopupMessage("Error: Please select a valid district from Kerala.");
            setPopupVisible(true);
            setLoading(false);
            return;
        }
    
        // Prepare the user data, removing empty optional fields
        let userData = {
            name,
            email,
            password
        };
    
        if (phone) userData.phone = phone;
    
        let address = {};
        if (location) address.location = location;
        if (landmark) address.landmark = landmark;
        if (pinCode) address.pincode = pinCode;
        if (district) address.district = district;
    
        if (Object.keys(address).length > 0) {
            userData.address = [address]; // Add address only if any field exists
        }
    
        try {
            await axios.post("http://localhost:5000/api/customers/create", userData);
    
            setPopupMessage(`${name} has been registered successfully! Redirecting to Login Page...`);
            setPopupVisible(true);
    
            setTimeout(() => {
                setPopupVisible(false);
                navigate("/login");
            }, 3000);
        } catch (err) {
            console.error("Signup error:", err.response?.data || err.message);
            setPopupMessage(err.response?.data?.message || "Error: Failed to register user. Please try again.");
            setPopupVisible(true);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="register-container">
            <div className="glass-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />
                    </div>

                    {/* //<h5 className="optional-header">Optional Address Details</h5> */}
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter Contact Number"
                            onChange={handleChange}
                            value={formData.phone}
                            pattern="[0-9]*"
                        />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Enter Location"
                            onChange={handleChange}
                            value={formData.location}
                        />
                    </div>
                    <div className="form-group">
                        <label>Landmark</label>
                        <input
                            type="text"
                            name="landmark"
                            placeholder="Enter Landmark (Optional)"
                            onChange={handleChange}
                            value={formData.landmark}
                        />
                    </div>
                    <div className="form-group">
                        <label>Pin Code</label>
                        <input
                            type="text"
                            name="pinCode"
                            placeholder="Enter Pin Code"
                            onChange={handleChange}
                            value={formData.pinCode}
                            pattern="[0-9]*"
                        />
                    </div>
                    <div className="form-group">
                        <label>District</label>
                        <select name="district" value={formData.district} onChange={handleChange} required>
                            <option value="">Select a District</option>
                            {districtsOfKerala.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="register-btn" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="login-link">
                    Already Have an Account? <Link to="/login">Login Here</Link>
                </p>
            </div>

            {popupVisible && <PopUp message={popupMessage} onClose={() => setPopupVisible(false)} />}
        </div>
    );
}

export default Signup;
