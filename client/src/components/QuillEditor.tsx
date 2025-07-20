// src/components/QuillEditor.tsx
import React, { useRef, useEffect } from 'react';
import Quill from 'quill';

interface QuillEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export function QuillEditor({ value, onChange }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (quillRef.current) return;

    // Initialize Quill only once
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean']
        ]
      }
    });

    // Set initial content
    quillRef.current.root.innerHTML = value;

    // Listen for changes
    const handler = () => {
      onChange(quillRef.current!.root.innerHTML);
    };
    quillRef.current.on('text-change', handler);

    return () => {
      quillRef.current?.off('text-change', handler);
    };
  }, []);

  // If `value` prop changes externally, update the editor
  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== value) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div className=" flex flex-col h-screen w-screen px-30">
      <div ref={editorRef} className=" bg-white grow border  shadow-sm" />
    </div>
  );
}