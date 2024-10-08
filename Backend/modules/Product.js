import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  productLabel: {
    type: String,
    // required: true
  },
  oldPrice: {
    type: Number,
    required: true
  },
  newPrice: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
  },
  category_id:{
    type:Schema.Types.ObjectId,
    ref:"Category"
  },
  subCategory_id:{
    type:Schema.Types.ObjectId,
    ref:"Subcategory"
  },
  suitedVechicleName:{
    type:String
  }


})
export default mongoose.model("Product", productSchema); 
