const express=require("express");
const dotenv=require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const userRoutes=require("./routes/userRoutes");

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json())
app.use("/api/auth", registerRoutes);
app.use("/api/auth",loginRoutes);
app.use("/api/users",userRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to the KhetConnect ")
})

const PORT=process.env.PORT||5000;

const startServer=async()=>{
    await connectDB();
}

app.listen(PORT,()=>{
    console.log(`server listeninh on port ${PORT} `)
});
startServer();
