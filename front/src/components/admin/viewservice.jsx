import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewServiceCenters() {
    const [serviceCenters, setServiceCenters] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchServiceCenters();
    }, []);

    const fetchServiceCenters = () => {
        axios.get("http://localhost:5000/api/service-centers")
            .then((res) => setServiceCenters(res.data))
            .catch((err) => console.error("Error fetching service centers:", err));
    };

    const handleEdit = (center) => {
        setEditingId(center._id);
        setEditData({ ...center });
    };

    const handleEditChange = (e, field) => {
        if (field === "latitude") {
            setEditData({
                ...editData,
                location: {
                    ...editData.location,
                    coordinates: [editData.location?.coordinates?.[0] || 0, parseFloat(e.target.value)],
                },
            });
        } else if (field === "longitude") {
            setEditData({
                ...editData,
                location: {
                    ...editData.location,
                    coordinates: [parseFloat(e.target.value), editData.location?.coordinates?.[1] || 0],
                },
            });
        } else {
            setEditData({ ...editData, [field]: e.target.value });
        }
    };

    const handleSave = () => {
        axios.put(`http://localhost:5000/api/service-centers/${editingId}`, editData)
            .then(() => {
                alert("Service center updated successfully!");
                setEditingId(null);
                fetchServiceCenters();
            })
            .catch((err) => console.error("Error updating service center:", err));
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this service center?")) {
            axios.delete(`http://localhost:5000/api/service-centers/delete/${id}`)
                .then(() => {
                    alert("Service center deleted successfully!");
                    fetchServiceCenters();
                })
                .catch((err) => console.error("Error deleting service center:", err));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">All Service Centers 🛠</h2>
            <table className="table table-bordered mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Closing Time</th>
                        <th>Services</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceCenters.length > 0 ? (
                        serviceCenters.map((center) => (
                            <tr key={center._id}>
                                {editingId === center._id ? (
                                    <>
                                        <td><input type="text" className="form-control" value={editData.name} onChange={(e) => handleEditChange(e, "name")} /></td>
                                        <td><input type="text" className="form-control" value={editData.address} onChange={(e) => handleEditChange(e, "address")} /></td>
                                        <td><input type="text" className="form-control" value={editData.contact} onChange={(e) => handleEditChange(e, "contact")} /></td>
                                        <td>
                                            <select className="form-control" value={editData.status} onChange={(e) => handleEditChange(e, "status")}> 
                                                <option value="Open">Open</option>
                                                <option value="Temporarily Closed">Temporarily Closed</option>
                                            </select>
                                        </td>
                                        <td><input type="text" className="form-control" value={editData.closingTime} onChange={(e) => handleEditChange(e, "closingTime")} /></td>
                                        <td><input type="text" className="form-control" value={editData.services} onChange={(e) => handleEditChange(e, "services")} /></td>
                                        <td><input type="number" className="form-control" value={editData.location?.coordinates?.[1] || 0} onChange={(e) => handleEditChange(e, "latitude")} /></td>
                                        <td><input type="number" className="form-control" value={editData.location?.coordinates?.[0] || 0} onChange={(e) => handleEditChange(e, "longitude")} /></td>
                                        <td>
                                            <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Save</button>
                                            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{center.name}</td>
                                        <td>{center.address}</td>
                                        <td>{center.contact}</td>
                                        <td>{center.status}</td>
                                        <td>{center.closingTime}</td>
                                        <td>{center.services?.join(", ") || "N/A"}</td>
                                        <td>{center.location?.coordinates?.[1] ?? "N/A"}</td>
                                        <td>{center.location?.coordinates?.[0] ?? "N/A"}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(center)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(center._id)}>Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">No service centers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="btn btn-secondary w-100 mt-3" onClick={() => navigate("/admin")}>Go Back</button>
        </div>
    );
}

export default ViewServiceCenters;
