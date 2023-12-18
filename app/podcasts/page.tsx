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

const Podcasts = () => {
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

    const { data: podcasts, isLoading, isError }: UseQueryResult<any | null> = query(
        'podcasts',
        () => fetchData().then((res: any) => res.data.posts),
        { enabled: true }
    )
    if(podcasts) {
        const podcastsWithHead = podcasts.map((post: any, i: number) => ({
            ...post,
            head: {
                title: post.title,
                coverUrl: post.media[0]?.url || `/images/cover/cover-01.png`,
                url: `podcasts/${post.slug}`
            },
            index: i + 1,
            createdAt: formatDate(post.createdAt),
            author: post.author.firstname + " " + post.author.lastname,
            status: getStatus(post.status),
            categories: renderPostCategories(post.categories),
        }))
        return (
            <>
                <Breadcrumb pageName="Tous les podcasts" />
            
                <div className="flex flex-col gap-10">
                    <DataTable 
                        data={podcastsWithHead} 
                        columns={columns} 
                        filters={filters} 
                        searchAttributes={["author", "head"]} 
                        entity="podcasts"
                    />
                </div>
            </>
        )
    }
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error :</p>;
}

export default Podcasts