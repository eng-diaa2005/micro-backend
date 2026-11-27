import Joi from "joi"
import { genders } from "../../DB/models/user.model.js"

export const registerschema = Joi.object({

    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid(...Object.values(genders)).required(),
    phoneNumber: Joi.number().required(),
    password: Joi.string().min(6).max(90).required(),
    confirmPassword: Joi.ref("password"),
    otp: Joi.string().required()

}).required()


export const sendOtpSchema = Joi.object({

    email: Joi.string().email().required()

}).required()


export const forgetPassSchema = Joi.object({

    email: Joi.string().email().required()

}).required()


export const newPassSchema = Joi.object({

    email: Joi.string().email().required(),
    otp: Joi.string().required(),
    password: Joi.string().min(6).max(90).required(),
    confirmPassword: Joi.ref("password"),

}).required()


export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required()
}).required()