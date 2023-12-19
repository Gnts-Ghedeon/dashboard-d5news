"use client"

import { useEffect } from 'react'

import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export const generatePass = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export const formatDate = (dateString: string) => {
    return format(
        new Date(dateString),
        "dd MMMM yyyy, HH'h'mm",
        { locale: fr }
    )
}

export const useOutsideClick = (ref: React.RefObject<any>, callback: () => void) => {
    const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    })
}

export const getStatus = (status: string) => {
    switch (status) {
        case "DRAFT":
            return {
                label: "Brouillon",
                value: "draft"
            }
        case "PUBLISHED":
            return {
                label: "Publié",
                value: "published"
            }
        case "PENDING":
            return {
                label: "En attente de validation",
                value: "pending"
            }
        case "REJECTED":
            return {
                label: "Rejeté",
                value: "rejected"
            }
        case "ARCHIVED":
            return {
                label: "Archivé",
                value: "archived"
            }
        case "APPROVED":
            return {
                label: "Approuvé",
                value: "approved"
            }
        default:
            break
    }
}

export const getFileType = (filename: string) => {
    const filenameArr = filename.split('.')
    const extension = filenameArr[filenameArr.length - 1]
    if (["png", "jpg", "jpeg", "webp"].includes(extension)) {
        return "IMAGE"
    }
    else if (["mp4", "mov", "wmv", "avi", "avchd", "flv", "f4v", "swf", "mkv", "webm", "mpeg-2"].includes(extension)) {
        return "VIDEO"
    }
    else if (["mp3", "wav", "aac", "flac", "aiff", "ogg", "wma", "alac", "pcm", "dsd", "midi", "mp4", "ape", "m4a"].includes(extension)) {
        return "AUDIO"
    }

    else {
        return "IMAGE"
    }
}

export const renderPostCategories = (categories: any[]) => {
    if (Array.isArray(categories) && categories.length > 0) {
        return categories.map(category => category.name).join(', ')
    } else {
        return ''
    }
}