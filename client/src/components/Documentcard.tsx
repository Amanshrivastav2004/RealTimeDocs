import axios from 'axios';

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
            <div className="h-[200px] w-[150px] bg-white">

            </div>
        </div>
    )

}


export default Documentcard