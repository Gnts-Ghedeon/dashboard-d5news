"use client"

import { useMutation, useQueryClient } from 'react-query'
import axios from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PostCategories from "@/components/PostCategories"
import PostTags from "@/components/PostTags"
import MediasUpload from "@/components/MediasUpload"
import MetaData from "@/components/MetaData"
import PostDetails from "@/components/forms/PostDetails"
import ArticleCover from "@/components/ArticleCover"
import ArticleVideoCover from "@/components/ArticleVideoCover"
import PodcastAudioFile from "@/components/PodcastAudioFile"

const AddPost = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const createPostCategory = async (formValues: any) => {
    const response = await axios.post('/posts', formValues, {
      headers: {
        Authorization: `Bearer ${session?.jwt}`,
      },
    })

    return response.data
  }

  const { mutate } = useMutation(createPostCategory, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('posts')
      return router.push("/posts/" + data.post.slug)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElement = e.target as HTMLFormElement
    const formData = new FormData(formElement)
    const formValues: any = Object.fromEntries(formData)

    console.log('before', formValues);

    formValues.categories = JSON.parse(formValues.categories as string)
    formValues.continents = []

    console.log('after', formValues);

    mutate(formValues)
  }
  return (
    <>
      <Breadcrumb pageName="Ajouter un article" />

      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 lg:col-span-9">
          <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
            {/* <PostDetails 
                  post={{
                    title: "",
                    content: ""
                  }}
                /> */}
          </div>
          <MetaData metas={{
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
          }} />
        </div>
        <div className="col-span-12 lg:col-span-3 flex flex-col space-y-8">
          <div className="w-full flex flex-col gap-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              {"Enregistrer l'article"}
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Image de couverture
              </h2>
            </div>
            <div className="p-6.5">
              {"Veuillez enregistrer l'article avant d'ajouter une image de couverture"}
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Video
              </h2>
            </div>
            <div className="p-6.5">
              {"Veuillez enregistrer l'article avant d'ajouter une video"}
            </div>
          </div>
          {/* <MediasUpload /> */}
          {/* <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    Vidéo de couverture
                  </h2>
                </div>
                <div className="p-6.5">
                  <ArticleVideoCover 
                    file={{
                      filename: "",
                      filetype: "",
                      url: "",
                      relatedPost: ""
                    }}
                  />
                </div>
              </div> */}
          <PostCategories
            cats={[]}
          />
          <PostTags
            tags={{}}
          />
        </div>
      </form>
    </>
  )
}

export default AddPost