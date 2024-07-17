import mongoose from "mongoose"
const schema = mongoose.Schema
const categorySchema = new schema({
    vechicle: { type: String },
    spairPatsType: { type: String },
    image: { type: String },
    partsName: { type: String }
})
export default mongoose.model("Category", categorySchema);
