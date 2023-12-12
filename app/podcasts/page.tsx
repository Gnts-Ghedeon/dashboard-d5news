import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DataTable from "@/components/Tables/DataTable"

import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
}

type Column = {
    header: string
    accessorKey: string
}

type Data = {
    id: number;
    head: {
        title: string;
        coverUrl: string;
        url: string;
    };
    category: string;
    duration: string;
    publish_date: string;
    author: string;
}

type Option = {
    value: string;
    label: string;
}

type Filter = {
    name: string;
    label: string;
    placeholder: string;
    options: Option[]
}

const data: Data[] = [
    {
        id: 1,
        head: {
            title: 'African Fashion Education: The role of the African',
            coverUrl: '/images/cover/cover-01.png',
            url: '/podcasts/1'
        },
        category: "Economie",
        publish_date: "20 Octobre 2023",
        author: "John Doe",
        duration: "00h10m00s"
    },
    {
        id: 2,
        head: {
            title: 'African Fashion Education: The role of the African',
            coverUrl: '/images/cover/cover-01.png',
            url: '/podcasts/1'
        },
        category: "Musique",
        publish_date: "20 Octobre 2023",
        author: "John Doe",
        duration: "00h10m00s"
    },
    {
        id: 3,
        head: {
            title: 'African Fashion Education: The role of the African',
            coverUrl: '/images/cover/cover-01.png',
            url: '/podcasts/1'
        },
        category: "Education",
        publish_date: "20 Octobre 2023",
        author: "John Doe",
        duration: "00h10m00s"
    },
    {
        id: 4,
        head: {
            title: 'African Fashion Education: The role of the African',
            coverUrl: '/images/cover/cover-01.png',
            url: '/podcasts/1'
        },
        category: "Politique",
        publish_date: "20 Octobre 2023",
        author: "John Doe",
        duration: "00h10m00s"
    },
    {
        id: 5,
        head: {
            title: 'African Fashion Education: The role of the African',
            coverUrl: '/images/cover/cover-01.png',
            url: '/podcasts/1'
        },
        category: "Politique",
        publish_date: "20 Octobre 2023",
        author: "John Doe",
        duration: "00h10m00s"
    },
    {
        id: 6,
        head: {
            title: 'African Fashion Education: The role of the African',
            coverUrl: '/images/cover/cover-01.png',
            url: '/podcasts/1'
        },
        category: "Politique",
        publish_date: "20 Octobre 2023",
        author: "John Doe",
        duration: "00h10m00s"
    },
]

const columns: Column[] = [
    {
        header: "#",
        accessorKey: "id"
    },
    {
        header: "Titre de l'article",
        accessorKey: "head"
    },
    {
        header: "Categorie",
        accessorKey: "category"
    },
    {
        header: "Date",
        accessorKey: "publish_date"
    },
    {
        header: "Auteur/autrice",
        accessorKey: "author"
    },
    {
        header: "Durée",
        accessorKey: "duration"
    },
    {
        header: "Actions",
        accessorKey: "actions"
    },
]

const filters: Filter[] = [
    {
        name: "status",
        label: "Statuts",
        placeholder: "Selectionner un statut",
        options: [
            {
                value: "draft",
                label: "Brouillon",
            },
            {
                value: "published",
                label: "Publié",
            },
            {
                value: "brouillon",
                label: "Brouillon",
            }
        ]
    },
    {
        name: "category",
        label: "Categories",
        placeholder: "Selectionner une categorie",
        options: [
            {
                label: "Economie",
                value: "economie"
            },
            {
                label: "Internationnal",
                value: "internationnal"
            },
            {
                label: "Education",
                value: "education"
            }
        ]
    }
]

const Posts = () => {
    return (
        <>
            <Breadcrumb pageName="Tous les podcasts" />
        
            <div className="flex flex-col gap-10">
                <DataTable 
                    data={data} 
                    columns={columns} 
                    filters={filters} 
                    searchAttributes={[]} 
                    entity="podcasts"
                />
            </div>
        </>
    )
}

export default Posts