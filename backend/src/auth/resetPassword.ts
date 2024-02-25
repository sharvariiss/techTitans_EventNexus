import connect, { connection } from "../database/connect";
import bycryptjs from "bcrypt"
import { sendEmail } from "./helpers/mailer";
import { emailtype } from "./helpers/mailer";
import { User } from "../database/models/entities/user";
import { Request,Response } from "express";

export default async function ResetPassword(req:Request,res:Response){
    try {
        const reqBody = req.body;
        const {userName} = reqBody;
    

        //fetch the needed user
        const user = await connection.getRepository(User).findOne({where:{name:userName}})
    
        // Check if user exist
        if(!user){
            return res.status(400).json({message:"Invalid Username"});
        }
        console.log(user)
        
        //Send Email with token for resetting the password
        const response = await sendEmail({
            email:user.email, emailType: emailtype.CHANGEPASSWORD ,
            userId: user.id
        })
        

        //Handling the case where mail is not been sent
        if(!response)
            return res.status(400).json({message:"Error : Recheck the request"});

        // response for the api call
        return res.status(200).json({message:"Password Link Sent"});
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({message:error.message})
    }

}
