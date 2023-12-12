"use client"

import { useState } from 'react'

type PostTagsProps = {
    tags: any
}

const PostTags = ({ tags }: PostTagsProps) => {
    const [showContent, setShowContent] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
    return (
        <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                    Etiquettes
                </h2>
                <button 
                    type="button"
                    className=""
                    onClick={() => setShowContent(!showContent)}
                >
                    <svg className={(showContent ? "rotate-180 " : "") + "h-8 transform "} viewBox="0 0 1792 1792" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/>
                    </svg>
                </button>
            </div>
            <div className="py-4 px-6.5 flex flex-wrap gap-2">
                {
                    showContent && (
                        <>
                            {
                                tags && tags.length > 0 && 
                                tags.split(',').map((tag: any, index: number) => {
                                    return (
                                        <span 
                                            key={index}
                                            className="px-3 py-1 rounded bg-black"
                                        >#{tag.trim()}</span>
                                    )
                                })
                            }
                            <div className="w-full">
                                <label className="mb-3 block text-black dark:text-white">
                                    {"Entrez une liste d'étiquettes séparées par des virgules"}
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder=""
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                            </div>
                        </>
                    )
                }
                <input type="hidden" name="tags" value={inputValue} />
            </div>
        </div>
    )
}

export default PostTags