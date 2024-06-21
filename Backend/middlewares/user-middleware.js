import User from "../modules/User.js"
import bcrypt from 'bcryptjs';


export const registerUser = async (req, res, next) => {
    const { email, password } = req.body;
    let existingEmail;
    try {
        existingEmail = await User.findOne({ email })
    } catch (error) {
        console.log(error);
    }
    if (existingEmail)
        return res.status(400).json({ message: "user already exist", status: "failed" })

    const hashedPassword = bcrypt.hashSync(password)
    console.log(hashedPassword);

    const user = new User({
        email,
        password: hashedPassword
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({ message: "successsfuly Registered", status: "success" })
}
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    }
    catch (error) { return console.log(error); }
    if (!existingUser)
        return res.status(401).json({ message: "coudn't find user e-mail", status: "failed", user_id: null })
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if (!isPasswordCorrect)
        return res.status(401).json({ message: "password was wrong ", status: "failed", user_id: null })
    return res.status(200).json({ message: "Login was successful", status: "success", user_id: existingUser._id })
}