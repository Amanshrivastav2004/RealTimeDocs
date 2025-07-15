import image from '../assets/logo.png'

const Navbar=()=>{


    return (
        <div className="w-screen h-[60px] bg-white flex justify-between px-7 py-4">
            <div className="flex gap-4 ">
                <img src={image} className="" />
                <h3 className="font-bold text-2xl">Docify</h3> 
            </div>
            <div className="flex gap-4">
                <input type="text" placeholder="Search documents..." className="rounded-md bg-gray-300 p-2 h-8 w-60 text-center"/>
                <button className="h-8 w-8 rounded-full bg-blue-400 text-white text-2xl">A</button>
            </div>
        </div>
    )
}


export default Navbar