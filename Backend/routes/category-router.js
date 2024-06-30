import express from "express"
import Category from "../modules/Category.js"
import Subcategory from "../modules/Subcategory.js";
const categoryRoute = express.Router()
categoryRoute.get("/", async (req, res) => {
    let categoryData;
    try {
        categoryData = await Category.find();
        res.status(200).json({ "message": "success", "status": "success", "payload": categoryData })
    } catch (err) {
        res.send(err)
    }
});
categoryRoute.post("/save", async (req, res) => {
    const { vechicleType, year, company, model } = req.body;
    let flag;

    try {
        const data = new Category({
            vechicleType,
            year,
            company,
            model
        })
        // console.log(data)
        flag = await data.save()
        if (flag)
            res.status(200).json({ "message": "category was added", "status": "success" })
        else
            res.status(200).json({ "message": "category was not added", "status": "failed" })
    } catch (err) {
        res.status(401).json({ "message": `some thing went wrong ${err}`, "status": "failed" })
    }
});
categoryRoute.post("/subcategory/store", async (req, res) => {
    const { Subcat_name, image, category_id, spairPatsType } = req.body;
    const data = new Subcategory({
        Subcat_name,
        image,
        category_id,
        spairPatsType
    })
    let flag;
    try {
        flag = await data.save()
        if (flag)
            res.status(200).json({ "message": "Subcategory was added", "status": "success" })
        else
            res.status(200).json({ "message": "Subcategory was not added", "status": "failed" })
    } catch (err) {
        res.status(401).json({ "message": `some thing went wrong ${err}`, "status": "failed" })
    }
});
export default categoryRoute;