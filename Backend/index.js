import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user-router.js"
import adminRouter from "./routes/admin-router.js"
import categoryRouter from "./routes/category-router.js"
import addressRouter from "./routes/address-router.js"
import orderRouter from "./routes/order-router.js"
import productRouter from "./routes/product-router.js"
import cors from "cors";
import  bodyParser from 'body-parser';
const app=express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('uploads'));
app.get("/",(req,res)=>{res.send("you are in the home page")})
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter);
app.use("/api/address",addressRouter);
app.use("/api/order",orderRouter);
app.use("/api/category",categoryRouter);
app.use("/api/product", productRouter);

mongoose.connect("mongodb://localhost:27017/secondspin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((res)=>console.log("successfuly conect with mongodb"))
  .catch((err)=>console.log(`db connection failed ${err}`))
app.listen(5001,()=>console.log("port was listening in port 5001"));
