import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user-router.js"
import categoryRouter from "./routes/category-router.js"
import addressRouter from "./routes/address-router.js"
import cors from "cors";
const app=express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{res.send("you are in the home page")})
app.use("/api/user",userRouter);
app.use("/api/address",addressRouter);
app.use("/category",categoryRouter);

mongoose.connect("mongodb://localhost:27017/secondspin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((res)=>console.log("successfuly conect with mongodb"))
  .catch((err)=>console.log(`db connection failed ${err}`))
app.listen(5001,()=>console.log("port was listening in port 5001"));
