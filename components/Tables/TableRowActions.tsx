"use client"

import { useState, useEffect, useRef } from 'react'
import { useOutsideClick } from '@/utils/utilities'
import axios from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from 'react-query'
import Link from 'next/link'

type TableRowActionsProps = {
    row: any;
    entity: string;
}

const TableRowActions = ({ row, entity }: TableRowActionsProps) => {
    const { data: session } = useSession()
    const queryClient = useQueryClient()

    const [showActions, setShowActions] = useState<boolean>(false)
    const actionsRef = useRef(null)

    useOutsideClick(actionsRef, () => {
        setShowActions(false)
    })


    const deleteEntityInstance = async (row: any) => {
        const response = await axios.delete(
            `/${entity}/${row.id}`, 
            {
                headers: {
                    Authorization: `Bearer ${session?.jwt}`
                }
            }
        )
        return response
    }

    const { mutate } = useMutation(deleteEntityInstance, {
        onSuccess: () => {
            queryClient.invalidateQueries(entity)
            setShowActions(false)
        },
    })

    const handleDelete = () => {
        mutate(row)
    }

    return (
        <td  className="dark:text-gray-100 py-4 pr-4">
            {
                showActions && (
                    <div
                        ref={actionsRef}
                        className="absolute divide-y divide-gray/10 right-2 -mt-8 flex flex-col rounded-lg border border-stroke bg-white shadow-lg  dark:border-strokedark dark:bg-boxdark"
                    >
                        {
                            entity === "comments" && (
                                <>
                                <button
                                    className="px-8 py-3 flex items-center justify-center bg-graydark hover:opacity-80 gap-x-1.5 text-success"
                                    // onClick={() => handleUpdateCommentStatus(row)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5" viewBox="0 0 24 24" fill="none">
                                        <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                    <span>Approuver le co...</span>
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-8 py-3 flex items-center justify-center bg-graydark hover:opacity-80 gap-x-1.5 text-danger"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5" viewBox="0 0 24 24" fill="none">
                                        <path d="M5.73708 6.54391V18.9857C5.73708 19.7449 6.35257 20.3604 7.11182 20.3604H16.8893C17.6485 20.3604 18.264 19.7449 18.264 18.9857V6.54391M2.90906 6.54391H21.0909" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                                        <path d="M8 6V4.41421C8 3.63317 8.63317 3 9.41421 3H14.5858C15.3668 3 16 3.63317 16 4.41421V6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                                    </svg>
                                    <span>Rejeter le com...</span>
                                </button>
                                </>
                            )
                        }
                        {
                            entity !== "comments" && (
                                <>
                                <Link
                                    href={"/" + entity + "/" + row.id}
                                    className="px-8 py-3 flex items-center justify-center bg-graydark hover:opacity-80 gap-x-1.5 text-primary"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5" viewBox="0 0 24 24">
                                        <g id="Complete"><g id="edit"><g>
                                        <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                        <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                        </g></g></g>
                                    </svg>
                                    <span>Modifier</span>
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="px-8 py-3 flex items-center justify-center bg-graydark hover:opacity-80 gap-x-1.5 text-danger"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5" viewBox="0 0 24 24" fill="none">
                                        <path d="M5.73708 6.54391V18.9857C5.73708 19.7449 6.35257 20.3604 7.11182 20.3604H16.8893C17.6485 20.3604 18.264 19.7449 18.264 18.9857V6.54391M2.90906 6.54391H21.0909" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                                        <path d="M8 6V4.41421C8 3.63317 8.63317 3 9.41421 3H14.5858C15.3668 3 16 3.63317 16 4.41421V6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                                    </svg>
                                    <span>Supprimer</span>
                                </button>
                                </>
                            )
                        }
                    </div>
                )
            }
            <button
                className="mt-2 w-full h-full flex items-center justify-center"
                onClick={() => setShowActions(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8" viewBox="0 0 24 24" fill="none">
                    <path d="M18 12H18.01M12 12H12.01M6 12H6.01M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM19 12C19 12.5523 18.5523 13 18 13C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11C18.5523 11 19 11.4477 19 12ZM7 12C7 12.5523 6.55228 13 6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11C6.55228 11 7 11.4477 7 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </td>
    )
}

export default TableRowActions