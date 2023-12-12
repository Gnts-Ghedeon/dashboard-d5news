"use client"

import React, { useState, useEffect, useRef } from 'react'
import TableRowActions from '@/components/Tables/TableRowActions'

import Link from 'next/link'
import Image from 'next/image'

type Column = {
    header: string
    accessorKey: string
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

type SelectedFilter = {
    name: string;
    value: string;
}

type DataTableProps = {
    data: any;
    columns: Column[];
    filters: Filter[];
    entity: string;
    searchAttributes: string[];
}

const DataTable = ({ data, columns, filters, entity, searchAttributes }: DataTableProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([])
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
            if(!searchAttributes || searchAttributes.length <= 0) return

            let matched = false
            searchAttributes.forEach(attribute => {
                const lowerSearchTerm = searchTerm.toLowerCase()

                if(typeof row[attribute] === 'object') {
                    const title = row[attribute].title.toLowerCase()
                    if(row[attribute] !== null && attribute === "head" && title.includes(lowerSearchTerm)) {
                        matched = true
                    }
                }
                else {
                    const foundWord = row[attribute].toLowerCase()
                    if(row[attribute] && foundWord.includes(lowerSearchTerm)) {
                        matched = true
                    }
                }
            })
            return matched
        })

        setDataToShow(filteredData)
        setCurrentPage(1)
    }, [searchTerm, data, searchAttributes])

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

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value }: { name: string; value: string } = e.target;
    
        const existingFilterIndex = selectedFilters.findIndex(
            (filter) => filter.name === name
        );
    
        if (existingFilterIndex !== -1) {
            const updatedFilters = [...selectedFilters];
            updatedFilters[existingFilterIndex] = { name, value };
            setSelectedFilters(updatedFilters);
        } else {
            setSelectedFilters([...selectedFilters, { name, value }]);
        }
    }
    
    useEffect(() => {
        if (selectedFilters.length === 0) {
            setDataToShow(data)
            return;
        }
    
        const filteredData = data.filter((row: any) => {
            return selectedFilters.every((filter) => {
                const { name, value } = filter
    
                if (name in row) {
                    const fieldValue = row[name]?.value?.toString()?.toLowerCase()
                    return fieldValue === value?.toString()?.toLowerCase()
                }
                return false
            })
        })
    
        setDataToShow(filteredData)
        
    }, [selectedFilters, data]) 

    return (
        <div className="relative">
            <div className="flex flex-col">
                <div className="w-full grid grid-cols-3 gap-8">
                    <div className="flex gap-4 items-center col-span-2">
                        {
                            filters.length > 0 && filters.map((filter, index: number) => {
                                return (
                                    <div key={index} className="mb-4.5 w-1/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            {filter.label}
                                        </label>
                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                name={filter.name}
                                                onChange={handleFilterChange}
                                            >
                                                <option value="">{filter.placeholder}</option>
                                                {filter.options.map((option, index: number) => {
                                                    return (
                                                    <option key={index} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                    )
                                                })}
                                            </select>

                                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                <svg
                                                    className="fill-current"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                        fill=""
                                                    ></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {filters.length > 0 && (
                            <button className="mt-4" onClick={() => {
                                setSelectedFilters([])
                                const selectElements = document.querySelectorAll("select")
                                selectElements.forEach((select) => {
                                    select.value = ""
                                })
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6" viewBox="0 0 1920 1920">
                                    <path d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0" fillRule="evenodd"/>
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="relative col-sapn-1 flex flex-col justify-end pb-4">
                        <div className="absolute top-[45px] right-3">
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
                                <thead className="bg-gray-100 dark:bg-gray-900 border-b border-stroke dark:border-strokedark dark:bg-boxdark">
                                    <tr>
                                        {
                                            columns.map((column: Column, i: number) => {
                                                return (
                                                    <th key={i} scope="col" className="font-medium dark:text-white px-6 py-4 text-left whitespace-nowrap">
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
                                                                        <Link href={row[column.accessorKey]?.url} className="flex items-center space-x-2">
                                                                            {row[column.accessorKey]?.coverUrl && <div className="w-12 h-12 relative rounded-full overflow-hidden">
                                                                                <Image 
                                                                                    src={row[column.accessorKey]?.coverUrl}
                                                                                    fill
                                                                                    alt="Image description"
                                                                                    className="object-cover rounded-md"
                                                                                />
                                                                            </div>}
                                                                            <span className="flex-1">{row[column.accessorKey]?.title}</span>
                                                                        </Link> 
                                                                    </td>
                                                                )
                                                            }
                                                            if(typeof row[column.accessorKey] === 'object' && row[column.accessorKey] !== null && column.accessorKey !== "head") {
                                                                return (
                                                                    <td key={colIndex} className={(["publish_date"].includes(column.accessorKey) ? "whitespace-nowrap" : "") + " dark:text-gray-100 px-6 py-4"}>
                                                                        {row[column.accessorKey]?.label}
                                                                    </td>
                                                                )
                                                            }
                                                            if(column.accessorKey === "actions") {
                                                                return (
                                                                    <TableRowActions
                                                                        key={colIndex}
                                                                        row={row}
                                                                        entity={entity}
                                                                    />
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
                                dataToShow.length > dataPerPage && (
                                    <div className="w-full bg-gray-100 dark:bg-gray-900 flex justify-end gap-2 p-2 mt-4">
                                        <button 
                                            onClick={() => goPrevPage()} 
                                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white dark:text-gray-600 "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10" viewBox="0 0 24 24" fill="none">
                                                <path d="M13.75 16.25C13.6515 16.2505 13.5538 16.2313 13.4628 16.1935C13.3718 16.1557 13.2893 16.1001 13.22 16.03L9.72001 12.53C9.57956 12.3894 9.50067 12.1988 9.50067 12C9.50067 11.8013 9.57956 11.6107 9.72001 11.47L13.22 8.00003C13.361 7.90864 13.5285 7.86722 13.6958 7.88241C13.8631 7.89759 14.0205 7.96851 14.1427 8.08379C14.2649 8.19907 14.3448 8.35203 14.3697 8.51817C14.3946 8.68431 14.363 8.85399 14.28 9.00003L11.28 12L14.28 15C14.4205 15.1407 14.4994 15.3313 14.4994 15.53C14.4994 15.7288 14.4205 15.9194 14.28 16.06C14.1353 16.1907 13.9448 16.259 13.75 16.25Z" fill="currentColor"/>
                                            </svg>
                                        </button>
                                        {pageNumbers.map((number: number) => (
                                            <button 
                                                key={number} 
                                                onClick={() => paginate(number)} 
                                                className={(currentPage == number ? "text-white bg-graydark cursor-default" : "bg-primary text-white dark:text-gray-600") + " w-8 h-8 text-sm rounded-lg flex items-center justify-center"}
                                            >{number}</button>
                                        ))}
                                        <button 
                                            onClick={() => goNextPage()} 
                                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white dark:text-gray-600 "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10" viewBox="0 0 24 24" fill="none">
                                                <path d="M10.25 16.25C10.1493 16.2466 10.0503 16.2227 9.95921 16.1797C9.86807 16.1367 9.78668 16.0756 9.72001 16C9.57956 15.8594 9.50067 15.6688 9.50067 15.47C9.50067 15.2713 9.57956 15.0806 9.72001 14.94L12.72 11.94L9.72001 8.94002C9.66069 8.79601 9.64767 8.63711 9.68277 8.48536C9.71786 8.33361 9.79933 8.19656 9.91586 8.09322C10.0324 7.98988 10.1782 7.92538 10.3331 7.90868C10.4879 7.89198 10.6441 7.92391 10.78 8.00002L14.28 11.5C14.4205 11.6407 14.4994 11.8313 14.4994 12.03C14.4994 12.2288 14.4205 12.4194 14.28 12.56L10.78 16C10.7133 16.0756 10.6319 16.1367 10.5408 16.1797C10.4497 16.2227 10.3507 16.2466 10.25 16.25Z" fill="currentColor"/>
                                            </svg>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataTable