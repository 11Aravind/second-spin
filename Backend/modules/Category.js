import mongoose from "mongoose"
const schema = mongoose.Schema
const categorySchema = new schema({
    vechicleType: { type: String },
    year: { type: String },
    company: { type: String },
    model: { type: String }
})
export default mongoose.model("Category", categorySchema);
