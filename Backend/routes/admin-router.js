import express from "express"
import Admin from "../modules/Admin.js"
import bcrypt from 'bcryptjs';
const adminRouter=express.Router()
adminRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await Admin.findOne({ email });
    }
    catch (error) { return console.log(error); }
    if (!existingUser)
        return res.status(200).json({ message: "Enter correct email or password", status: "failed", user_id: null })
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if (!isPasswordCorrect)
        return res.status(200).json({ message: "Enter correct email or password", status: "failed", user_id: null })
    return res.status(200).json({ message: "Login was successful", status: "success", user_id: existingUser._id })
});
export default adminRouter;