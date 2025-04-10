import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle login form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        // ✅ Admin Login Check
        if (formData.email === "admin@gmail.com" && formData.password === "admin123") {
            alert("Welcome, Admin!");
            navigate("/admin"); // Redirect to Admin Dashboard
            return; // Stop further execution
        }

        try {
            const response = await axios.post("http://localhost:5000/api/customers/login", formData);
            const { message, token, customer } = response.data;

            setMessage(message);

            // ✅ Store Token, Customer ID & Email Securely
            localStorage.setItem("authToken", token); // Store JWT Token
            localStorage.setItem("customerId", customer._id);
            localStorage.setItem("customerEmail", customer.email); // ✅ Store customer email

            setFormData({ email: "", password: "" }); // Clear form fields
            navigate("/user"); // Redirect to user dashboard
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed!");
        } finally {
            setLoading(false);
        }
    };

    // Handle registration page navigation
    const handleRegister = () => {
        navigate("/signup");
    };

    return (
        <div className="login-container">
            <div className="glass-form">
                <h2>Customer Login</h2>

                {message && <p className="message">{message}</p>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <button type="button" className="register-btn" onClick={handleRegister}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
