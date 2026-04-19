import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import User from "./models/User.js";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import communityRoutes from "./routes/communityRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import cookieParser from "cookie-parser";



dotenv.config();



const PORT=process.env.PORT||5000
const MONGO_URI=process.env.MONGO_URI

connectDb(MONGO_URI)

const app=express();

app.use(cors({
  origin:["http://localhost:5173",
        "https://my-full-stack-project.vercel.app"
  ],
  credentials:true
}));

app.use(cookieParser());
app.use(express.json())

// const PORT=5000


app.get("/", (req, res) => { 
  res.json({ message: "Job Portal API is running" }); 
}); 

app.use("/api/user",userRoutes)
app.use("/api/community",communityRoutes)
app.use("/api/event",eventRoutes);




app.listen(PORT,()=>{
   console.log("server is running on:", PORT);
   
})