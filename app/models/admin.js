import mongoose from "mongoose";

const Adminschema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password: { type: String },
    
})

export default mongoose.models.Admin || mongoose.model('Admin',Adminschema)