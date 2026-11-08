const express=require("express");
const router=express.Router();

const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


//Register API...

router.post("/register",async(req,res)=>{
try{
    const{name,email,password,phone,role,address}=req.body;

    //check required field...
if(!name || !email|| !password || !phone || !role || !address ){
    return res.status(400).json({
        message:"Pleased filled required field",
    })
}
    // chaech if email already exist..

    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(409).json({
            message:"Email already registered",
        });
    }
    // Hash Password..

    const hashedPassword = await bcrypt.hash(password, 10);

    //Create a new user..

    const newUser=new User({
        name,
        email,
        password:hashedPassword,
        phone,
        role,
        address,
    });

    // save data in mongodb..

    await newUser.save();
    return res.status(201).json({
        user:{
            id:newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        }
    });
}catch(error){
    console.log("Registeration Error");
       return res.status(500).json({
      message: "Internal server error",
    });
}
})

module.exports = router;

