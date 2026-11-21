const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"]

        },
        role: {
            type: String,
            enum: ["farmer", "buyer", "fpo"],
            required: true,
        },

        address: {
            type: String,
            trim: true,
            required: true
        },
        latitude: {
            type: Number,
            default: null
        },

        longitude: {
            type: Number,
            default: null
        },

    },
    {
        timestamps: true,
    }
);
const User = mongoose.model("User", userSchema);

module.exports = User;