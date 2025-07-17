import axios from 'axios';
import image from '../assets/logo.png'

interface Document{
    id:number
    title?:string
    content?:string
    updatedAt:string
    userId:number
}
const Documentcard = ({documents}:{documents:Document[]})=>{


    return (
        <div className="flex flex-wrap gap-8 ">
            {documents.map(doc=>(
            <div className="h-[250px] w-[150px] bg-white flex flex-col" key={doc.id}>
                <div className="grow bg-amber-400">

                </div>
                <div className=" bg-amber-800">
                    <div className='text-sm p-2'>Untitle Documents</div>
                    <div className='flex gap-2 p-2'>
                        <img src={image} className="h-6" />
                        <div>5-6-2024</div>
                    </div>
                </div>
            </div>
            ))}
        </div>
    )

}


export default Documentcard