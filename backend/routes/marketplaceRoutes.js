const express = require("express");
const router = express.Router();
const Crop = require("../models/Crop");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const geocodeAddress = require("../utils/geocode");
const calculateDistance = require("../utils/calculateDistance");

router.get("/crops", async (req, res) => {
    try {
        const { location, distance } = req.query;
        if (
            distance !== undefined &&
            distance !== "any" &&
            ![10, 20, 30, 50, 100].includes(Number(distance))
        ) {
            return res.status(400).json({
                message: "Invalid distance selected"
            });
        }

        if (
            distance !== undefined &&
            distance !== "any" &&
            (!location || !location.trim())
        ) {
            return res.status(400).json({
                message: "Please enter a location to search nearby crops"
            });
        }
        let buyerCoordinates = null;

        if (location && distance !== "any") {
            buyerCoordinates = await geocodeAddress(location.trim());

            if (!buyerCoordinates) {
                return res.status(400).json({
                    message: "Unable to find this location. Please enter a valid city or locality."
                });
            }
        }
        const crops = await Crop.find({
            availability: "available",

        })
            .populate("farmer", "name address latitude longitude") //populate(): Retrieves farmer information using the farmer reference.
            .sort({ createdAt: -1 });  //Displays newest crops fir

            let filteredCrops = crops;

if (buyerCoordinates && distance !== "any") {
    filteredCrops = crops.filter((crop) => {
        const farmer = crop.farmer;

        if (!farmer || farmer.latitude == null || farmer.longitude == null) {
            return false;
        }

        const calculatedDistance = calculateDistance(
            buyerCoordinates.latitude,
            buyerCoordinates.longitude,
            farmer.latitude,
            farmer.longitude
        );

        return calculatedDistance <= Number(distance);
    });
}

        return res.status(200).json({
            message: "Marketplace crops fetch successfully",
            totalCrops: filteredCrops.length, // Counts the fetched crops.
            crops:filteredCrops
        });
    } catch (error) {
        console.error("Fetch Marketplace Crops Error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})


// Get Single Crop Details API
router.get("/crops/:id", async (req, res) => {
    try {
        const crop = await Crop.findOne({
            _id: req.params.id,
            availability: "available"
        }).populate("farmer", "name address");

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"
            });
        }

        return res.status(200).json({
            message: "Crop details fetched successfully",
            crop
        });

    } catch (error) {
        console.error("Fetch Crop Details Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Contact Farmer API
router.get("/crops/:id/contact", authMiddleware, async (req, res) => {
    try {
        // Only buyers can access farmer contact details
        if (req.user.role !== "buyer") {
            return res.status(403).json({
                message: "Only buyers can contact farmers"
            });
        }

        // Find the selected crop
        const crop = await Crop.findOne({
            _id: req.params.id,
            availability: "available"
        });

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"
            });
        }

        // Fetch farmer's contact details
        const farmer = await User.findById(crop.farmer)
            .select("name email phone address");

        if (!farmer) {
            return res.status(404).json({
                message: "Farmer not found"
            });
        }

        return res.status(200).json({
            message: "Farmer contact details fetched successfully",
            farmer
        });

    } catch (error) {
        console.error("Contact Farmer Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
module.exports = router;