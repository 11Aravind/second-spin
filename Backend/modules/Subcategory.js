import mongoose from "mongoose"
const schema = mongoose.Schema
const subCategory = new schema({
    category_id: {
        type: schema.Types.ObjectId,
        ref: "Category"
    },
    Subcat_name: { type: String },
    image: { type: String },
})
export default mongoose.model("Subcategory", subCategory);
