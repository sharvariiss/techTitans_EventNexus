import connect, { connection } from "../database/connect";
import { Raw } from "typeorm";
import bcryptjs from "bcrypt"
import { User } from "../database/models/entities/user";
import { Request,Response } from "express";



export default async function ResetPasswordVerify(req:Request, res:Response) {
    try {
        const reqBody = req.body;
        const { token, password, userName } = reqBody;
        // console.log(reqBody + " " + token + " " + password)

        // connection
        const user = await connection.getRepository(User).findOne({where:{forgot_password_token:token,name:userName}});

        if (!user) {
            return res.status(400).json({ message: "Invalid Token" });
        }
        // console.log(user);

        
        const parsedExpiryDate = new Date(user.forgot_password_token_expiry); 
        if(parsedExpiryDate<new Date()){
            return res.status(400).json({ message: "Password Reset Link Expired" })
        }

        //hash
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //Update the values
        user.password = hashedPassword;
        user.forgot_password_token = null;
        user.forgot_password_token_expiry = null;
        await user.save()

        return res.status(200).json({ message: "Password Reset Successful" })
        //include email as notification
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }

}