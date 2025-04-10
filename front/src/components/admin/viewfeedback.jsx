import React, { useEffect, useState } from "react";

function ViewFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);

    // Fetch all feedbacks
    const fetchFeedbacks = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/feedback/get");
            if (!response.ok) throw new Error("Failed to fetch feedbacks");
            const data = await response.json();
            setFeedbacks(data.feedbacks);
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    // Delete feedback by ID
    const deleteFeedback = async (id) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) return;
        try {
            const response = await fetch(`http://localhost:5000/api/feedback/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Failed to delete feedback");
            alert("Feedback deleted successfully!");
            setFeedbacks(feedbacks.filter(feedback => feedback._id !== id)); // Remove from UI
        } catch (error) {
            console.error("Error deleting feedback:", error);
            alert("Error deleting feedback!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 mt-6 shadow-lg border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">View Feedback</h2>
            {feedbacks.length === 0 ? (
                <p>No feedback available.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Location</th>
                            <th className="border p-2">Contact</th>
                            <th className="border p-2">Feedback</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback._id} className="border">
                                <td className="border p-2">{feedback.name}</td>
                                <td className="border p-2">{feedback.location}</td>
                                <td className="border p-2">{feedback.contact}</td>
                                <td className="border p-2">{feedback.feedback}</td>
                                <td className="border p-2 text-center">
                                    <button 
                                        onClick={() => deleteFeedback(feedback._id)} 
                                        className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ViewFeedback;