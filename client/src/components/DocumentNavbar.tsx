import { useRef } from 'react';
import image from '../assets/logo.png'
import { useStore } from '../store/zustand';
import { useParams } from 'react-router-dom';


const DocumentNavbar = ()=>{
const title = useStore((state) => state.document.title)
const setTitle = useStore((state) => state.setDocument)
const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)
const updateDocs = useStore(state=>state.updateDocs)
const {docId} = useParams()  

const dataTobackend = async(title:string) => {
    setTitle({title:title})
    if (debounce.current) clearTimeout(debounce.current)
    try {
      debounce.current = setTimeout(() => {
        
        updateDocs(Number(docId), { title:title})
      },1000)
    } catch (error) {
      console.error(error)
      alert("error while sending data to backend")
    }
  }


    return(
        <div className="w-screen h-[50px] flex justify-between items-center px-7 py-10 bg-gray-200">
            <div className='flex '>
                <img src={image} className="h-10 w-8 m-4" />
                <div className='grow flex flex-col px-7 gap-3'>
                    <input className='h-[40px] font-bold p-2' 
                    value={title || "Untitled Document"} onChange={(e)=>{dataTobackend(e.target.value)}}></input>
                    <div className='flex gap-5'>
                        <div className='text-xs'>File</div>
                        <div className='text-xs'>Edit</div>
                        <div className='text-xs'>View</div>
                        <div className='text-xs'>Insert</div>
                        <div className='text-xs'>Format</div>
                        <div className='text-xs'>Tools</div>
                        <div className='text-xs'>Add-ons</div>
                        <div className='text-xs'>Help</div>
                    </div>
                </div>
            </div>
            <div className='flex gap-5'>
                <button className='bg-blue-600 text-white text-xl rounded-full w-20 m-1 p-2'>Share</button>
                <button className="h-10 w-10 m-2 rounded-full bg-blue-400 text-white text-2xl">A</button>
            </div>
        </div>
    )
}


export default DocumentNavbar;