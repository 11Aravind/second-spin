import mongoose from "mongoose";
const Schema = mongoose.Schema;
const adminSchema=new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    }
});
export default mongoose.model("Admin",adminSchema);