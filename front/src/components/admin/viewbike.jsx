import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewBike = () => {
    const [bikes, setBikes] = useState([]);
    const [editingBikeId, setEditingBikeId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchBikes();
    }, []);

    const fetchBikes = () => {
        axios.get("http://localhost:5000/api/bikes/all")
            .then(response => setBikes(response.data))
            .catch(error => console.error("Error fetching bikes:", error));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleEdit = (bike) => {
        setEditingBikeId(bike._id);
        setEditFormData({ ...bike });
    };

    const handleSave = async (id) => {
        try {
            const formData = new FormData();
            Object.keys(editFormData).forEach((key) => {
                formData.append(key, editFormData[key]);
            });
            if (selectedImage) {
                formData.append("bikeImage", selectedImage);
            }

            await axios.put(`http://localhost:5000/api/bikes/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Bike updated successfully!");
            fetchBikes();
            setEditingBikeId(null);
        } catch (error) {
            console.error("Error updating bike:", error);
            alert("Failed to update bike!");
        }
    };

    const handleDelete = async (id) => {
        try {
            if(window.confirm("Do you want to delete?")){
            await axios.delete(`http://localhost:5000/api/bikes/delete/${id}`);
            alert("Bike deleted successfully!");
            fetchBikes();}
            else{
                window.close();
            }
        } catch (error) {
            console.error("Error deleting bike:", error);
            alert("Failed to delete bike!");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">All Bikes 🏍️💨</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Bike Name</th>
                        <th>Model</th>
                        <th>Engine</th>
                        <th>Power</th>
                        <th>Mileage</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bikes.map((bike) => (
                        <tr key={bike._id}>
                            {editingBikeId === bike._id ? (
                                <>
                                    <td><input type="text" name="name" value={editFormData.name} onChange={handleEditChange} className="form-control" /></td>
                                    <td><input type="text" name="model" value={editFormData.model} onChange={handleEditChange} className="form-control" /></td>
                                    <td><input type="text" name="engine" value={editFormData.engine} onChange={handleEditChange} className="form-control" /></td>
                                    <td><input type="text" name="power" value={editFormData.power} onChange={handleEditChange} className="form-control" /></td>
                                    <td><input type="text" name="mileage" value={editFormData.mileage} onChange={handleEditChange} className="form-control" /></td>
                                    <td><input type="text" name="price" value={editFormData.price} onChange={handleEditChange} className="form-control" /></td>
                                    <td><input type="text" name="Stock" value={editFormData.Stock} onChange={handleEditChange} className="form-control" /></td>
                                    <td>
                                        <img src={bike.bikeImage} alt={bike.name} width="80" height="80" />
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mt-2" />
                                    </td>
                                    <td>
                                        <button onClick={() => handleSave(bike._id)} className="btn btn-success me-2">Save</button>
                                        <button onClick={() => setEditingBikeId(null)} className="btn btn-secondary">Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{bike.name}</td>
                                    <td>{bike.model}</td>
                                    <td>{bike.engine}</td>
                                    <td>{bike.power}</td>
                                    <td>{bike.mileage}</td>
                                    <td>{bike.price}</td>
                                    <td>{bike.Stock}</td>
                                    <td>
                                        <img src={bike.bikeImage} alt={bike.name} width="80" height="80" />
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(bike)} className="btn btn-warning me-2">Edit</button>
                                        <button onClick={() => handleDelete(bike._id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewBike;
