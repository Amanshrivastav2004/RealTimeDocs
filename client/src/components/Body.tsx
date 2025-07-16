import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Documentcard from "./Documentcard";

interface Document{
    id:number
    title?:string
    content?:string
    updatedAt:string
    userId:number
}

interface getdocresponse{
    documents:Document[]
}

interface createdocresponse{
    message:string
    document:Document
}


export  const  Body = ()=>{

    const navigate = useNavigate()

    const [documents , setDocuments] = useState<Document[]>([]);

     useEffect(()=>{
        (async () => {
            const response = await axios.get<getdocresponse>(`${import.meta.env.VITE_URL}/`,{
                headers:{
                    authorization: sessionStorage.getItem('token')
                }
            })
            setDocuments(response.data.documents)
        })()
    },[])

    const createdocument = async () => {
        const token = sessionStorage.getItem("token")

        if (!token) {
            alert("user id not found createdoc at frontend")
        }

        try {
        const response = await axios.post<createdocresponse>(`${import.meta.env.VITE_URL}/api/v1/document/`, {} , {
        headers:{
            authorization:sessionStorage.getItem('token')
            }
        } )
        
        alert(response.data.message)
        // navigate(`/document/${response.data.document.id}`)
        } catch (error:any) {
            console.log(error?.response?.data); 
            alert(error?.response?.data?.message || "Unexpected error");
        }
   
    }


    return (
        <div className="flex flex-col gap-6 px-10 md:px-20 lg:px-32 xl:px-40 py-20">
                <div className="h-[200px] w-full">
                    <button onClick={createdocument} className="h-full w-[150px] flex flex-col justify-center items-center bg-white shadow-2xl">
                        <div className="text-9xl font-extralight text-blue-500">+</div>
                        <p>Blank Document</p>
                    </button>
                </div>
                <p className="font-bold text-lg">Recent Documents</p>
                
                <Documentcard documents={documents}></Documentcard>
                   
            </div>
    )
}