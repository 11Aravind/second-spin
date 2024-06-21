import express from "express"
const userrouter=express.Router()
import {registerUser,loginUser} from "../middlewares/user-middleware.js"
userrouter.post("/signup",registerUser);
userrouter.post("/login",loginUser);
export default userrouter;