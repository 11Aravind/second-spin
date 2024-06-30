import mongoose from "mongoose"
const schema = mongoose.Schema
const subCategory = new schema({
    Subcat_name: { type: String },
    image: { type: String },
    category_id: {
        type: schema.Types.ObjectId,
        ref: "Category"
    },
    spairPatsType: { type: String }
})
export default mongoose.model("Subcategory", subCategory);
