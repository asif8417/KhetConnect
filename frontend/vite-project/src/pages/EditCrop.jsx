import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './EditCrop.css';

/* useState: Stores crop details in React.
useEffect: Fetches existing crop details when the page loads.
useParams: Gets the crop ID from the URL.
useNavigate: Redirects the farmer after updating.
axios: Sends API requests to our backend.  */

const EditCrop = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [crop, setCrop] = useState({
        cropName: "",
        category: "",
        quantity: "",
        unit: "kg",
        expectedPrice: "",
        location: "",
        description: "",
        availability: "available",
        image: ""
    });
    useEffect(() => {
        const fetchCrop = async () => {  //Fetches existing crop details from MongoDB when the page opens.
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:5000/api/crops/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCrop(response.data.crop);
            } catch (error) {
                console.error("Fetch Crop Error:", error);
                alert(
                    error.response?.data?.message || "Failed to fetch crop"
                );
            }
        };

        fetchCrop();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:5000/api/crops/${id}`,
                crop,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(response.data.message);
            navigate("/farmer-dashboard");
        } catch (error) {
            console.error("Update Crop Error:", error);

            alert(
                error.response?.data?.message || "Failed to update crop"
            );
        }
    };
    return (
        <div className="edit-crop-container">
            <h2>Edit Crop Details</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Crop Name</label>

                    <input
                        type="text"
                        value={crop.cropName}           //Displays the crop name fetched from MongoDB.
                        onChange={(e) =>
                            setCrop({ ...crop, cropName: e.target.value }) //Runs whenever the farmer types something. and Gets the new value entered by the farmer.
                        }
                        placeholder="Enter crop name"
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>

                    <input
                        type="text"
                        value={crop.category}
                        onChange={(e) =>
                            setCrop({ ...crop, category: e.target.value })
                        }
                        placeholder="Enter crop category"
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>

                    <input
                        type="number"
                        value={crop.quantity}
                        onChange={(e) =>
                            setCrop({ ...crop, quantity: e.target.value })
                        }
                        placeholder="Enter quantity"
                    />
                </div>
                <div className="form-group">
                    <label>Unit</label>

                    <select
                        value={crop.unit}
                        onChange={(e) =>
                            setCrop({ ...crop, unit: e.target.value })
                        }
                    >
                        <option value="kg">Kilogram (kg)</option>
                        <option value="quintal">Quintal</option>
                        <option value="ton">Ton</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Expected Price (₹)</label>

                    <input
                        type="number"
                        value={crop.expectedPrice}
                        onChange={(e) =>
                            setCrop({ ...crop, expectedPrice: e.target.value })
                        }
                        placeholder="Enter expected price"
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>

                    <input
                        type="text"
                        value={crop.location}
                        onChange={(e) =>
                            setCrop({ ...crop, location: e.target.value })
                        }
                        placeholder="Enter your location"
                    />
                </div>
                <div className="form-group">
                    <label>Crop Image URL</label>
                    <input
                        type="text"
                        value={crop.image}
                        onChange={(e) =>
                            setCrop({ ...crop, image: e.target.value })
                        }
                        placeholder="Enter crop image URL"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        value={crop.description}
                        onChange={(e) =>
                            setCrop({ ...crop, description: e.target.value })
                        }
                        placeholder="Enter crop description"
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label>Availability</label>

                    <select
                        value={crop.availability}
                        onChange={(e) =>
                            setCrop({ ...crop, availability: e.target.value })
                        }
                    >
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                </div>
                <button type="submit" className="update-crop-btn">
                    Update Crop
                </button>
            </form>
        </div>
    );
};
export default EditCrop;