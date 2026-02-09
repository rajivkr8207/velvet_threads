import * as nodemailer from 'nodemailer';

export const sendemail = async ({ email, emailtype, hashtoken }) => {
    try {
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
            subject: emailtype == "VERIFY" ? "verify your email" : "Reset your password",
            html: `
      <h2>${emailtype == "VERIFY" ? 'Email Verification' : 'Reset your password'}</h2>
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