import axios from 'axios';
import image from '../assets/logo.png'
import React, {  useState } from 'react';

interface Document{
    id:number
    title?:string
    content?:string
    updatedAt:string
    userId:number
}
const Documentcard = ({documents}:{documents:Document[]})=>{

    const [position , setPosition] = useState({top:0 , left:0})
    const [isOpen , setisopen] = useState(false)

    const handlePosition = (e:React.MouseEvent , docId:number)=>{
        
            const rect = e.currentTarget.getBoundingClientRect()
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX
            })
        
        setisopen(!isOpen)
    }

    return (
        <div className="flex flex-wrap gap-8 ">
            {documents.map(doc=>(
            <div className="h-[250px] w-[150px] bg-white flex flex-col" key={doc.id}>
                <div className="grow bg-gray-200">

                </div>
                <div className="flex flex-col  h-[60px] gap-1 ">
                    <div className='text-sm m-2 h-[10px]'>Untitled Documents</div>
                    <div className='flex justify-between gap-2 '>
                        <img src={image} className="h-6" />
                        <div className='text-sm'>5-6-2024</div>
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-three-dots-vertical h-7 w-4 text-gray-500" viewBox="0 0 16 16"
                             onClick={ (e)=>{handlePosition(e , doc.id)}}>
                           <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                        {isOpen &&(
                         <div className='absolute bg-white' style={{top:position.top , left:position.left}}>
                           <div className='border-b border-b-gray-300 hover:bg-gray-200 p-1 text-sm' >Delete</div>
                           <div className='hover:bg-gray-200 p-1 text-sm'>Share</div> 
                         </div>
                          )
                        }
                    </div>
                </div>
            </div>
            ))}
            
        </div>
    )

}


export default Documentcard