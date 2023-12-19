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

type SinglePostProps = {
  params: any
}

const SinglePost = ({ params }: SinglePostProps) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [postMedia, setPostMedia] = useState<Media[]>([])
  const [postStatus, setPostStatus] = useState<string | null>(null)

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
      return router.push('/posts')
    },
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
    console.log('post res', response);
    return response.data
  }

  const { mutate: mutateUpdatePost } = useMutation(updatePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('post')
      return router.push("/posts/" + data.post.slug)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElement = e.target as HTMLFormElement
    const formData = new FormData(formElement)
    const formValues: any = Object.fromEntries(formData)

    formValues.categories = JSON.parse(formValues.categories as string)
    formValues.continents = []
    formValues.media = []
    if (postStatus) {
      formValues.status = postStatus
    }

    delete formValues.cover
    delete formValues.audioPodcast

    console.log('content', formValues.content);

    // Object.entries(formValues).map((formValue: [string, any], key: number) => {
    //   if(formValue && typeof formValue === "object" && ["coverImage", "videoCover", "audioPodcast"].includes(formValue[0])) {
    //     getPresignedUrl(formValue[1].name, "IMAGE", session?.jwt).then(data => {
    //       uploadImageToS3(data, formValue[1]).then((response: any) => {
    //         if(response.ok) {
    //           formValues.media[key] = {
    //             name: formValue[1].name,
    //             url: process.env.NEXT_PUBLIC_CLOUD_URL + '/' + formValue[1].name,
    //             type: getFileType(formValue[1].name),
    //             isCover: formValue[0] === "coverImage" ? true : false
    //           }
    //           delete formValues.coverImage
    //           delete formValues.videoCover
    //           delete formValues.audioPodcast

    //           console.log('formValues', formValues);

    //           // Update the post
    //           mutateUpdatePost(formValues)
    //         }
    //       })
    //     })
    //   }
    // })

    // mutateUpdatePost(formValues)
  }
  // 

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

  console.log('my post', post)

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :</p>;
  if (post) {
    const cover = post.media.find((media: { isCover: boolean; }) => media.isCover === true)
    const audio = post.media.find((media: { type: string; }) => media.type === "AUDIO")
    return (
      <>
        <Breadcrumb pageName="Modifier l'article" />

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 lg:col-span-9">
            <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
              <PostDetails
                post={post}
                setPostMedia={setPostMedia}
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
                    {"Publier l'article"}
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
                {"Supprimer l'article"}
              </button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  {"Image de couverture"}
                </h2>
              </div>
              <div className="p-6.5">
                <ArticleCover
                  file={{
                    filename: cover?.name ?? "",
                    filetype: cover?.type ?? "",
                    url: cover?.url ?? "",
                    relatedPost: post.slug,
                    postId: post.id
                  }}
                />
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  {"Video"}
                </h2>
              </div>
              <div className="p-6.5">
                <ArticleCover
                  file={{
                    filename: cover?.name ?? "",
                    filetype: cover?.type ?? "",
                    url: cover?.url ?? "",
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

export default SinglePost