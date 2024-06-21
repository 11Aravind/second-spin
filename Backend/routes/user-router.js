import express from "express"
const userrouter=express.Router()
import {registerUser} from "./middleware/user-middleware.js"
userrouter.post("/signup",registerUser);