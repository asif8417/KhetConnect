const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");

//Get logged-in user profile...

router.get("/profile",authMiddleware,(req,res)=>{
    return res.status(200).json({
        message:"User profile fetch successfully",
        user:req.user
    })
})

module.exports=router;