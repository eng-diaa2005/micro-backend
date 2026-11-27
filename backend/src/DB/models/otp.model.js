import mongoose, { Schema } from "mongoose";

const otoSchema= new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true

    }
},{timestamps:true})

otoSchema.index({createdAt:1},{expireAfterSeconds:120})



const OTP = mongoose.model("OTP",otoSchema)
export default OTP