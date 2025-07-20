
import React, { useState } from 'react';
import { QuillEditor } from '../components/QuillEditor';
import Navbar from '../components/Navbar';

const Document = ()=>{

    const [content, setContent] = useState('<p>Start writing…</p>');

  const handleSubmit = () => {
    console.log('HTML:', content);
    // send `content` to your backend…
  };
    return (
    <div className="p-4 space-y-4 flex flex-col h-screen w-screen">
        <Navbar></Navbar>
      <QuillEditor value={content} onChange={setContent} />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded w-30"
      >
        Save
      </button>
    </div>
    )
}

export default Document