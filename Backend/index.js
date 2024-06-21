import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user-router.js"
import cors from "cors";
const server=express()
server.use(express.urlencoded({ extended: false }));
server.use(express.json())
server.use(cors())
server.get("/",(req,res)=>{
    res.send("you are in the home page")
})
mongoose.connect("mongodb://localhost:27017/secondspin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((res)=>console.log("successfuly conect with mongodb"))
  .catch((err)=>console.log(`db connection failed ${err}`))
server.use("/api/user",userRouter);
server.listen(5001,()=>console.log("port was listening in port 5001"));
