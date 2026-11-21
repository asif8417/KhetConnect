const express=require("express");
const dotenv=require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const userRoutes=require("./routes/userRoutes");
const cropRoutes = require("./routes/cropRoutes");
const updateCropRoutes = require("./routes/updateCropRoutes");
const deleteCropRoutes = require("./routes/deleteCropRoutes");
const updateProfileRoutes = require("./routes/updateProfileRoutes");
const marketplaceRoutes = require("./routes/marketplaceRoutes");


dotenv.config();

const app=express();

app.use(cors()); //CORS middleware helps the backend allow permitted frontend requests.
app.use(express.json()) //This tells Express to read incoming JSON request bodies.
app.use("/api/auth", registerRoutes);
app.use("/api/auth",loginRoutes);
app.use("/api/users",userRoutes);
app.use("/api/users", updateProfileRoutes);
app.use("/api/crops",cropRoutes);
app.use("/api/crops", deleteCropRoutes);
app.use("/api/crops", updateCropRoutes);
app.use("/api/marketplace", marketplaceRoutes);

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
