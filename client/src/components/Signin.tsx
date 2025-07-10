import { Link } from 'react-router-dom' 


function Signin(){

    return (
       <div className='w-screen h-screen flex justify-center items-center'>
          <div className='w-[400px] h-[400px] bg-gray-50 rounded-lg shadow-md p-4 '>
            <div className='flex justify-center'>
                <p className='font-bold text-2xl'>Get Started</p>
            </div>
            <div className='flex justify-center p-3 gap-2 text-blue-400 font-semibold'>
                <h1>Don't Have an Account?</h1>
                <Link to='/Signup' className='underline'>Sign up</Link>
            </div>
           
            <div className='flex flex-col gap-1.5 p-2'>
                <div className='p-2'>Email</div>
                <input type="email" placeholder='abc@gmail.com' className='border border-slate-500 p-2 bg-slate-100 rounded-lg w-full'/>
            </div>
            <div className='flex flex-col gap-1.5 p-2'>
                <div className='p-2'>Password</div>
                <input type="password" placeholder='*********' className='border border-slate-500 p-2 bg-slate-100 rounded-lg w-full'/>
            </div>
            
            <button className=' bg-sky-600 rounded-md p-1 mt-6 mb-6 w-full text-white'>Sign In</button>
            
          </div>
        </div>
    )

}

export default Signin;