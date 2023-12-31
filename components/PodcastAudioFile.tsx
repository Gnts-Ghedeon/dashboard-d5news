"use client"

import { ChangeEvent, useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import axios from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { uploadImageToS3, getPresignedUrl } from '@/utils/uploadMedia'
import { getFileType } from '@/utils/utilities'

type PodcastAudioFileProps = {
    file: {
        filename: string;
        filetype: string;
        url: string;
        relatedPost: string;
        postId: string;
    }
}

const PodcastAudioFile = ({ file }: PodcastAudioFileProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewURL, setPreviewURL] = useState<string | null>(null)

    const { data: session } = useSession()

    useEffect(() => {
        
        setPreviewURL(file.url)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            const selected = files[0]
            setSelectedFile(selected)
            const audioURL = URL.createObjectURL(selected)
            setPreviewURL(audioURL)
        }
    }

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const sendMedia = async (media: any) => {
        const response = await axios.patch('/posts/updatePodcastMedia/' + file.relatedPost,
            { media: media, postId: file.postId },
            {
                headers: {
                    Authorization: `Bearer ${session?.jwt}`,
                },
            }
        )

        return response.data
    }

    const handleSave = () => {
        if (selectedFile) {
            getPresignedUrl(selectedFile.name, getFileType(selectedFile.name), session?.jwt ?? "").then(data => {
                uploadImageToS3(data, selectedFile).then((response: any) => {
                    sendMedia({
                        name: selectedFile.name,
                        url: process.env.NEXT_PUBLIC_CLOUD_URL + '/' + selectedFile.name,
                        type: getFileType(selectedFile.name)
                    })
                        .then(data => {
                            console.log('data', data)
                        })
                })
            })
        }
        else if (!previewURL && file.url !== "") {
            sendMedia(null)
                .then(data => {
                    console.log('data', data)
                })
        }
        else {
            sendMedia({
                name: file.filename,
                url: process.env.NEXT_PUBLIC_CLOUD_URL + '/' + file.filename,
                type: getFileType(file.filename),
                isCover: true
            })
                .then(data => {
                    console.log('data', data)
                })
        }
    }
    return (
        <>
            <input
                ref={inputRef}
                type="file"
                name="audioPodcast"
                accept=".mp3,.wav,.aac,.flac,.aiff,.ogg,.wma,.alac,.pcm,.dsd,.midi,.ape,.m4a"
                onChange={handleFileUpload}
                className="hidden"
            />
            {
                previewURL
                    ? (
                        <div className="relative h-24 group w-full">
                            <audio
                                className="w-full mb-5"
                                src={previewURL}
                                controls
                            />
                            <div className="hidden group-hover:block absolute w-full bottom-0 bg-black">
                                <button
                                    className="px-4 py-2 text-center w-full text-sm text-danger"
                                    onClick={() => setPreviewURL(null)}
                                >Supprimer</button>
                            </div>
                        </div>
                    )
                    : (
                        <div className="relative block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4">
                            <div onClick={handleClick} className="flex items-center justify-center space-x-2">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                            fill="#3C50E0"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                            fill="#3C50E0"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                            fill="#3C50E0"
                                        />
                                    </svg>
                                </span>
                                <p className="text-center">
                                    <span className="text-primary text-sm">Selectionner un fichier</span>
                                </p>
                            </div>
                        </div>
                    )
            }
            {/* <div className="flex justify-end gap-4.5 mt-4">
                <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                    type="button"
                    onClick={handleSave}
                >
                    Enregistrer
                </button>
            </div> */}
        </>
    )
}

export default PodcastAudioFile