const express = require("express");
const router = express.Router();

const Crop = require("../models/Crop");
const authMiddleware = require("../middleware/authMiddleware");

//update crop API...

router.put("/:id",authMiddleware,async(req,res)=>{
    try{
// check farmer role..

if(req.user.role!=="farmer"){               //req.user.role comes from our authentication middleware.
    return res.status(403).json({
        message:"Only farmer can Update this crop"
    })
}

// find crop and verify ownership
const crop=await Crop.findOne({
    _id:req.params.id,          //_id: Is this the crop the user wants to update?
    farmer:req.user._id
});

// check crop exist or not...

if(!crop){
    return res.status(404).json({
        message:"Crop Not Found"
    });

}
//Update crop details...
  const {
            cropName,
            category,
            quantity,
            unit,
            expectedPrice,
            location,
            description,
            availability,
            image
        } = req.body;

        // Validate required text fields
if(!cropName?.trim() || !category?.trim() || !location?.trim()){
      return res.status(400).json({
        message: "Crop name, category and location are required"
    })
}

if (!["kg", "quintal", "ton"].includes(unit)) {
    return res.status(400).json({
        message: "Invalid quantity unit"
    });
}
if (!["available", "unavailable"].includes(availability)) {
    return res.status(400).json({
        message: "Invalid availability status"
    });
}
if (
    description !== undefined &&
    (typeof description !== "string" || description.length > 500)
) {
    return res.status(400).json({
        message: "Description must be text and cannot exceed 500 characters"
    });
}

if (
    !Number.isFinite(Number(quantity)) ||
    Number(quantity) <= 0 ||
    !Number.isFinite(Number(expectedPrice)) ||
    Number(expectedPrice) <= 0
) {
    return res.status(400).json({
        message: "Quantity and expected price must be greater than 0"
    });
}
         crop.cropName = cropName;
        crop.category = category;
        crop.quantity = quantity;
        crop.unit = unit;
        crop.expectedPrice = expectedPrice;
        crop.location = location;
        crop.image = image
        crop.description = description;
        crop.availability = availability;

                await crop.save();

        return res.status(200).json({
            message: "Crop updated successfully",
            crop
        });

    }catch(error){
         console.error("Update Crop Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }
});
module.exports = router;