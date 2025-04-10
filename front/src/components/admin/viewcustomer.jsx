import React, { useEffect, useState } from "react";
import axios from "axios";

function Viewcustomer() {
    const [customers, setCustomers] = useState([]);
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: "", email: "", phone: "" });
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/customers/get");
            setCustomers(res.data);
        } catch (err) {
            console.error("Error fetching customers:", err);
        }
    };

    const handleEdit = (customer) => {
        setEditingCustomerId(customer._id);
        setEditFormData({
            name: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || ""
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/customers/${id}`, editFormData);
            fetchCustomers();
            setEditingCustomerId(null);
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await axios.delete(`http://localhost:5000/api/customers/${id}`);
                fetchCustomers();
            } catch (error) {
                console.error("Error deleting customer:", error);
            }
        }
    };

    const toggleAddressView = (id) => {
        setSelectedCustomerId(selectedCustomerId === id ? null : id);
    };

    return (
        <div
            className="container mt-4"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, rgb(5, 12, 82), #1e1e1e, rgb(11, 4, 64))",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div className="bg-dark text-white p-4 rounded w-75">
                <h2 className="text-center">All Customers 🙍</h2>
                <table className="table table-bordered mt-3 bg-white text-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Addresses</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <React.Fragment key={customer._id}>
                                    <tr>
                                        {editingCustomerId === customer._id ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={editFormData.name}
                                                        onChange={handleEditChange}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={editFormData.email}
                                                        onChange={handleEditChange}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={editFormData.phone}
                                                        onChange={handleEditChange}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td> - </td>
                                                <td>
                                                    <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(customer._id)}>
                                                        Save
                                                    </button>
                                                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingCustomerId(null)}>
                                                        Cancel
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{customer.name}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.phone || "N/A"}</td>
                                                <td>
                                                    {customer.address?.length > 0 ? (
                                                        <button className="btn btn-info btn-sm" onClick={() => toggleAddressView(customer._id)}>
                                                            {selectedCustomerId === customer._id ? "Hide Addresses" : "View Addresses"}
                                                        </button>
                                                    ) : (
                                                        <span>No Address</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(customer)}>
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(customer._id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                    {selectedCustomerId === customer._id && customer.address?.length > 0 && (
                                        <tr>
                                            <td colSpan="5">
                                                <div className="card p-3">
                                                    <h5>Addresses:</h5>
                                                    <ul>
                                                        {customer.address.map((addr, index) => (
                                                            <li key={index} style={{ marginBottom: "5px" }}>
                                                                <strong>Location:</strong> {addr.location || "N/A"},  
                                                                <strong> Landmark:</strong> {addr.landmark || "N/A"},  
                                                                <strong> Pincode:</strong> {addr.pincode || "N/A"},  
                                                                <strong> District:</strong> {addr.district || "N/A"}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No Customers found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Viewcustomer;
