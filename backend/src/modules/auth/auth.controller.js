
import { genders, User } from '../../DB/models/user.model.js';
import Device  from '../../DB/models/device.model.js';
import CryptoJS from 'crypto-js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { emailEmitter } from '../../utils/email.events.js';
import OTP from '../../DB/models/otp.model.js';
import Randomstring from 'randomstring';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const register = asyncHandler(
    async (req, res, next) => {

        const { email, otp } = req.body;

        const otpExist = await OTP.findOne({
            email,
            otp
        });

        if (!otpExist) {
            return next(
                new Error("Invalid OTP", { cause: 400 })
            );
        }

        const user = await User.create({
            ...req.body,

            phoneNumber: CryptoJS.AES.encrypt(
                req.body.phoneNumber.toString(),
                process.env.SECRET_KEY1
            ).toString(),

            isActivated: true
        });

        await OTP.deleteOne({
            _id: otpExist._id
        });

        return res.status(201).json({
            message: "User registered successfully",
            user
        });
    }
);

export const login = asyncHandler(
    async (req, res) => {

        const { email, password, deviceId } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (!user.isActivated) {
            return res.status(403).json({
                message: "Account is not activated"
            });
        }

        if (!deviceId) {
            return res.status(400).json({
                message: "Device ID is required"
            });
        }

        const device = await Device.findOne({
            deviceId
        });

        if (!device) {
            return res.status(404).json({
                message: "Device not found"
            });
        }


        const access_token =
            jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.SECRET_KEY1,
                {
                    expiresIn: "15m"
                }
            );

        const refresh_token =
            jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.SECRET_KEY2,
                {
                    expiresIn: "7d"
                }
            );

        res.status(200).json({
            message: "Login successful",
            access_token,
            refresh_token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email
            }
        });
    }
);

export const activate = asyncHandler(
    async (req, res, next) => {

        const { token } =
            req.params;

        const { email } =
            jwt.verify(
                token,
                process.env.SECRET_KEY2
            );

        const user =
            await User.findOne({
                email
            });

        if (!user) {
            return next(
                new Error(
                    "user not found"
                )
            );
        }

        user.isActivated = true;

        await user.save();

        res.status(200).json({
            message:
                "Account activated successfully"
        });
    }
);

export const forgetPass = asyncHandler(
    async (req, res, next) => {

        const user =
            await User.findOne({
                email:
                    req.body.email
            });

        if (!user) {
            return next(
                new Error(
                    "user not found"
                )
            );
        }

        const otp =
            Randomstring.generate({
                length: 6,
                charset: "numeric"
            });

        await OTP.create({
            email:
                req.body.email,

            otp
        });

        emailEmitter.emit(
            'sendResetPasswordEmail',
            req.body.email,
            otp
        );

        res.json({
            message:
                "otp sent for reset password",

            status: 200
        });
    }
);

export const resetPass = asyncHandler(
    async (req, res, next) => {

        const {
            email,
            otp,
            password,
            confirmPassword
        } = req.body;

        const user =
            await User.findOne({
                email
            });

        if (!user) {
            return next(
                new Error(
                    "user not found"
                )
            );
        }

        const otpExist =
            await OTP.findOne({
                email,
                otp
            });

        if (!otpExist) {
            return next(
                new Error(
                    "otp not found"
                )
            );
        }

        if (
            confirmPassword !==
            password
        ) {
            return next(
                new Error(
                    "password not match"
                )
            );
        }

        user.password =
            password;

        await user.save();

        await OTP.deleteOne({
            _id:
                otpExist._id
        });

        res.json({
            message:
                "password reset successfully",

            status: 200
        });
    }
);

export const refreshToken = asyncHandler(
    async (req, res, next) => {

        const {
            refreshToken
        } = req.body;

        if (!refreshToken) {
            return next(
                new Error(
                    "Refresh token is required",
                    {
                        cause: 400
                    }
                )
            );
        }

        const payload =
            jwt.verify(
                refreshToken,
                process.env.SECRET_KEY2
            );

        const user =
            await User.findOne({
                _id:
                    payload.id
            });

        if (!user) {
            return next(
                new Error(
                    "user not found",
                    {
                        cause: 404
                    }
                )
            );
        }

        const access_token =
            jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.SECRET_KEY1,
                {
                    expiresIn: "15m"
                }
            );

        return res.status(200).json({
            message:
                "token refreshed successfully",

            access_token
        });
    }
);

export const verify = asyncHandler(
    async (req, res, next) => {

        const {
            email
        } = req.body;

        const user =
            await User.findOne({
                email
            });

        if (user) {
            return res.status(409).json({
                message: "Email is already registered"
            });
        }

        const otp =
            Randomstring.generate({
                length: 6,
                charset: "numeric"
            });

        await OTP.create({
            email,
            otp
        });

        emailEmitter.emit(
            'sendActivationEmail',
            email,
            otp
        );

        res.json({
            message:
                "otp sent",

            status: 200
        });
    }
);

