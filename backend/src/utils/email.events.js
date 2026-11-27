
import { EventEmitter } from "events";
import { generateActivationTemplate } from "./activationEmail.template.js";
import { generateResetPasswordTemplate } from "./resetPasswordEmail.template.js";
import { sendEmail } from "./sendEmail.js";

export const emailEmitter = new EventEmitter();

emailEmitter.on(
    "sendActivationEmail",
    async (email, otp) => {
        try {
            await sendEmail(
                email,
                "Verify your Nabta account",
                generateActivationTemplate(otp)
            );

            console.log(
                "Activation email sent successfully"
            );
        } catch (error) {
            console.error(
                "Error in sending activation email:",
                error.message
            );
        }
    }
);

emailEmitter.on(
    "sendResetPasswordEmail",
    async (email, otp) => {
        try {
            await sendEmail(
                email,
                "Reset your Nabta password",
                generateResetPasswordTemplate(otp)
            );

            console.log(
                "Reset password email sent successfully"
            );
        } catch (error) {
            console.error(
                "Error in sending reset password email:",
                error.message
            );
        }
    }
);
