"use client"
import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import { v4 as uuidv4 } from 'uuid';
import 'quill/dist/quill.snow.css';

function base64ToBlob(base64String: string) {
  const parts = base64String.split(';base64,');
  const type = parts[0]?.split('/')[1];
  const bytes = window?.atob(parts[1]);
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
    const file = new File([blobData], id + '.' + extension, { type: blobData.type });
    console.log("Here is my file")
    console.log(file)
    return { file, filename: id + '.' + extension };
  } else {
    console.error('Blob URL not found in the provided string');
    return null;
  }
}


const QuillEditorComponent = ({ post, addMediaToPostMediaFiles }: { post: Post | null, addMediaToPostMediaFiles: (file: File) => void; }) => {
  const [contentValue, setContentValue] = useState<string>(post?.content || "")
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  if (Quill && !quill) {
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(post?.content || "")
      quill.on('text-change', async (_, oldContents) => {

        const delta = quill.getContents();
        const images = delta?.ops?.filter((op) => op.insert && op.insert.image)
          .map((op) => op.insert.image)

        let imageElements: any[] = []
        let extensions: any[] = []

        images?.forEach((image, index) => {
          const mediaType = images[index]?.split(';')[0];
          const extension = mediaType?.split('/')[1];
          extensions.push(extension)

          const selection = quill.getSelection();
          if (selection) {
            const blob = base64ToBlob(image);
            const data = createImageElement(blob);
            imageElements[index] = data;
          }
        });

        let files: File[] = [];

        if (imageElements.length > 0) {
          let content = quill.root.innerHTML;
          let contentSegments = content.split('<img');
          console.log('contentSegments', contentSegments);
          
          for (let index = 0; index < imageElements.length; index++) {
            console.log("Current file: ", imageElements[index])
            console.log("Current extension: ", extensions[index])
            const imageElement = imageElements[index];
            const res = await extractBlobAndCreateFile(imageElement, extensions[index]);
            if (res?.file) {
              addMediaToPostMediaFiles(res.file)
              // Replace the data URL in the current segment
              contentSegments[index + 1] = contentSegments[index + 1].replace(/src="data:([^"]+)"/, `src="${process.env.NEXT_PUBLIC_CLOUD_URL}/${res.filename}"`);
            }
          }
          // Reconstruct the content
          content = contentSegments.join('<img');
          setContentValue(content)
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, Quill, post]);

  return (
    <>
      <div className='bg-white text-black h-96 pb-[42px]'>
        <div ref={quillRef} />
      </div>
      <input type="hidden" name="content" value={contentValue} />
    </>
  )
};

export default QuillEditorComponent;
