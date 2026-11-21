const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const geocodeAddress = require("../utils/geocode");


router.put("/profile", authMiddleware, async (req, res) => {
    try {
        const { name, phone, address,latitude, longitude } = req.body;
        if (!name && !phone && !address && !latitude && !longitude ) {
            return res.status(400).json({
                message: "Please provide profile details to update"
            });
        }
        const updates = {};
        if (name !== undefined) {
            if (typeof name !== "string" || name.trim().length < 3 || name.trim().length > 50) {
                return res.status(400).json({
                    message: "Name must be between 3 and 50 Character"
                })
            }
            updates.name = name.trim();
        }
        if (phone !== undefined) {
            if (typeof phone !== "string" || !/^[0-9]{10}$/.test(phone)) {
                return res.status(400).json({
                    message: "Please enter a valid 10-digit phone number"
                });
            }
            updates.phone = phone;
        }
        if (address !== undefined) {
            if (typeof address !== "string" || !address.trim()) {
                return res.status(400).json({
                    message: "Address cannot be empty"
                });
            }
            updates.address = address.trim();
        }

    if (req.user.role === "farmer") {
        const coordinates = await geocodeAddress(address.trim());

        if (coordinates) {
            updates.latitude = coordinates.latitude;
            updates.longitude = coordinates.longitude;
        }
    }
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Profile Update Error:", error);

        return res.status(500).json({
            message: "Unable to update profile"
        });
    }
});
module.exports = router;
