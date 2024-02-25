import nodemailer from 'nodemailer';
import connect, { connection } from '../../database/connect';
import bcrypt from 'bcrypt';
import { User } from '../../database/models/entities/user';

// Define an enum to represent email types
export const emailtype = Object.freeze({
    CHANGEPASSWORD: "CHANGEPASSWORD",
    CHANGEPASSWORDSUCCESSFUL: "CHANGEPASSWORDSUCCESSFUL"
});

// Create a nodemailer transporter to send emails
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    //use
    // secure: false, // true for 465, false for other ports
    auth: {
        user: "dataset1919@gmail.com",
        pass: "puvd pxte xqsj eprq",
    },
});

// Function to send an email based on the specified email type
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Verify the transporter
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });

        // Generate a hashed token from the user's ID
        let hashedToken = await bcrypt.hash(userId.toString(), 10);
        // todo : hashedToken.replace(`/\\//g`, "slash");
        // Find the user based on the user ID
        const user = await connection.getRepository(User).findOne({ where: { id: userId } });

        // If the email type is CHANGEPASSWORD, update user properties
        if (emailType === emailtype.CHANGEPASSWORD) {
            user.forgot_password_token = hashedToken;
            user.forgot_password_token_expiry = new Date(Date.now() + 3600000);
            user.save();
        }



        // Define email options
        const mailOptions = {
            from: '',
            to: email,
            subject: emailType == emailtype.CHANGEPASSWORD ? "Reset your password" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to
            ${emailType == emailtype.CHANGEPASSWORD ? "Reset your password" : "Reset your password"}
            or copy and paste the link below into your browser.<br>
            ${process.env.DOMAIN}/resetPasswordVerify?token=${hashedToken}&username=${user.name}
            </p>`,
            // Todo : update with frondend link
        };

        // Send the email
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log(mailResponse);

        
        return mailResponse;
    } catch (error: any) {
        // Handle any errors and throw an error message
        throw new Error(error.message);
    }
};