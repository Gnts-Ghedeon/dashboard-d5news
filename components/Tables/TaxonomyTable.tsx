"use client"

import { useState, useEffect } from 'react'
import CategoryForm from '@/components/forms/CategoryForm'

import Link from 'next/link'
import Image from 'next/image'

type Column = {
    header: string
    accessorKey: string
}

type TaxonomyTableProps = {
    data: any[];
    columns: Column[];
}

const TaxonomyTable = ({ data, columns }: TaxonomyTableProps) => {
    const [currentCategory, setCurrentCategory] = useState<null | any>(null)
    const [modalIsOpen, setModalIsOpen]  = useState<boolean>(false)

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [dataToShow, setDataToShow] = useState<any>(data)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [dataPerPage] = useState<number>(5)

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = dataToShow.slice(indexOfFirstData, indexOfLastData)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    useEffect(() => {
        if (searchTerm.length === 0) {
            setDataToShow(data)
            setCurrentPage(1)
            return
        }

        const filteredData = data.filter((row: any) => {
            const title = row.head.title.toLowerCase()
            const category = row.category.toLowerCase()
            const searchTermLower = searchTerm.toLowerCase()

            return title.includes(searchTermLower) || category.includes(searchTermLower)
        });

        setDataToShow(filteredData)
        setCurrentPage(1)
    }, [searchTerm, data])

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(dataToShow.length / dataPerPage); i++) {
        pageNumbers.push(i)
    }
    
    const goPrevPage = () => {
        const newPage = currentPage - 1
        if(newPage <= 0) {
            setCurrentPage(1)
        } else {
            setCurrentPage(newPage)
        }
    }

    const goNextPage = () => {
        const newPage = currentPage + 1
        if(newPage >= pageNumbers.length) {
            setCurrentPage(pageNumbers.length)
        } else {
            setCurrentPage(newPage)
        }
    }

    return (
        <div className="">
            <div className="flex flex-col">
                <div className="w-full grid grid-cols-3 gap-8">
                    <div className="flex gap-4 items-center col-span-2 mb-4">
                        <button className="flex justify-center rounded bg-primary py-3 px-6 font-medium text-gray hover:bg-opacity-95"
                            onClick={() => setModalIsOpen(true)}
                        >
                            {"Ajouter une catégorie"}
                        </button>
                    </div>
                    <div className="relative col-sapn-1 flex flex-col justify-end pb-4">
                        <div className="absolute top-2.5 right-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 text-gray-500" viewBox="0 0 24 24" fill="none">
                                <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Rechercher..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                        />
                    </div>
                </div>
                <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
                    <div className="py-2 inline-block min-w-full">
                        <div className="overflow-hidden rounded-md">
                            <table className="min-w-full">
                                <thead className="bg-gray-100 whitespace-nowrap dark:bg-gray-900 border-b border-stroke dark:border-strokedark dark:bg-boxdark">
                                    <tr>
                                        {
                                            columns.map((column: Column, i: number) => {
                                                return (
                                                    <th key={i} scope="col" className="font-medium dark:text-white px-6 py-4 text-left">
                                                        {column.header}
                                                    </th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                {
                                    dataToShow.length > 0 && (
                                        <tbody>
                                            {
                                                currentData.map((row: any, rowIndex: number) => (
                                                    <tr key={rowIndex} className="bg-gray-50 dark:bg-gray-800 border-b border-stroke dark:border-strokedark dark:bg-boxdark">
                                                        {columns.map((column: Column, colIndex: number) => {
                                                            if(column.accessorKey === "head") {
                                                                return (
                                                                    <td key={colIndex} className="dark:text-gray-100 px-6 py-4">
                                                                        <Link href="#" className="flex items-center space-x-2">
                                                                            <div className="w-12 h-12 relative">
                                                                                <Image 
                                                                                    src={row[column.accessorKey]?.coverUrl}
                                                                                    fill
                                                                                    alt="Image description"
                                                                                    className="object-cover rounded-md"
                                                                                />
                                                                            </div>
                                                                            <span className="flex-1">{row[column.accessorKey]?.title}</span>
                                                                        </Link> 
                                                                    </td>
                                                                )
                                                            }
                                                            if(column.accessorKey === "actions") {
                                                                return (
                                                                    <td key={colIndex} className="dark:text-gray-100 px-6 py-4">
                                                                        <div className="flex items-center space-x-3.5">
                                                                            <button className="hover:text-primary">
                                                                            <svg
                                                                                className="fill-current"
                                                                                width="18"
                                                                                height="18"
                                                                                viewBox="0 0 18 18"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                                                fill=""
                                                                                />
                                                                                <path
                                                                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                                                fill=""
                                                                                />
                                                                            </svg>
                                                                            </button>
                                                                            <button className="hover:text-primary">
                                                                            <svg
                                                                                className="fill-current"
                                                                                width="18"
                                                                                height="18"
                                                                                viewBox="0 0 18 18"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                                                fill=""
                                                                                />
                                                                                <path
                                                                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                                                fill=""
                                                                                />
                                                                                <path
                                                                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                                                fill=""
                                                                                />
                                                                                <path
                                                                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                                                                fill=""
                                                                                />
                                                                            </svg>
                                                                            </button>
                                                                            <button className="hover:text-primary">
                                                                            <svg
                                                                                className="fill-current"
                                                                                width="18"
                                                                                height="18"
                                                                                viewBox="0 0 18 18"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                                                                                fill=""
                                                                                />
                                                                                <path
                                                                                d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                                                                                fill=""
                                                                                />
                                                                            </svg>
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                )
                                                            }
                                                            return (
                                                                <td key={colIndex} className={(["publish_date"].includes(column.accessorKey) ? "whitespace-nowrap" : "") + " dark:text-gray-100 px-6 py-4"}>
                                                                    {row[column.accessorKey]}
                                                                </td>
                                                            )
                                                        })}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    ) 
                                }
                            </table>
                            {
                                dataToShow.length <= 0 && (
                                    <div className="w-full bg-gray-800 p-6 flex items-center justify-center">
                                        <span className="text-gray-300">Aucune donnée à afficher</span>
                                    </div>
                                )
                            }
                            {
                                dataToShow.length !== 0 && (
                                    <div className="w-full bg-gray-100 dark:bg-gray-900 flex justify-end gap-2 p-2">
                                        <button 
                                            onClick={() => goPrevPage()} 
                                            className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white dark:text-gray-600 "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10" viewBox="0 0 24 24" fill="none">
                                                <path d="M13.75 16.25C13.6515 16.2505 13.5538 16.2313 13.4628 16.1935C13.3718 16.1557 13.2893 16.1001 13.22 16.03L9.72001 12.53C9.57956 12.3894 9.50067 12.1988 9.50067 12C9.50067 11.8013 9.57956 11.6107 9.72001 11.47L13.22 8.00003C13.361 7.90864 13.5285 7.86722 13.6958 7.88241C13.8631 7.89759 14.0205 7.96851 14.1427 8.08379C14.2649 8.19907 14.3448 8.35203 14.3697 8.51817C14.3946 8.68431 14.363 8.85399 14.28 9.00003L11.28 12L14.28 15C14.4205 15.1407 14.4994 15.3313 14.4994 15.53C14.4994 15.7288 14.4205 15.9194 14.28 16.06C14.1353 16.1907 13.9448 16.259 13.75 16.25Z" fill="#000000"/>
                                            </svg>
                                        </button>
                                        {pageNumbers.map((number: number) => (
                                            <button 
                                                key={number} 
                                                onClick={() => paginate(number)} 
                                                className={(currentPage == number ? "dark:bg-gray-800" : "") + " w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white dark:text-gray-600"}
                                            >{number}</button>
                                        ))}
                                        <button 
                                            onClick={() => goNextPage()} 
                                            className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white dark:text-gray-600 "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10" viewBox="0 0 24 24" fill="none">
                                                <path d="M10.25 16.25C10.1493 16.2466 10.0503 16.2227 9.95921 16.1797C9.86807 16.1367 9.78668 16.0756 9.72001 16C9.57956 15.8594 9.50067 15.6688 9.50067 15.47C9.50067 15.2713 9.57956 15.0806 9.72001 14.94L12.72 11.94L9.72001 8.94002C9.66069 8.79601 9.64767 8.63711 9.68277 8.48536C9.71786 8.33361 9.79933 8.19656 9.91586 8.09322C10.0324 7.98988 10.1782 7.92538 10.3331 7.90868C10.4879 7.89198 10.6441 7.92391 10.78 8.00002L14.28 11.5C14.4205 11.6407 14.4994 11.8313 14.4994 12.03C14.4994 12.2288 14.4205 12.4194 14.28 12.56L10.78 16C10.7133 16.0756 10.6319 16.1367 10.5408 16.1797C10.4497 16.2227 10.3507 16.2466 10.25 16.25Z" fill="#000000"/>
                                            </svg>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                modalIsOpen && (
                    <CategoryForm 
                        setModalIsOpen={setModalIsOpen} 
                        category={currentCategory}
                    />
                )
            }
        </div>
    )
}

export default TaxonomyTable