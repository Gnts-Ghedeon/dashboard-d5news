"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ArticleCover from "@/components/ArticleCover"
import PostCategories from "@/components/PostCategories"
import PostTags from "@/components/PostTags"
import MetaData from "@/components/MetaData"
import PostDetails from "@/components/forms/PostDetails"
import { useState } from 'react'
import { useRouter } from "next/navigation"

import { useMutation, useQueryClient } from 'react-query'
import { useRequestProcessor } from '@/lib/requestProcessor'
import axios from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { getPresignedUrl, uploadImageToS3 } from "@/utils/uploadMedia";
import { getFileType } from "@/utils/utilities";
import PodcastAudioFile from "@/components/PodcastAudioFile";

type SinglePodcastProps = {
  params: any
}

const SinglePodcast = ({ params }: SinglePodcastProps) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [postMediaFiles, setPostMediaFiles] = useState<File[]>([])
  const [postStatus, setPostStatus] = useState<string | null>(null)

  const addMediaToPostMediaFiles = (file: File) => {    
    setPostMediaFiles((prev) => [...prev, file])
  }
  
  const removeMediaFromPostMediaFiles = (file: File) => {
    setPostMediaFiles(postMediaFiles.filter((mediaFile) => mediaFile !== file))
  }

  // delete post
  const deletePost = async (post_id: string) => {
    const response = await axios.delete(
      `/posts/${post_id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.jwt}`
        }
      }
    )
    return response
  }

  const { mutate: handleDeletePost } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('post')
      toast.success("Podcast supprimé avec succès!")
      return router.push('/posts')
    },
    onError: () => {
      toast.error("Oops, une erreur s'est produite. Veuillez réessayer!")
    }
  })

  const handleDelete = (post_id: string) => {
    handleDeletePost(post_id)
  }


  // Update post
  const updatePost = async (formValues: FormData) => {
    const response = await axios.patch('/posts/' + params.post_slug, formValues, {
      headers: {
        Authorization: `Bearer ${session?.jwt}`,
      },
    })
    if (response.status === 200) {
      toast.success("Modifications enregistrées avec succès!")
    }
    else {
      toast.error("Oops, une erreur s'est produite. Veuillez réessayer!")
    }
    return response.data
  }

  const { mutate: mutateUpdatePost } = useMutation(updatePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('post')
      return router.push("/podcasts/" + data.post.slug)
    },
  })

  const uploadMediaFiles = async () => {
    postMediaFiles?.shift();
    const uploadedFiles: any[] = [];
    
    const promises = postMediaFiles.map(async (file) => {
      const fileType = getFileType(file.name);
      const response = await getPresignedUrl(file.name, fileType, session?.jwt ?? "");
      await uploadImageToS3(response, file);
      uploadedFiles.push(file);
    });
  
    await Promise.all(promises);
    console.log("All media files uploaded successfully!");
  
    return uploadedFiles;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElement = e.target as HTMLFormElement
    const formData = new FormData(formElement)
    const formValues: any = Object.fromEntries(formData)

    formValues.categories = JSON.parse(formValues.categories as string)
    formValues.continents = []
    formValues.media = post.media
    if (postStatus) {
      formValues.status = postStatus
    }
    
    await uploadMediaFiles().then(async (editorFiles) => {
      console.log('formValues', formValues);

      editorFiles.map((file) => {
        formValues.media.push({
          name: file.name,
          url: process.env.NEXT_PUBLIC_CLOUD_URL + '/' + file.name,
          type: getFileType(file.name),
          isCover: false
        })
      })
      
      if(formValues.coverImage && formValues.coverImage.size > 0) {
        const data = await getPresignedUrl(formValues.coverImage.name, getFileType(formValues.coverImage.name), session?.jwt ?? "")
        const response = await uploadImageToS3(data, formValues.coverImage)
        if(response.status === 200) {
          formValues.media.push({
            name: formValues.coverImage.name,
            url: process.env.NEXT_PUBLIC_CLOUD_URL + '/' + formValues.coverImage.name,
            type: getFileType(formValues.coverImage.name),
            isCover: true
          })
        }
      }

      if(formValues.audioPodcast && formValues.audioPodcast.size > 0) {
        const data = await getPresignedUrl(formValues.audioPodcast.name, getFileType(formValues.audioPodcast.name), session?.jwt ?? "")
        const response = await uploadImageToS3(data, formValues.audioPodcast)
        if(response.status === 200) {
          formValues.media.push({
            name: formValues.audioPodcast.name,
            url: process.env.NEXT_PUBLIC_CLOUD_URL + '/' + formValues.audioPodcast.name,
            type: getFileType(formValues.audioPodcast.name),
            isPodcast: true
          })
        }
      }
      console.log('formValues', formValues);
      mutateUpdatePost(formValues)
    })
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        '/posts/' + params.post_slug,
        {
          headers: {
            Authorization: `Bearer ${session?.jwt}`
          }
        }
      )
      return response
    } catch (error: any) {
      console.error('err', error)
      return error?.response
    }
  }

  const { query } = useRequestProcessor()

  const { data, isLoading, isError } = query(
    'post',
    () => fetchData().then((res) => res.data.post),
    { enabled: true }
  )

  const post = data as Post

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :</p>;
  if (post) {
    const coverImage = post?.media.find((media: any) => media?.isCover && media.url)
    const postcastMedia = post?.media.find((media: any) => media?.isPodcast && media.url)
    console.log('post?.media', post?.media);
    
    return (
      <>
        <Breadcrumb pageName="Modifier le podcast" />

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 lg:col-span-9">
            <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
            <PostDetails
                post={post}
                addMediaToPostMediaFiles={addMediaToPostMediaFiles}
                removeMediaFromPostMediaFiles={removeMediaFromPostMediaFiles}
              />
            </div>
            <MetaData
              metas={{
                metaTitle: post.metaTitle,
                metaDescription: post.metaDescription,
                metaKeywords: post.metaKeywords,
              }}
            />
          </div>
          <div className="col-span-12 lg:col-span-3 flex flex-col space-y-8">
            <div className="w-full flex flex-col gap-4">
              {
                post.status !== "PENDING" && (
                  <button className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    type="submit"
                    onClick={() => setPostStatus("PENDING")}
                  >
                    {"Publier le podcast"}
                  </button>
                )
              }
              {
                post.status !== "DRAFT" && (
                  <button className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    type="submit"
                    onClick={() => setPostStatus("DRAFT")}
                  >
                    {"Mettre en brouillon"}
                  </button>
                )
              }
              <button className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-primary text-primary py-4 px-6 text-center font-medium hover:bg-opacity-90"
                type="submit"
                onClick={() => setPostStatus(post.status)}
              >
                {"Enregistrer les modifications"}
              </button>
              <button className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                type="button"
                onClick={() => handleDelete(post.id)}
              >
                {"Supprimer le podcast"}
              </button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  {"Couverture du podcast"}
                </h2>
              </div>
              <div className="p-6.5">
              <ArticleCover
                  file={{
                    filename: coverImage?.name ?? "",
                    filetype: coverImage?.type ?? "",
                    url: coverImage?.url ?? "",
                    relatedPost: post.slug,
                    postId: post.id
                  }}
                  accept=".jpg,.jpeg,.png,.webp,"
                  name="coverImage"
                />
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Fichier audio
                </h2>
              </div>
              <div className="p-6.5">
                <PodcastAudioFile
                  file={{
                    filename: postcastMedia?.name ?? "",
                    filetype: postcastMedia?.type ?? "",
                    url: postcastMedia?.url ?? "",
                    relatedPost: post.slug,
                    postId: post.id
                  }}
                />
              </div>
            </div>
            <PostCategories
              cats={post.categories}
            />
            <PostTags
              tags={post.tags}
            />
          </div>
        </form>
      </>
    )
  }
}

export default SinglePodcast