import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'

require('dotenv').config()

export async function POST(request) {
    try {
        const data = await request.formData()
        const files = data.getAll('file')
        const uploadedFiles = []

        console.log('data', data)
        

        if (!files.length) {
            return new NextResponse({ status: 400, json: { success: false } })
        }

        for (const file of files) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const path = `${process.env.CLOUD_PATH}/${file.name}`
            await writeFile(path, buffer)
            uploadedFiles.push(file.name)
            console.log(`Le fichier téléchargé est disponible à l'emplacement : ${path}`)
        }

        return NextResponse.json({ uploadedFiles }, { status: 200 })
    } catch (error) {
        console.error('Erreur lors du téléchargement du fichier :', error)
        throw error
    }
}