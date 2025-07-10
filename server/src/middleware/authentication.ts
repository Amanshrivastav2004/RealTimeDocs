import { NextFunction, Request, Response } from "express";

import { signinschema, signupSchema, userValidator } from "../validators/user.Validate";
import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
type result = Boolean | string
export const SignupAuthentication = async (req:Request , res:Response , next:NextFunction)=>{
    
    const {name , email , password} = req.body
    
    try {
        const result = userValidator({name , email , password} , signupSchema)
    if(!result == true){
        return result
    }

    const user = await prisma.user.findFirst({
        where:{
            
            email
        }
    })

    if(user){
        return res.status(409).json({ message : "user already exist"})
    }

    return next()
    } catch (error) {
        return res.status(500).json(error)
    }
   
}

export const SigninAuthentication = (req:Request , res:Response , next:NextFunction)=>{

    const body = req.body

    const result = userValidator(body , signinschema)
    if(!result){
        return result
    }
}