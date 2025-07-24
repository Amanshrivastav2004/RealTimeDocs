import { useRef, useState } from 'react';
import image from '../assets/logo.png'
import { useStore } from '../store/zustand';
import { useParams } from 'react-router-dom';


const DocumentNavbar = ()=>{
const title = useStore((state) => state.document.title)
const setTitle = useStore((state) => state.setDocument)
const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)
const updateDocs = useStore(state=>state.updateDocs)
const {docId} = useParams()  
const [isOpen , setisopen] = useState(false)

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
            <div className='flex items-center'>
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
                <button className='bg-blue-600 text-white text-xl rounded-full w-20 m-1 p-2' onClick={()=>setisopen(true)}>Share</button>
                <button className="h-10 w-10 m-2 rounded-full bg-blue-400 text-white text-2xl">A</button>
            </div>
            {isOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/30">
    <div className="bg-white p-6 rounded-2xl shadow-lg h-3/4 w-35/100 max-w-2xl flex flex-col">
      <h2 className="text-xl font-bold mb-4">Share Document</h2>
      <div className='mb-4 '>
        <h1 className='text-xl font-semibold'>Email:</h1>
        <input type="text" className='border border-gray-400 w-full rounded-md p-1' />
      </div>
      <div>
        <h1 className='text-xl font-medium'>Collaborators:</h1>
        <input type="text" className='bg-gray-200 w-full p-1' />
      </div>
      <div className='mt-auto w-full'>
        <h1 className='text-md font-medium w-full mb-2'>Permission</h1>
        <select name="permission" id="permission" className='w-ful bg-gray-200'>
            <option value="View Only">View Only</option>
            <option value="Edit">Edit</option>
        </select>
        <div className='flex justify-end gap-2'>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setisopen(false)}>
             Cancel
            </button>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setisopen(false)}>
             Submit
            </button>
        </div>
        
      </div>
      
    </div>
  </div>
)}
        </div>
    )
}


export default DocumentNavbar;