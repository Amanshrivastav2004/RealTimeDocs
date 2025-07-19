import  { create } from 'zustand'
import axios from 'axios';

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

interface StoreState{
    documents:Document[]
    getDocuments:()=> Promise<void>;
    setDocuments:(docs:Document[])=> void
}

export const useStore = create<StoreState>((set)=>({
    documents:[] , 
    getDocuments: async () => {
        try {
            const response = await axios.get<getdocresponse>(`${import.meta.env.VITE_URL}/api/v1/document/`,{
                headers:{
                authorization: sessionStorage.getItem('token')
                }
            })
            set({documents: response.data.documents})
            
        } catch (error) {
            console.error("Error fetching:" , error)
        }
    } ,
    setDocuments:(docs)=> set({documents:docs})
}))