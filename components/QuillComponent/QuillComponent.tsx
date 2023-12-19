"use client"
import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';


function base64ToBlob(base64String: string) {
  const parts = base64String.split(';base64,');
  const type = parts[0].split('/')[1];
  const bytes = window.atob(parts[1]);
  const byteArrays = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    byteArrays[i] = bytes.charCodeAt(i);
  }
  const blob = new Blob([byteArrays], { type });
  return blob;
}
function createImageElement(blob: Blob | MediaSource) {
  const imageUrl = URL.createObjectURL(blob);
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  return imageElement;
}

const QuillEditorComponent = ({ post }: { post: Post | null }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  if (Quill && !quill) {
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldContents) => {
        console.log('Text change!');
        console.log(delta);

        const newImages = delta.ops?.filter((op) => op.insert && op.insert.image)
          .map((op) => op.insert.image);

        newImages?.forEach((image) => {
          const selection = quill.getSelection();
          if (selection) {
            const position = selection.index; // Access the 'index' property
            const blob = base64ToBlob(image);
            const imageElement = createImageElement(blob);
            quill.insertEmbed(position, 'image', imageElement.src);
          }
        });
        
        console.log("newImages")
        console.log(newImages)
        // Add new images to the existing uploaded images
        if (newImages)
          setUploadedImages((prevImages) => [...prevImages, ...newImages]);
        console.log("UploadedImages")
        console.log(uploadedImages)

        let currrentContents = quill.getContents();
        console.log(currrentContents.diff(oldContents));
      });
    }
  }, [quill, Quill]);

  return (
    <div className='bg-white text-black'>
      <div ref={quillRef} />
    </div>
  )
};

export default QuillEditorComponent;
