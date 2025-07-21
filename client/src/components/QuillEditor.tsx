// src/components/QuillEditor.tsx
import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import { useStore } from '../store/zustand';
import { useParams } from 'react-router-dom';



export function QuillEditor() {

  const {docId} = useParams()  
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const content = useStore(state=>state.document.content)
  const setContent = useStore(state=>state.setDocument)
  const updateDocs = useStore(state=>state.updateDocs)

  if(!docId){
         alert("does not have Id")
         return null
    }


  useEffect(() => {
    if (!editorRef.current) return;
    if (quillRef.current) return;

    // Initialize Quill only once
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
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

         ['clean']  
        ]
      }
    });

    
    quillRef.current.root.innerHTML = content;

    
    const handler = () => {
      setContent({content:quillRef.current!.root.innerHTML});
    };
    quillRef.current.on('text-change', handler);

    return () => {
      quillRef.current?.off('text-change', handler);
    };
  }, []);

  
  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== content) {
      quillRef.current.root.innerHTML = content;
    }

    const timeout = setTimeout(() => {
    if (docId && content !== undefined) {
      updateDocs(Number(docId), { content });
    }
    }, 1000); // delay in ms

    return () => clearTimeout(timeout);

    // const req =async () => {
    //     const res = await axios.put(`${import.meta.env.VITE_URL}api/v1/document/update/${docId}`,{
            
    //     } , {
    //         headers:{
    //             authorization:sessionStorage.getItem('token')
    //         }
    //     })
    // }
    // req()
  }, [content]);

  return (
    <div className=" flex flex-col h-screen w-screen px-30">
      <div ref={editorRef} className=" bg-white grow border shadow-sm" />
    </div>
  );
}