import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import PostDetails from "@/components/forms/PostDetails"
import ArticleCover from "@/components/ArticleCover"

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
};

const AddPodcast = () => {
    return (
        <>
          <Breadcrumb pageName="Ajouter un article" />

          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <div className="col-span-12 lg:col-span-9">
              <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
                <PostDetails post={{
                  title: "", content: ""
                }} />
              </div>
              <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark mt-8 mb-4">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    Métadonnées
                  </h2>
                </div>
                <div className="py-4 px-6.5">
                  
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-3 flex flex-col space-y-8"> 
              <div className="w-full flex flex-col gap-4">
                <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95">
                  {"Publier l'article"}
                </button>
                <button className="flex justify-center rounded border border-primary text-primary py-2 px-6 font-medium hover:bg-opacity-95">
                  {"Mettre en brouillon"}
                </button>
                <button className="flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:bg-opacity-95">
                  {"Supprimer l'article"}
                </button>
              </div>
              <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    Image de couverture
                  </h2>
                </div>
                <div className="p-6.5">
                  <ArticleCover
                    file={{
                      filename: "",
                      filetype: "",
                      url: "",
                      relatedPost: ""
                    }}
                  />
                </div>
              </div>
              <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    Catégories
                  </h2>
                </div>
                <div className="py-4 px-6.5">
                  
                </div>
              </div>
              <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    Etiquettes
                  </h2>
                </div>
                <div className="py-4 px-6.5">
                  
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default AddPodcast