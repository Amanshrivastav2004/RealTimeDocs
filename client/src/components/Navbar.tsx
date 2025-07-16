import { useEffect, useState } from 'react'
import image from '../assets/logo.png'
import axios from 'axios';


interface getuserResponse{
    name:string
}
const Navbar=()=>{

    const [name , setName] = useState("")
    const token = sessionStorage.getItem('token')

   useEffect(()=>{

    if(token){

        try {
            const getuser =async()=>{
        const response = await axios.get<getuserResponse>(`${import.meta.env.VITE_URL}/api/v1/user/`, {
            headers:{
                authorization:token
            }
        })
       setName(response.data.name)
    }
        } catch (error:any) {
            alert(error.response.data.error)
        }

    }
    
   })
    return (
        <div className="w-screen h-[60px] bg-white flex justify-between px-7 py-4">
            <div className="flex gap-4 ">
                <img src={image} className="" />
                <h3 className="font-bold text-2xl">Docify</h3> 
            </div>
            <div className="flex gap-4">
                <input type="text" placeholder="Search documents..." className="rounded-md bg-gray-300 p-2 h-8 w-60 text-center"/>
                <button className="h-8 w-8 rounded-full bg-blue-400 text-white text-2xl">{name[0]}</button>
            </div>
        </div>
    )
}


export default Navbar