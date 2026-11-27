import mongoose from "mongoose";
import { hash } from "../../utils/hash.js";

export const genders = {
    MALE: "male",
    FEMALE: "female",
};
export const role = {
    user:"user",
    admin:"admin"
}

const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [90, "Password cannot exceed 90 characters"],
    },
    userName: {
        type: String,
        required: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [30, "Username cannot exceed 30 characters"],
        unique: true,
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        required: true,
        unique:true,
    },
    gender: {
        type: String,
        enum: Object.values(genders),
        required: true,
    },
    role:{
        type: String,
        enum: Object.values(role),
        default: role.user
    },

}, {timestamps: true})



userschema.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = hash({
        plantext: this.password,
        salt: parseInt(process.env.saltRounds)
    });
});

export const User = mongoose.model("User", userschema);