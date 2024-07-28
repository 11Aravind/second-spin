import express from "express"
import multer from "multer";
import upload from "../middlewares/mutler-middleware.js";
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
categoryRoute.get("/subcategory", async (req, res) => {
    let categoryData;
    try {
        categoryData = await Subcategory.find();
        res.status(200).json({ "message": "success", "status": "success", "payload": categoryData })
    } catch (err) {
        res.send(err)
    }
});
categoryRoute.post("/save",upload.single("image"), async (req, res) => {
    const { vechicle, spairPatsType, partsName } = req.body;
    const image = req.file.filename;
    let flag;
    try {
        const data = new Category({
            vechicle,
            spairPatsType,
            image,
            partsName
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
categoryRoute.post("/subcategory/store", upload.single("image"),async (req, res) => {
    const { category_id, Subcat_name } = req.body;
       const image = req.file.filename;

    const data = new Subcategory({
        category_id,
        Subcat_name,
        image,
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
categoryRoute.delete('/:category_id',async(req,res)=>{
    const category_id=req.params.category_id;
    let deleteFlag;
    try{
        deleteFlag=await Category.findByIdAndDelete(category_id);
       
    }catch(err){
        return  res.status(500).send({status:"failed",message:'deletion failed',error:err,id:category_id});
    }
    if (!deleteFlag) {
        return res.status(404).json({status:"failed", message: 'Category not found' ,id:category_id});
    }
    return  res.status(200).json({ status:"success",message: 'Category deleted successfully', deleteFlag });
    
    });

export default categoryRoute;