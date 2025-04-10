import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewAddress() {
    const [addresses, setAddresses] = useState([]);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = () => {
        axios.get("http://localhost:5000/api/address/all")
            .then((res) => setAddresses(res.data))
            .catch((err) => console.error("Error fetching addresses:", err));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            axios.delete(`http://localhost:5000/api/address/delete/${id}`)
                .then(() => {
                    alert("Address deleted successfully!");
                    fetchAddresses();
                })
                .catch((err) => console.error("Error deleting address:", err));
        }
    };

    const handleEdit = (address) => {
        setEditingAddressId(address._id);
        setEditFormData({ ...address });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/address/update/${id}`, editFormData);
            alert("Address updated successfully!");
            fetchAddresses();
            setEditingAddressId(null);
        } catch (error) {
            console.error("Error updating address:", error);
            alert("Failed to update address!");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">All Addresses 📍</h2>
            <table className="table table-bordered mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Location</th>
                        <th>Landmark</th>
                        <th>Pin Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <tr key={address._id}>
                                {editingAddressId === address._id ? (
                                    <>
                                        <td><input type="text" name="name" value={editFormData.name} onChange={handleEditChange} /></td>
                                        <td><input type="text" name="contact" value={editFormData.contact} onChange={handleEditChange} /></td>
                                        <td><input type="text" name="location" value={editFormData.location} onChange={handleEditChange} /></td>
                                        <td><input type="text" name="landmark" value={editFormData.landmark} onChange={handleEditChange} /></td>
                                        <td><input type="text" name="pinCode" value={editFormData.pinCode} onChange={handleEditChange} /></td>
                                        <td>
                                            <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(address._id)}>Save</button>
                                            <button className="btn btn-secondary btn-sm" onClick={() => setEditingAddressId(null)}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{address.name}</td>
                                        <td>{address.contact}</td>
                                        <td>{address.location}</td>
                                        <td>{address.landmark}</td>
                                        <td>{address.pinCode}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(address)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(address._id)}>Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No addresses found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="btn btn-secondary w-100 mt-3" onClick={() => navigate("/admin")}>Go Back</button>
        </div>
    );
}

export default ViewAddress;