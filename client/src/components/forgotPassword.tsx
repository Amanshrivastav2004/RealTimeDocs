import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type forgotpasswordResponsse={
    message:string
}

export const ForgotPassword=()=>{

const[email , setEmail] = useState("")

const {resetToken} = useParams()

useEffect(()=>{
    if(resetToken){
        const resetPasswordfn = async () => {
            
        }
    }
})

    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="h-[200px] w-[300px] rounded-lg shadow-lg p-4">
                <div className="flex flex-col p-2 " >
                    <div className="p-2" >Email</div>
                    <input type="email" placeholder="abc@gmail.com" className="border border-blue-400 bg-slate-100 p-2 w-full"
                    value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <button className="m-2 p-2 bg-blue-400 w-full rounded-lg text-white" 
                onClick={async () => {
                    try {
                        const response = await axios.post<forgotpasswordResponsse>(`${import.meta.env.VITE_URL}/api/v1/user/forgot-password` , {
                            email
                        })
                        alert(response.data.message)
                    } catch (error:any) {
                        alert(error.response.data.error)
                    }
                }}>Submit</button>
                
            </div>
        </div>
    )
}