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
router.post('/save',upload.single("image"),async (req, res, next) => {
    const { name, description,productLabel, oldPrice, newPrice, status,category_id,subCategory_id,suitedVechicleName} = req.body;
    const image = req.file.filename;
    // const image = req.file.path.replace('uploads/','');
    const productData = new Product({
      name,
      image,
      description,
      productLabel,
      oldPrice,
      newPrice,
      status,
      category_id,
      subCategory_id,
      suitedVechicleName
    });
    try {
      await productData.save();
      res.status(200).json({ status: "success", message: "product was added successfuly" })
    } catch (error) {
      res.status(500).json({ status: "failed", message: `product was not inserted${error}` })
    }
  });
  router.delete('/:product_id',async(req,res)=>{
    const product_id=req.params.product_id;
    let deleteFlag;
    try{
        deleteFlag=await Product.findByIdAndDelete(product_id);
       
    }catch(err){
        return  res.status(500).send({status:"failed",message:'deletion failed',error:err,id:product_id});
    }
    if (!deleteFlag) {
        return res.status(404).json({status:"failed", message: 'Category not found' ,id:product_id});
    }
    return  res.status(200).json({ status:"success",message: 'Category deleted successfully', deleteFlag });
    
    });
export default router;