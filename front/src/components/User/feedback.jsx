import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import

function FeedbackForm() {
    const navigate = useNavigate(); // Correct usage of navigation hook

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        contact: '',
        feedback: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/feedback/createfeedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error("Failed to submit feedback");

            const data = await response.json();
            console.log("Feedback Submitted", data);
            alert("Feedback submitted successfully!"); // Optional Success Alert
            navigate("/user"); // Corrected navigation
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Error submitting feedback!"); // Optional Error Alert
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#1a1a1a", height: "100vh" }}>
            <div className="bg-dark text-white p-4 rounded w-25" style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.5)" }}>
                <h2 className="text-center text-primary">Submit Feedback</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label><strong>Name</strong></label>
                        <input type="text" name="name" placeholder="Enter Your Name" className="form-control bg-secondary text-white" 
                            value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Location</strong></label>
                        <input type="text" name="location" placeholder="Enter Your Location" className="form-control bg-secondary text-white" 
                            value={formData.location} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Contact</strong></label>
                        <input type="text" name="contact" placeholder="Enter Your Contact" className="form-control bg-secondary text-white" 
                            value={formData.contact} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label><strong>Feedback</strong></label>
                        <textarea name="feedback" placeholder="Write your feedback here..." className="form-control bg-secondary text-white resize-none h-24"
                            value={formData.feedback} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-0">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default FeedbackForm;