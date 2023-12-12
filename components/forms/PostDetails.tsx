"use client"

import { useState, useEffect } from 'react'
import { Editor } from "@tinymce/tinymce-react"
import axios from 'axios'


type PostDetailsProps = {
    post: {
        title: string;
        content: string;
    }
}

const PostDetails = ({ post }: PostDetailsProps) => {
    const [titleValue, setTitleValue] = useState<string>("")
    const [contentValue, setContentValue] = useState<string>("")

    useEffect(() => {
        setTitleValue(post?.title)
        setContentValue(post?.content)
    }, [post])

    const imageUploadHandler = async (blobInfo, progress, failure) => {
        const formData = new FormData();
        formData.append('file', blobInfo.blob());
        console.log('blob', blobInfo.blob());
        console.log('filename', blobInfo.filename());
        
    
        const response = await axios.post('/upload', formData);
    
        console.log('response', response);
        
        // if (response.status === 200) {
        //   const image = {
        //     id: response.data.id,
        //     src: response.data.src,
        //   }
        // }
    }

    const removeBase64 = (content: string) => {
        const imageExtension = "(jpeg|png|jpg|gif)"
        const regex = new RegExp(/<img src="data:image\/(.*?);base64,(.*?)(">?)/g)
        return content.replace(regex, "")
    }
    return (
        <div className="flex flex-col gap-5.5 p-6.5">
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    {"Titre de l'article"}
                </label>
                <input
                    type="text"
                    placeholder=""
                    name="title"
                    onChange={(e) => setTitleValue(e.target.value)}
                    value={titleValue}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Contenu
                </label>
                <Editor
                    apiKey="gl87curmda8pcaaf405vxag18xxr63deqfkcbma0ynean5wn"
                    value={contentValue}
                    init={{
                        language: "fr_FR",
                        height: 500,
                        branding: false,
                        image_advtab: true,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        images_upload_handler: imageUploadHandler,
                        images_upload_url:"/upload"
                    }}
                    textareaName="content"
                    onEditorChange={(newValue, editor) => {
                        // setContentValue(removeBase64(newValue)),
                        setContentValue(newValue),
                        console.log('content', newValue);
                        
                    }}
                />
            </div>
        </div>
    )
}

export default PostDetails