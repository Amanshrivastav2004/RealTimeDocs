// src/components/QuillEditor.tsx
import React, { useRef, useEffect } from 'react';
import Quill from 'quill'
import 'quill/dist/quill.snow.css'; 
import { useStore } from '../store/zustand';
import { useParams } from 'react-router-dom';
import axios from 'axios'

interface Document{
    id:number
    title?:string
    content?:string
    updatedAt:string
    userId:number
}

interface getonedoc{
    document:Document
}
// const  QuillEditor=() =>{

//   const {docId} = useParams()  
//   const editorRef = useRef<HTMLDivElement>(null);
//   const quillRef = useRef<Quill | null>(null);
//   const content = useStore(state=>state.document.content)
//   const setContent = useStore(state=>state.setDocument)
//   const updateDocs = useStore(state=>state.updateDocs)
//   const timeout = useRef<number | null>(null)

//   if(!docId){
//          alert("does not have Id")
//          return null
//     }
    


//   useEffect(() => {
//     if (!editorRef.current) return;
//     if (quillRef.current) return;
//     alert("in use effect")

//     // Initialize Quill only once
//     quillRef.current = new Quill(editorRef.current, {
//       theme: 'snow',
//       modules: {
//         toolbar: [
//           ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//           ['blockquote', 'code-block'],
//           ['link', 'image', 'video', 'formula'],

//           [{ 'header': 1 }, { 'header': 2 }],               // custom button values
//          [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
//          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//          [{ 'direction': 'rtl' }],                         // text direction

//          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

//          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//          [{ 'font': [] }],
//          [{ 'align': [] }],

//          ['clean']  
//         ]
//       }
//     });

// //     // const value = async () => {
// //     //     const res = await axios.get<getonedoc>(`${import.meta.env.VITE_URL}/api/v1/document/`,{
// //     //         headers:{
// //     //             authorization:sessionStorage.getItem('token')
// //     //         }
// //     //     })
// //     //     if (!quillRef.current) return;
       
// //     // }
    
// //     // quillRef.current.root.innerHTML = content;

    
//     const handler = ()=> {
//       alert("in handler fn")
//        if(timeout.current) clearTimeout(timeout.current);
//            try {
//                const html = quillRef.current?.root.innerHTML;
         
//      if (html !== content) {
//       alert("false text xhange")
//       setContent({ content: html });
    
//      }
    
//     timeout.current = setTimeout(() => {
//     if (docId && content !== undefined) {
//       updateDocs(Number(docId), { content });
//     }
//     }, 300); 
//            } catch (error) {
//             alert("handler fn fail")
//            }
// //    
//     };
//     quillRef.current.on('text-change', handler);

    

//     return () => {
//       quillRef.current?.off('text-change', handler);
//     };
//   }, []);

  
// // //   useEffect(() => {
    
// // //     if (quillRef.current && quillRef.current.root.innerHTML !== content) {
// // //       quillRef.current.root.innerHTML = content;
// // //     }

// // //     // delay in ms

// // //   }, [content]);

//   return (
//     <div className=" flex flex-col h-screen w-screen px-30">
//       <div ref={editorRef} className=" bg-white grow border shadow-sm" />
//     </div>
//   );
// }

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];




const QuillEditor = () => {
  const divRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)
  const updateDocs = useStore(state=>state.updateDocs)

  
  const {docId} = useParams()  
  

  const content = useStore((state) => state.document.content)
  const setContent = useStore((state) => state.setDocument)

  


  useEffect(() => {
    if (!divRef.current) return
    if (!quillRef.current) {
      quillRef.current = new Quill(divRef.current,{theme: "snow",modules: {toolbar: toolbarOptions}})
    }
        
  const dataTobackend = () => {
    
    if (debounce.current) clearTimeout(debounce.current)
    try {
      debounce.current = setTimeout(() => {
        (async () => {
        const html = quillRef.current?.root.innerHTML 
        setContent({content:html})
        updateDocs(Number(docId), { content:html })
        })()
      },1000)
    } catch (error) {
      console.error(error)
      alert("error while sending data to backend")
    }
  }
    quillRef.current.on("text-change",dataTobackend)

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change",dataTobackend)
      }
    }
  },[])

useEffect(() => {
      if (quillRef.current && quillRef.current.root.innerHTML !== content) {
        quillRef.current.root.innerHTML = content
      }
  },[content])

  
  return (
    <div ref={divRef}  className='min-h-screen'></div>
  )
}

export default QuillEditor