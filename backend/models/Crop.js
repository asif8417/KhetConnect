const mongoose=require("mongoose");

const cropSchema=new mongoose.Schema({
     farmer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cropName: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },
            quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        unit: {
            type: String,
            enum: ["kg", "quintal", "ton"],
            required: true,
        },
  expectedPrice: {
            type: Number,
            required: true,
            min: 1,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },
           description: {
            type: String,
            trim: true,
            maxlength: 500,
        },

        image: {
            type: String,
            default: "",
        },
            availability: {
            type: String,
            enum: ["available", "unavailable"],
            default: "available",
        },


},
 {
        timestamps: true,
    }
);
const Crop = mongoose.model("Crop", cropSchema);
module.exports = Crop;