import { Router } from 'express';

import * as authController from './auth.controller.js';

import {validate} from '../../middleware/validate.middelware.js'

import {
    registerschema,
    sendOtpSchema,
    forgetPassSchema,
    newPassSchema
} from './auth.schema.js';


const authRouter = Router();


authRouter.post(
    '/register',
    validate(registerschema),
    authController.register
);


authRouter.post(
    '/login',
    authController.login
);


authRouter.get(
    "/activate/:token",
    authController.activate
);


authRouter.post(
    "/verify",
    validate(sendOtpSchema),
    authController.verify
);


authRouter.post(
    "/forget-pass",
    validate(forgetPassSchema),
    authController.forgetPass
);


authRouter.post(
    "/reset-pass",
    validate(newPassSchema),
    authController.resetPass
);


authRouter.post(
    "/refresh-token",
    authController.refreshToken
);


export default authRouter;