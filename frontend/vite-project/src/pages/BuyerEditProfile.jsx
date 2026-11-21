
import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const BuyerEditProfile = () => {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await API.get("/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setFormData({
                    name: response.data.user.name,
                    phone: response.data.user.phone,
                    address: response.data.user.address
                });

            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await API.put(
                "/users/profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);
            navigate("/buyer-profile");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to update profile"
            );
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Buyer Profile</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default BuyerEditProfile;
