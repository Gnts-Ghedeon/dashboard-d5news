"use client"
import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import { v4 as uuidv4 } from 'uuid';
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

async function extractBlobAndCreateFile(imageElement: HTMLImageElement, extension: string | null) {
  const imageUrl = imageElement.src
  console.log("imageUrl")
  if (imageUrl) {
    // Fetch Blob data
    const response = await fetch(imageUrl);
    const blobData = await response.blob();

    // Create File
    const id = uuidv4();
    const file = new File([blobData], id + + '.' + extension, { type: blobData.type });
    console.log("Here is my file")
    console.log(file)
    return file;
  } else {
    console.error('Blob URL not found in the provided string');
    return null;
  }
}


const QuillEditorComponent = ({ post }: { post: Post | null }) => {
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
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

        console.log("newImages")
        let extension = null
        if (newImages) {
          const mediaType = newImages[0].split(';')[0];
          extension = mediaType.split('/')[1];
        }

        let imageElement = null

        newImages?.forEach((image) => {
          const selection = quill.getSelection();
          if (selection) {
            const position = selection.index; // Access the 'index' property
            const blob = base64ToBlob(image);
            const data = createImageElement(blob);
            imageElement = data;
          }
        });

        let file;
        if (imageElement) {
          extractBlobAndCreateFile(imageElement, extension).then((res) => {
            file = res;
            console.log("file")
            console.log(file)
          })
        }
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
