import { Request,Response } from "express";

export default async function Logout(req:Request,res:Response){
    try {
        //return a expired cookie
        return res.cookie("token","",{expires:new Date(0)}).json({
            message:"Logout successful",
            success:true,
            }
        );
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({error:error.message})
    }
}