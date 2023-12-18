"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DataTable from "@/components/Tables/DataTable"
import { formatDate, getStatus, renderPostCategories } from '@/utils/utilities'

import { useRequestProcessor } from '@/lib/requestProcessor'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { UseQueryResult } from 'react-query'
 
type TableColumn = {
    header: string
    accessorKey: string
}

type FilterOption = {
    value: string;
    label: string;
}

type Filter = {
    name: string;
    label: string;
    placeholder: string;
    options: FilterOption[]
}

const columns: TableColumn[] = [
    {
        header: "#",
        accessorKey: "index"
    },
    {
        header: "Titre de l'article",
        accessorKey: "head"
    },
    {
        header: "Categories",
        accessorKey: "categories"
    },
    {
        header: "Statut",
        accessorKey: "status"
    },
    {
        header: "Date",
        accessorKey: "createdAt"
    },
    {
        header: "Auteur/autrice",
        accessorKey: "author"
    },
    {
        header: "Actions",
        accessorKey: "actions"
    },
]

let filters: Filter[] = [
    {
        label: "Statuts",
        name: "status",
        placeholder: "Selectionner un statut",
        options: [
            {
                label: "Brouillon",
                value: "draft"
            },
            {
                label: "Publié",
                value: "published"
            },
            {
                label: "En attente de validation",
                value: "pending"
            },
            {
                label: "Rejeté",
                value: "rejected"
            },
            {
                label: "Archivé",
                value: "archived"
            }
        ]
    }
]

const Posts = () => {
    const { data: session } = useSession()

    const fetchData = async () => {
        try {
            const response = await axios.get(
                '/posts', 
                {
                    headers: {
                        Authorization: `Bearer ${session?.jwt}`
                    }
                }
            )
            return response
        } catch (error) {
            console.error('err', error)
        }
    }

    const { query, getCategories } = useRequestProcessor()

    const { data: posts, isLoading, isError }: UseQueryResult<any | null> = query(
        'posts',
        () => fetchData().then((res: any) => res.data.posts),
        { enabled: true }
    )

    // const [catsSetted, setCatsSetted] = useState<boolean>(false)
    // useEffect(() => {
    //     if(catsSetted) return
    //     getCategories().then((res) => {
    //         setCatsSetted(true)
    //         let categories = res.categories.map((cat: any) => {
    //             return {
    //                 label: cat.name,
    //                 value: cat.id
    //             }
    //         })
    //         const categoriesFilter: Filter = {
    //             label: "Categories",
    //             name: "category",
    //             placeholder: "Selectionner une categorie",
    //             options: categories
    //         }
            
    //         filters.push(categoriesFilter)
    //     })
    // }, [catsSetted, getCategories])

    

    if(posts) {
        const postsWithHead = posts.map((post: any, i: number) => ({
            ...post,
            head: {
                title: post.title,
                coverUrl: post.media[0]?.url || `/images/cover/cover-01.png`,
                url: `posts/${post.slug}`
            },
            index: i + 1,
            createdAt: formatDate(post.createdAt),
            author: post.author.firstname + " " + post.author.lastname,
            status: getStatus(post.status),
            categories: renderPostCategories(post.categories),
        }))
        return (
            <>
                <Breadcrumb pageName="Tous les articles" />
            
                <div className="flex flex-col gap-10">
                    <DataTable 
                        data={postsWithHead} 
                        columns={columns} 
                        filters={filters} 
                        entity="posts"
                        searchAttributes={["author", "head"]} 
                    />
                </div>
            </>
        )
    }
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error :</p>;
}

export default Posts