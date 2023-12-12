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

export const getFileType = (extension: string) => {
    if(["png", "jpg", "jpeg"].includes(extension)) {
        return "image"
    }
    else if(["mp4", "mkv"].includes(extension)) {
        return "video"
    }
    else if(["mp3"].includes(extension)) {
        return "audio"
    }
    else {
        return "unknown"
    }
}