"use client"

import { useEffect, useState } from 'react'
import QuillComponent from '../QuillComponent/QuillComponent';

type PostDetailsProps = {
    post: Post | null,
    removeMediaFromPostMediaFiles: (file: File) => void;
    addMediaToPostMediaFiles: (file: File) => void;
}

type SelectedMedia = {
    key: string;
    file: File;
}

const PostDetails = ({ post, addMediaToPostMediaFiles, removeMediaFromPostMediaFiles }: PostDetailsProps) => {
    const [titleValue, setTitleValue] = useState<string>("")

    useEffect(() => {
        setTitleValue(post?.title || "")
    }, [post])
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
                <QuillComponent post={post} addMediaToPostMediaFiles={addMediaToPostMediaFiles} />
            </div>
        </div>
    )
}

export default PostDetails