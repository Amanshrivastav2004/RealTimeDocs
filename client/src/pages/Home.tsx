
import Navbar from "../components/Navbar"
import { Body } from "../components/Body"



const Home=()=>{




    return(
        <div className="min-h-screen w-screen bg-gray-300">
            <Navbar></Navbar>
            <div>
                <Body></Body>
            </div>
            <div className="bg-blue-500">
                © 2025 Docify. All rights Reserved
            </div>
        </div>
    )
}


export default Home