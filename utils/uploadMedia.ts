import axios from '@/lib/axios'

export const getPresignedUrl = async (filename: string, filetype: string, jwt: string) => {
    const response = await axios.post('/r2/getPresignedUrl', 
      {
        filename: filename,
        filetype: filetype
      }, 
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      }
    )
    
    if(response.status === 201) {
      return response.data
    }
}
  
export const uploadImageToS3 = async (presignedUrl: string, imageFile: File) => {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: imageFile,
      headers: {
        'Content-Type': imageFile.type,
      },
    })
    
    if (response.ok) {
      console.log('Image uploaded successfully')
    } else {
      console.error('Failed to upload image')
    }
    return response
}