import jwt from "jsonwebtoken";
import { Request,Response } from "express";

export const getDataFromToken = (req:Request, res:Response)=>{
    try {
        // Read the Token from cookies
        const token = req.signedCookies["token"] || '';
        console.log(token)
        // Check it the token exists if not return undefined
        if(token == '') return undefined
         
        // Decode the token
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!);
        
        // Return the user id from the token
        return decodedToken.id;

    } catch (error:any) {
        console.log(error.message);
        // Throw error        
        // throw new Error(error.message);
        return res.status(500).json({error:error.message})
    }
}