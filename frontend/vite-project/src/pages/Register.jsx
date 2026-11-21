
import { useState } from "react";
import API from "../services/api";
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        address: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        let newValue = value;

        if (name === "name") {
            newValue = value.replace(/[^a-zA-Z\s]/g, "");
        }

        if (name === "phone") {
            newValue = value.replace(/\D/g, "").slice(0, 10);
        }

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.phone.length !== 10) {
            setError("Phone number must contain exactly 10 digits.");
            return;
        }

        if (formData.password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await API.post(
                "/auth/register",
                formData
            );

            console.log("Registration Response:", response.data);

            alert("Registration Successful!");
            setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
                role: "",
                address: ""
            });

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">

                <h1>Create New Account</h1>

                <form onSubmit={handleSubmit}>

                    {error && <p className="error-message">{error}</p>}

                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={8}
                        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}"
                        title="Use at least 8 characters, uppercase, lowercase, number and special character."
                        required
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter 10-digit phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        maxLength={10}
                        inputMode="numeric"
                        required
                    />

                    <label htmlFor="role">Select Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Choose your role</option>
                        <option value="farmer">Farmer</option>
                        <option value="buyer">Buyer</option>
                        <option value="fpo">FPO</option>
                    </select>

                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Register</button>

                </form>
            </div>
        </div>
    );
};

export default Register;
