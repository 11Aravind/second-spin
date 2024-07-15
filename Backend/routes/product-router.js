import express from "express";
import upload from "../middlewares/mutler-middleware.js"
import Product from "../modules/Product.js"
const router=express.Router()
router.get('/',async (req, res, next) => {
    let productDetails;
    try {
      productDetails = await Product.find();
    }
    catch (error) {
      return console.log(error);
    }
    if (productDetails.length===0)
      return res.status(500).json({ message: "Product was empty" })
    return res.status(200).json({productDetails})
 } );
router.post('/save',upload.single('image'),async (req, res, next) => {
    const { name, description, category_id, oldPrice, newPrice, status } = req.body;
    const image = req.file.filename;
    // const image = req.file.path.replace('uploads/','');
    const productData = new Product({
      name,
      image,
      description,
      oldPrice,
      newPrice,
      status,
      category_id,
    });
    try {
      await productData.save();
      res.status(200).json({ status: "success", message: "product was added successfuly" })
    } catch (error) {
      res.status(500).json({ status: "failed", message: `product was not inserted${error}` })
    }
  });
export default router;