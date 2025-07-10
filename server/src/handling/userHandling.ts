import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client"
import { sendMail } from "../sendmail"
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const signup = async (req:Request , res:Response ) => {
    const {name , email , password} = req.body

    const hashedpassword = await bcrypt.hash( password , 10)

    try{
        await prisma.user.create({
            data:{
                name,
                email,
                password: hashedpassword
            }
        })
        
        
        const verificationtoken = jwt.sign({email} , process.env.VERIFY_KEY as string)

        await sendMail({
            from: 'process.env.EMAIL_USER',
            to: 'email',
            subject: 'Welcome to RealTimeDocs',
            text: `Please click on the link to verify ${process.env.LINK}/verifyemail/${verificationtoken}`
        })
        return res.status(201).json({message: "User created successfully"})
    }catch(error){
        return res.status(400).json({error: "User not created"})
    }


}