import React from "react";
import { useState, useEffect } from "react";
import API from "../services/api";
import "./FarmerProfile.css";
import { useNavigate } from "react-router-dom";



const BuyerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    const navigate=useNavigate();
    

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await API.get("/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(response.data.user);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Unable to fetch profile"
                );

            }
        };
        fetchProfile();
    }, []);


    if (error) return <p>{error}</p>;
    if (!profile) return <p>Loading profile...</p>;
    return (
        <div className="farmer-profile-container">

            <div className="profile-header">
                <div className="profile-avatar">
                    🛒
                </div>

                <div>
                    <h2>{profile.name}</h2>
                    <span className="profile-role">
                        {profile.role}
                    </span>
                </div>
            </div>

            <div className="profile-details">

                <div className="profile-detail-item">
                    <label>Full Name</label>
                    <p>{profile.name}</p>
                </div>

                <div className="profile-detail-item">
                    <label>Email Address</label>
                    <p>{profile.email}</p>
                </div>

                <div className="profile-detail-item">
                    <label>Phone Number</label>
                    <p>{profile.phone}</p>
                </div>

                <div className="profile-detail-item">
                    <label>Address</label>
                    <p>{profile.address}</p>
                </div>

                <div className="profile-detail-item">
                    <label>Account Type</label>
                    <p>{profile.role}</p>
                </div>

            </div>
            
        <button className="edit-profile-btn"
        onClick={()=>navigate("/buyer-edit-profile")}
        >
            Edit Profile
        </button>

        </div>
    );

}
export default BuyerProfile;