import bcrypt from 'bcryptjs'
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

import { prisma } from "@/lib/prisma";

export const sendemail = async ({ email, emailtype }) => {
    try {
        const hashtoken = await bcrypt.hash(email.toString(), 10)

        if (emailtype == "VERIFY") {
            await prisma.User.update({
                where: {
                    email: email,
                }, data: {
                    verifyToken: hashtoken,
                    verifyTokenExp: Date.now() + 3600000
                },
            })
        } else if (emailtype == "RESET") {
            await prisma.User.update({
                where: {
                    email: email,
                }, data: {
                    forgotPasswordToken: hashtoken,
                    forgotPasswordTokenExpire: Date.now() + 3600000
                },
            })
        }
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailoptions = {
            from: process.env.MAIL_EMAIL,
            to: email,
            subject: email == "VERIFY" ? "verify your email" : "Reset your password",
            html: `
      <h2>Email Verification</h2>
      <p>Click the link below to ${emailtype} your email:</p>

      <a href="${process.env.DOMAIN}/${emailtype == "VERIFY" ? "verifyemail" : "resetpassword/confirm"}?token=${hashtoken}">Click here</a> <p> to ${emailtype === "VERIFY" ? "verify your email" : "reset your password"
                }</p>
        <p>${process.env.DOMAIN}/${emailtype == "VERIFY" ? "verifyemail" : "resetpassword/confirm"}?token=${hashtoken}</p>
    `,

        }
        const mailresponse = await transport.sendMail(mailoptions)
        return mailresponse

    } catch (error) {
        console.error(error);
    }
}





// // Create a transporter for SMTP
// const transporter = nodemailer.createTransport({
//   host: "smtp.example.com",
//   port: 587,
//   secure: false, // upgrade later with STARTTLS
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });