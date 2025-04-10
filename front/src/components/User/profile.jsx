import { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/profile.css";

const Profile = () => {
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: [{ location: "", pincode: "", landmark: "", district: "" }],
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Initially, editing is disabled

    const customerId = localStorage.getItem("customerId");

    const districtsOfKerala = [
        "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam",
        "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram",
        "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
    ];

    useEffect(() => {
        if (!customerId) {
            setError("User not logged in");
            setLoading(false);
            return;
        }

        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/customers/get/${customerId}`);
                setCustomer(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch customer details");
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [customerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleAddressChange = (index, e) => {
        const { name, value } = e.target;
        const updatedAddress = [...customer.address];
        updatedAddress[index][name] = value;
        setCustomer({ ...customer, address: updatedAddress });
    };

    const handleLogout = () => {
        localStorage.removeItem("customerId");
        localStorage.removeItem("customerEmail"); // Clear stored user ID
        navigate("/login"); // Redirect to login page
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/customers/${customerId}`, customer);
            alert("Profile updated successfully!");
            setIsEditing(true); // Lock the fields after saving
        } catch (err) {
            alert("Failed to update profile");
        }
    };

    if (loading) return <p style={{ textAlign: "center", fontSize: "18px" }}>Loading...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    return (
        <div style={styles.container}>
            <div style={styles.profileCard}>
                <div style={styles.leftSection}>
                    <FaUser style={styles.icon} />
                </div>

                <div style={styles.rightSection}>
                    <h2 style={styles.title}>Customer Profile</h2>

                    <form onSubmit={updateProfile} style={styles.form}>
                        <div style={styles.row}>
                            <label style={styles.label}>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={customer.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.row}>
                            <label style={styles.label}>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={customer.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.row}>
                            <label style={styles.label}>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={customer.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={styles.input}
                            />
                        </div>

                        <h3 style={styles.subTitle}>Addresses</h3>
                        {customer.address.map((addr, index) => (
                            <div key={index} style={styles.addressSection}>
                                <div style={styles.row}>
                                    <label style={styles.label}>Location:</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={addr.location}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        disabled={!isEditing}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.row}>
                                    <label style={styles.label}>Pincode:</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={addr.pincode}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        disabled={!isEditing}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.row}>
                                    <label style={styles.label}>Landmark:</label>
                                    <input
                                        type="text"
                                        name="landmark"
                                        value={addr.landmark}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        disabled={!isEditing}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.row}>
                                    <label style={styles.label}>District:</label>
                                    <select
                                        name="district"
                                        value={addr.district}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        disabled={!isEditing}
                                        style={styles.input}
                                    >
                                        <option value="">Select a District</option>
                                        {districtsOfKerala.map((district) => (
                                            <option key={district} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ))}

                        {!isEditing ? (
                            <button type="button" style={styles.enableEditButton} onClick={() => setIsEditing(true)}>
                                Enable Edit
                            </button>
                        ) : (
                            <button type="submit" style={styles.updateButton}>
                                Update
                            </button>
                        )}
                        <button type="button" style={styles.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f4f4",
    },
    profileCard: {
        display: "flex",
        background: "#fff",
        padding: "25px",
        borderRadius: "8px",
        width: "600px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    logoutButton: {
        background: "#dc3545",
        color: "#fff",
        padding: "10px",
        borderRadius: "6px",
        cursor: "pointer",
        marginTop: "10px",
        border: "none",
        width: "100%",
    },
    enableEditButton: {
        background: "#ffc107",
        color: "#000",
        padding: "10px",
        borderRadius: "6px",
        cursor: "pointer",
        marginTop: "10px",
        border: "none",
    },
    updateButton: {
        background: "#28a745",
        color: "#fff",
        padding: "10px",
        borderRadius: "6px",
        cursor: "pointer",
        marginTop: "10px",
        border: "none",
    },
};

export default Profile;
