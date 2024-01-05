"use client"

import { useState, useEffect } from 'react'
import { useRequestProcessor } from '@/lib/requestProcessor'

const PostCategories = ({ post }: { post: any }) => {
    const [showContent, setShowContent] = useState<boolean>(false)
    const [categories, setCategories] = useState<PostCategory[]>([])
    const [categoriesIDs, setCategoriesIDs] = useState<string[]>([])
    const [allCategories, setAllCategories] = useState<PostCategory[]>([])

    useEffect(() => {
        setCategories(post.categories || [])
        setCategoriesIDs(post.categories?.map((cat: any) => cat.id) || [])
    }, [post?.categories])

    const { getCategories } = useRequestProcessor()

    useEffect(() => {
        getCategories()
            .then((res) => {
                setAllCategories(res?.categories)
            })
    }, [])

    const handleRemoveCategory = (category: PostCategory) => {
        setCategories(categories.filter(existingCategory => existingCategory.id !== category.id))
        setCategoriesIDs(categoriesIDs.filter(categoryID => categoryID !== category.id))
    }

    const handleSelectCategory = (category: PostCategory) => {
        const isCategoryExist = categories.some(existingCategory => existingCategory.id === category.id)
    
        if (!isCategoryExist) {
            setCategories([...categories, category])
            setCategoriesIDs([...categoriesIDs, category.id])
        }
    }
    return (
        <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                    Catégories
                </h2>
                <button
                    type="button"
                    className=""
                    onClick={() => setShowContent(!showContent)}
                >
                    <svg className={(showContent ? "rotate-180 " : "") + "h-8 transform "} viewBox="0 0 1792 1792" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" />
                    </svg>
                </button>
            </div>
            <div className="py-4 px-6.5 flex flex-wrap gap-2 border-b border-stroke dark:border-strokedark">
                {
                    showContent && allCategories.length > 0 &&
                    allCategories.map((category: PostCategory, index: number) => {
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSelectCategory(category)}
                                className="px-6 py-2 rounded bg-black"
                            >{category.name}</button>
                        )
                    })
                }
            </div>
            {
                showContent && (
                    <div className="py-4 px-6.5">
                        <p>Catégories sélectionées</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {
                                categories.length > 0 &&
                                categories.map((category: PostCategory, index: number) => {
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleRemoveCategory(category)}
                                            className="px-6 py-2 rounded bg-black"
                                        >{category.name}</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
            <input type="hidden" name="categories" value={JSON.stringify(categoriesIDs)} />
        </div>
    )
}

export default PostCategories