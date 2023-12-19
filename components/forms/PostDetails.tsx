"use client"

import { useState } from 'react'
import QuillComponent from '../QuillComponent/QuillComponent';
import { LexicalEditor } from 'lexical';
import LexicalEditorComponent from '../QuillComponent/QuillComponent';

type PostDetailsProps = {
    post: Post | null,
    setPostMedia: (medias: any[]) => void;
}

type SelectedMedia = {
    key: string;
    file: File;
}

const PostDetails = ({ post, setPostMedia }: PostDetailsProps) => {
    const [titleValue, setTitleValue] = useState<string>(post?.title ?? "")

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
                <QuillComponent post={post} />
            </div>
        </div>
    )
}

export default PostDetails