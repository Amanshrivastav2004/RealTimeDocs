
import  QuillEditor  from '../components/QuillEditor';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/zustand';
import axios from "axios"



interface Document{
    id:number
    title?:string
    content?:string
    updatedAt:string
    userId:number
}

interface getonedoc{
    document:Document
}

const Document = ()=>{
  
  const token = sessionStorage.getItem("token") as string
  const {docId} = useParams()
  const setDocument = useStore(state=>state.setDocument)


  
    const response = async () => {
      
      try {
        const res = await axios.get<getonedoc>(`${import.meta.env.VITE_URL}/api/v1/document/${docId}`,{
        headers:{
          authorization:token
        }
      })
      
      setDocument({title:res.data.document.title || "" , content:res.data.document.content || ""})
      alert("main doc page")
      } catch (error) {
        console.error("Error fetching doc:", error);
      }

    }
    response()
 

    return (
    <div className="p-4 space-y-4 flex flex-col h-screen w-screen">
        <Navbar></Navbar>
      <QuillEditor/>
      
    </div>
    )
}

export default Document