import  { create } from 'zustand'
import axios from 'axios';

interface Document{
    id:number
    title?:string
    content?:string
    updatedAt:string
    userId:number
}

interface Documentt{
    title:string
    content:string
}

interface getdocresponse{
    documents:Document[]
}

interface StoreState{
    documents:Document[]
    getDocuments:()=> Promise<void>;
    setDocuments:(docs:Document[])=> void
    title:string
    setTitle:(titlee:string)=> void
    content:string
    setContent:(contentt:string)=>void
    document:Documentt
    setDocument:(data:{title?:string , content?:string})=>void
    updateDocs:(docId:number , document:{title?:string , content?:string})=> Promise<void>;
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
    setDocuments:(docs)=> set({documents:docs}),
    title:"",
    setTitle:(titlee)=>set({title:titlee}),
    content:"",
    setContent:(contentt)=>set({content:contentt}),
    document:{
        title:"",
        content:""
    },
    setDocument:(data)=>set((state)=>({...state.document,
        ...data
    })),
    updateDocs: async (docId , document) => {
        const res = await axios.put(`${import.meta.env.VITE_URL}api/v1/document/update/${docId}`,{
            title:document.title,
            content:document.content
        } , {
            headers:{
                authorization:sessionStorage.getItem('token')
            }
        })
    }
}))