"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DataTable from "@/components/Tables/DataTable"
import { formatDate, getStatus, renderPostCategories } from '@/utils/utilities'

import { useRequestProcessor } from '@/lib/requestProcessor'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { UseQueryResult, useQueryClient } from 'react-query'

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
    const queryClient = useQueryClient()

    const fetchData = async () => {
        try {
            const response = await axios.get('/posts', {
                headers: {
                    Authorization: `Bearer ${session?.jwt}`,
                },
            });

            if(response.data.statusCode === 200) {
                queryClient.invalidateQueries('post')
            }
            return response.data as {
                statusCode: number;
                posts: Post[];
                message: string;
            };
        } catch (error) {
            console.error('err', error);
            throw error; // Re-throw the error to maintain consistency in error handling
        }
    };

    const { query } = useRequestProcessor();

    const { data, isLoading, isError } = query(
        'posts',
        () => fetchData().then((res) => res.posts),
        { enabled: true }
    );

    const posts = data as Post[];

    if (posts) {
        const postsWithHead = posts.map((post: any, i: number) => ({
            ...post,
            head: {
                title: post.title,
                coverUrl: post?.media.find((media: any) => media?.isCover && media.url)?.url || `/images/cover/cover-01.png`,
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