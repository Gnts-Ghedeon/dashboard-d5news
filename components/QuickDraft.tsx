"use client"

import axios from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const QuickDraft = () => {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const { data: session } = useSession()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formElement = e.target as HTMLFormElement
        const formData = new FormData(formElement)
        const formValues: any = Object.fromEntries(formData)

        formValues.categories = []
        formValues.continents = []

        const response = await axios.post('/posts', formValues, {
            headers: {
                Authorization: `Bearer ${session?.jwt}`,
            },
        })
        console.log('response', response);
        
        if(response.status === 201) {
            setTitle("")
            setContent("")
            toast.success("Brouillon enregistré avec success !")
        }
        return response.data
    }
    return (
        <div className="rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Brouillon rapide
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5">
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                        Titre
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder=""
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                        Contenu
                    </label>
                    <textarea
                        rows={6}
                        name="content"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Qu'avez-vous en tête ?"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                </div>
                <button
                    className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    type="submit"     
                >
                    Enregistrer en brouillon
                </button>
            </form>
        </div>
    )
}

export default QuickDraft