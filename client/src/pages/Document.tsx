
import { QuillEditor } from '../components/QuillEditor';
import Navbar from '../components/Navbar';

const Document = ()=>{
  
    return (
    <div className="p-4 space-y-4 flex flex-col h-screen w-screen">
        <Navbar></Navbar>
      <QuillEditor/>
      
    </div>
    )
}

export default Document