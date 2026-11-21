const express = require("express");
const router = express.Router();

const Crop = require("../models/Crop");
const authMiddleware = require("../middleware/authMiddleware");
//Add new Crop api..

router.post("/add", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "farmer") {
            return res.status(403).json({
                message: "Only farmer can add",
            });
        }

        const {
            cropName,
            category,
            quantity,
            unit,
            expectedPrice,
            location,
            description,
            image,
        } = req.body;

        // checked required field....
        if (!cropName || !category || !quantity || !unit || !expectedPrice || !location) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        if (Number(quantity) <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than zero"
            });
        }
        if (Number(expectedPrice) <= 0) {
            return res.status(400).json({
                message: "Expected price must be greater than zero"
            });
        }
        // create crops
        const newCrop = new Crop({
            farmer: req.user._id,
            cropName,
            category,
            quantity,
            unit,
            expectedPrice,
            location,
            description,
            image,
        });
        await newCrop.save();
        return res.status(201).json({
            message: "Crop added successfully",
            crop: newCrop,
        });



    } catch (error) {
        console.error("Add Crop Error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
})

router.get("/my-crops",authMiddleware, async(req,res)=>{
    try{
        if(req.user.role!=="farmer"){
            return res.status(403).json({
                message:"Only farmer can access their crops",
            })
        }
        const crops=await Crop.find({
            farmer:req.user._id
        }).sort({ createdAt: -1 })
         return res.status(200).json({
            message: "Farmer crops fetched successfully",
            totalCrops: crops.length,
            crops
        });
    }catch(error){
          console.error("Fetch My Crops Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }
});

// Get Single Crop API
router.get("/:id", authMiddleware, async (req, res) => {
    try {

        // Check farmer role
        if (req.user.role !== "farmer") {
            return res.status(403).json({
                message: "Only farmers can access crop details"
            });
        }

        // Find crop by ID and verify ownership
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

        return res.status(200).json({
            message: "Crop fetched successfully",
            crop
        });

    } catch (error) {
        console.error("Fetch Single Crop Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
module.exports = router;
