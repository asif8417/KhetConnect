const express=require("express");
const router=express.Router();
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt =require("jsonwebtoken");

//Login API...

router.post("/login", async(req,res)=>{
    try{
        const{email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Please enter email and password",
            })
        }
        //find user..

        const user=await User.findOne({
            email:email.trim().toLowerCase()
        });
        if(!user){
            return res.status(401).json({
                message:"inavalid email and password",
            })
        }

        //compared password..

        const isPasswordValid=await bcrypt.compare(
            password,
            user.password
        )
          if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        //Generate JWT token..

        const token=jwt.sign(
            {
                userId:user._id,
                role:user.role

            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        return res.status(200).json({
            message:"login Successfull",
            token,
            user:{
                   id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    }catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
})
module.exports = router;