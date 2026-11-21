import React from "react";
import { useState } from "react";
import './AddCrop.css';


const AddCrop = () => {

    const [formData, setFormData] = useState({
        cropName: "",
        category: "",
        quantity: "",
        unit: "",
        expectedPrice: "",
        location: "",
        description: "",
        image: ""
    });
    const [successMessage, setSuccessMessage] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Crop Name and Category validation
        if (name === "cropName" || name === "category") {
            if (!/^[a-zA-Z\s]*$/.test(value)) {
                return;
            }
        }
        if (name === "quantity") {
            if (Number(value) < 0) {
                return;
            }
        }
        if (name === "expectedPrice") {
            if (Number(value) < 0) {
                return;
            }
        }
        if (name === "location") {
            if (!/^[a-zA-Z0-9\s,-]*$/.test(value)) {
                return;
            }
        }
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^[a-zA-Z\s]+$/.test(formData.cropName.trim())) {
            alert("Crop name should contain only letters");
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(formData.category.trim())) {
            alert("Category should contain only letters");
            return;
        }
        if (!formData.quantity || Number(formData.quantity) <= 0) {
            alert("Quantity must be greater than zero");
            return;
        }

        if (!formData.unit) {
            alert("Please select a unit");
            return;
        }

        if (!formData.expectedPrice || Number(formData.expectedPrice) <= 0) {
            alert("Expected price must be greater than zero");
            return;
        }
        if (!formData.location.trim()) {
            alert("Please enter location");
            return;
        }

        if (formData.description.length > 500) {
            alert("Description cannot exceed 500 characters");
            return;
        }
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/crops/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...formData,
                        quantity: Number(formData.quantity),
                        expectedPrice: Number(formData.expectedPrice)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to add crop");
                return;
            }

            setSuccessMessage("Crop added successfully!");
            setFormData({
                cropName: "",
                category: "",
                quantity: "",
                unit: "",
                expectedPrice: "",
                location: "",
                description: "",
                image: ""
            });
            console.log(data);

        } catch (error) {
            console.error("Add Crop Error:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    return (

        <div className="add-crop-container">
            <div className="add-crop-header">
                {successMessage && (
                    <p className="success-message">
                        {successMessage}
                    </p>
                )}
                <h1>Add New Crop 🌾</h1>
                <p>Enter your crop details to sell directly to buyers.</p>
            </div>
            <form className="add-crop-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">Crop Name</label>
                    <input
                        type="text"
                        name="cropName"
                        value={formData.cropName}
                        onChange={handleChange}
                        placeholder="e.g. Wheat, Rice, Potato"
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Grains">Grains</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Pulses">Pulses</option>
                        <option value="Oilseeds">Oilseeds</option>
                        <option value="Spices">Spices</option>
                        <option value="Seeds">Seeds</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Enter quantity"
                            min="1"
                            step="any"
                        />
                    </div>
                    <div className="form-group">
                        <label>Unit</label>
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                        >
                            <option value="">Select Unit</option>
                            <option value="kg">Kilogram (kg)</option>
                            <option value="quintal">Quintal</option>
                            <option value="ton">Ton</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>Expected Price (₹)</label>
                    <input
                        type="number"
                        name="expectedPrice"
                        value={formData.expectedPrice}
                        onChange={handleChange}
                        placeholder="Enter expected price"
                        min="1"
                        step="any"

                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter your crop location"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        placeholder="Describe your crop..."
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label>Crop Image URL (Optional)</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </div>
                <button type="submit" className="add-crop-btn">
                    Add Crop
                </button>
            </form>
        </div>
    )
}
export default AddCrop;