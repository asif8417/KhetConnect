const express = require("express");
const router = express.Router();

const Crop = require("../models/Crop");
const authMiddleware = require("../middleware/authMiddleware");


// Delete Crop API
// Delete Crop API
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        // Check farmer role
        if (req.user.role !== "farmer") {
            return res.status(403).json({
                message: "Only farmers can delete crops"
            });
        }

        // Find crop and verify ownership
        const crop = await Crop.findOne({
            _id: req.params.id,
            farmer: req.user._id
        });

        // Check crop exists
        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"
            });
        }

        // Delete crop
        await Crop.findByIdAndDelete(crop._id);

        // Success response
        return res.status(200).json({
            message: "Crop deleted successfully"
        });

    } catch (error) {
        console.error("Delete Crop Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;