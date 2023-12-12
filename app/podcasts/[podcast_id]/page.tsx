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

const PodcastPage = () => {
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
                <button className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                  {"Publier l'article"}
                </button>
                <button className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-primary text-primary py-4 px-10 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-10">
                  {"Mettre en brouillon"}
                </button>
                <button className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
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
                  <ArticleCover />
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

export default PodcastPage