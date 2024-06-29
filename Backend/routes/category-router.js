import express from "express"
import Category from "../modules/Category.js"
const categoryRoute = express.Router()
// categoryRoute.post("/",registerUser);
categoryRoute.post("/store", async (req, res) => {
    const { vechicleType, year, company, model } = req.body;
    const data = new Category({
        vechicleType,
        year,
        company,
        model
    })
    let flag;
    try {
        flag = await data.save()
        if (flag)
            res.send("success")
        else
            res.send("failed")
    } catch (err) {
        console.log(err);
    }
});
export default categoryRoute;