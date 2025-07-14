import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { customRequest } from "../interfaces/interfaces";
import user from "../Routes/userRouter";

const prisma = new PrismaClient()

export const createdocument=async (req:Request , res:Response) => {
    const {title , content}= req.body
    const userId = (req as any).userId

    try {
    const document = await prisma.document.create({
        data:{
            title,
            content,
            userId
        }
    })

    return res.status(200).json({message:"Document created" , document })
    } catch (error) {
        return res.status(400).json({error : (error as Error).message})
    }
   
}

export const getDocuments = async (req:customRequest , res:Response , next:NextFunction)=>{
    const userId = req.userId

    try {
    const documents = await prisma.document.findMany({
        where:{userId:userId}
    })

    return res.status(200).json({documents})

    } catch (error) {
        return res.status(400).json({error:(error as Error).message})
    }

}

export const searchDocument = async (req:customRequest , res:Response , next:NextFunction) => {

    const {filter} = req.query

    const userId = req.userId

    try {
        const documents = await prisma.document.findMany({
            where:{
                userId,
                title:{
                    contains:filter as string,
                    mode:"insensitive"
                }
            }
        })
    } catch (error) {
        
    }

    
}