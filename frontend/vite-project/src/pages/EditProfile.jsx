import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
const EditProfile = () => {


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
        console.log("Update button clicked");
    console.log("Form Data:", formData);

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
            navigate("/farmer-profile");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to update profile"
            );
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Farmer Profile</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"

                        onChange={handleChange}
                        value={formData.name}
                    />
                </div>

                <div>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        value={formData.phone}
                    />
                </div>

                <div>
                    <label>Address</label>
                    <textarea
                        value={formData.address}
                        onChange={handleChange}
                        name="address"
                    />
                </div>

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;