import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { customRequest } from "../interfaces/interfaces";
import { error } from "console";

const prisma = new PrismaClient()

export const createdocument=async (req:customRequest , res:Response) => {
    const userId = req.userId

    console.log(`create document: ${req.userId}`)

    if(!userId){
        return res.status(400).json({error: "userId not founddd"})
    }

    try {
    const document = await prisma.document.create({
        data:{
            userId
        }
    })

    return res.status(200).json({message:"Document created" , document })
    } catch (error) {
        return res.status(400).json({error : "error in create doc fn"})
    }
   
}

export const allDocuments = async (req:customRequest , res:Response , next:NextFunction)=>{
    const userId = req.userId
    const filter = req.query.filter

    try {

    if(filter){
       const filteredDocuments = await prisma.document.findMany({
        where:{userId ,
            title:{
                contains:filter as string,
                mode:"insensitive"
            }
        },
        
       }) 
       return res.status(200).json({filteredDocuments})
    }
    
    const documents = await prisma.document.findMany({
        where:{userId}
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

        return res.status(200).json({documents})
    } catch (error) {
        return res.status(400).json({error:(error as Error).message})
    }

}

export const deleteDocument= async (req:customRequest , res:Response , next:NextFunction)=>{
    const userId = req.userId

    const docId = Number(req.params.docId)

    if(!docId){
        return res.status(400).json({error:"Document id not recieved"})
    }

    try {
        const document = await prisma.document.findFirst({
            where:{id:docId }
        })

        if(!document){
            return res.status(400).json({error:"Document not found"})
        }

        if(document.userId !== userId){
            return res.status(400).json({error:"You are not authorized"})
        }

        await prisma.document.delete({
            where:{id:docId}
        })

        return res.status(200).json({message :"Document deleted"})

    } catch (error) {
        return res.status(400).json({error:(error as Error).message})
    }

}