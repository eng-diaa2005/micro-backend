import nodemailer from "nodemailer";



export const sendEmail = async (to, subject, html) => {
    try {
        //sender
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            html
        });
        
        return info.rejected.length === 0 ? true : false;
    } catch (error) {
        console.log(error.message, "error in send email");
        throw error;
    }
}