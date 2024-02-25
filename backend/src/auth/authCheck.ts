import { getDataFromToken } from "./helpers/getDataFromToken";
import { NextFunction, Request,Response } from "express";


export default function AuthCheck(req:Request, res:Response,next:NextFunction) {
    // get UserId from token
    const userId = getDataFromToken(req,res);
    
    console.log(userId)
    // check if token exists and user is in that token
    if(!userId){
        return res.status(401).json({message:"Unauthorized"});
    }
    next();
}