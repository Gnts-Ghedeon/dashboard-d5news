"use client"

import { useState } from 'react'

import { useMutation, useQueryClient } from 'react-query'
import axios from '@/lib/axios'
import { useSession } from 'next-auth/react'

type CategoryFormProps = {
    setModalIsOpen: void;
}

const CategoryForm = ({ setModalIsOpen }) => {
    const { data: session } = useSession()

    const [nameValue, setNameValue] = useState<string>("")
    const [descriptionValue, setDescriptionValue] = useState<string>("")

    const queryClient = useQueryClient()

    const createPostCategory = async (categoryData) => {
        const response = await axios.post('/admin/post-categories', categoryData, {
            headers: {
                Authorization: `Bearer ${session.jwt}`,
            },
        })
        return response.data
    }

    const { mutate } = useMutation(createPostCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('post-categories')
            setModalIsOpen(false)
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const name = e.currentTarget.name.value
        const description = e.currentTarget.description.value

        let category = {
            name: name,
            description: description,
        }

        mutate(category)
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-9999 flex items-center justify-center">
            <div className="w-full max-w-xl rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        Ajouter une catégorie
                    </h2>
                    <button
                        onClick={() => setModalIsOpen(false)}
                        className="text-2xl"
                        >&times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}  className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Titre
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            name="name"
                            onChange={(e) => setNameValue(e.target.value)}
                            value={nameValue}
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Image de couverture
                        </label>
                        <input
                            type="file"
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Description
                        </label>
                        <textarea
                            rows={6}
                            placeholder="Décrivez la catégorie"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            name="description"
                            onChange={(e) => setDescriptionValue(e.target.value)}
                            value={descriptionValue}
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-4.5">
                        <button
                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="button"
                            onClick={() => setModalIsOpen(false)}
                        >
                            Annuller
                        </button>
                        <button
                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                            type="submit"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryForm