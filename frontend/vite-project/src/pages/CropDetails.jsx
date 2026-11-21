import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./CropDetails.css";

const CropDetails = () => {

    const { id } = useParams();

    const [crop, setCrop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [farmerContact, setFarmerContact] = useState(null);
    const [contactLoading, setContactLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const fetchCropDetails = async () => {
            try {
                const response = await API.get(`/marketplace/crops/${id}`);

                setCrop(response.data.crop);

            } catch (error) {
                setError("Failed to fetch crop details");
            } finally {
                setLoading(false);
            }
        };

        fetchCropDetails();

    }, [id]);
    const handleContactFarmer = async () => {
        try {
            setContactLoading(true);

            const token = localStorage.getItem("token");

            const response = await API.get(
                `/marketplace/crops/${id}/contact`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setFarmerContact(response.data.farmer);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to fetch farmer contact details"
            );
        } finally {
            setContactLoading(false);
        }
    };

    return (
        <div className="crop-details-container">

            <h1>Crop Details</h1>

            {loading && <p>Loading crop details...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && crop && (
                <div className="crop-details-card">

                    <div className="crop-details-layout">

                        {/* Left Side - Crop Image */}
                        <div className="crop-image-section">

                            {crop.image ? (
                                <img
                                    src={crop.image}
                                    alt={crop.cropName}
                                />
                            ) : (
                                <div className="no-crop-image">
                                    🌾
                                    <p>Crop Image Not Available</p>
                                </div>
                            )}

                        </div>

                        {/* Right Side - Crop Information */}
                        <div className="crop-info-section">

                            <span className="crop-category">
                                {crop.category}
                            </span>

                            <h2>{crop.cropName}</h2>

                            <h3 className="crop-price">
                                ₹{crop.expectedPrice}
                                <span> / {crop.unit}</span>
                            </h3>

                            <div className="crop-info-list">

                                <p>
                                    <strong>Quantity:</strong>
                                    {crop.quantity} {crop.unit}
                                </p>

                                <p>
                                    <strong>Location:</strong>
                                    {crop.location}
                                </p>

                                <p>
                                    <strong>Availability:</strong>
                                    {crop.availability}
                                </p>

                            </div>

                            <div className="crop-description">
                                <h3>Description</h3>
                                <p>
                                    {crop.description || "No description available"}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Farmer Information */}
                    <div className="farmer-details-section">

                        <h3>Farmer Information</h3>
                        <p> <strong>Farmer Name:</strong>{crop.farmer?.name}</p>
                        <p><strong>Farmer Location:</strong>{crop.farmer?.address}
                        </p>
                        {user?.role === "buyer" && (
                        <button
                            className="contact-farmer-btn"
                            onClick={handleContactFarmer}
                            disabled={contactLoading}
                        >
                            {contactLoading ? "Loading..." : "Contact Farmer"}
                        </button>
                        )}
                        {farmerContact && (
                            <div className="farmer-contact-info">
                                <h4>Farmer Contact Details</h4>
                                <p> <strong>Name:</strong> {farmerContact.name}</p>
                                <p> <strong>Email:</strong> {farmerContact.email}</p>
                                <p> <strong>Phone:</strong> {farmerContact.phone}</p>
                                <p><strong>Address:</strong> {farmerContact.address}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );

};

export default CropDetails;