"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import SwitcherOne from "@/components/Switchers/SwitcherOne"
import CoverImage from '@/components/CoverImage'
import UserPersonnalInfos from '@/components/forms/UserPersonnalInfos'
import { useRequestProcessor } from '@/lib/requestProcessor'
import axios from '@/lib/axios'
import { useSession } from 'next-auth/react'

import { UseQueryResult } from 'react-query'

type SettingsProps = {
  params: any
}

const Settings = ({ params }: SettingsProps) => {
  const { data: session } = useSession()
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
          '/users', 
          {
              headers: {
                  Authorization: `Bearer ${session?.jwt}`
              }
          }
      )
      console.log('response', response)
      return response
    } catch (error) {
      console.error('err', error)
    }
  }

  const { query } = useRequestProcessor()

  const { data: user, isLoading, isError }: UseQueryResult<any | null> = query(
    'user',
    () => fetchData().then((res: any) => res.data.user),
    { enabled: true }
  )
  
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Réglages" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-2 flex flex-col gap-8">
            <CoverImage title="Photo de profil" />
            {/* <div className="rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Alertes et Notifications
                </h3>
              </div>
              <div className="py-4 px-7">
                <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                  <div className="flex flex-col gap-4">
                    <div className="flex space-x-2 items-center justify-between">
                        <div className="flex-1">
                            <h4 className="text-gray-800 dark:text-gray-300 text-lg font-medium">Newsletter de la société</h4>
                            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ab vel perferendis voluptatem corporis natus.</p>
                        </div>
                        <SwitcherOne />
                    </div>
                    <div className="flex space-x-2 items-center justify-between">
                        <div className="flex-1">
                            <h4 className="text-gray-800 dark:text-gray-300 text-lg font-medium">Newsletter de la société</h4>
                            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ab vel perferendis voluptatem corporis natus.</p>
                        </div>
                        <SwitcherOne />
                    </div>
                    <div className="flex space-x-2 items-center justify-between">
                        <div className="flex-1">
                            <h4 className="text-gray-800 dark:text-gray-300 text-lg font-medium">Newsletter de la société</h4>
                            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ab vel perferendis voluptatem corporis natus.</p>
                        </div>
                        <SwitcherOne />
                    </div>
                    <div className="flex space-x-2 items-center justify-between">
                        <div className="flex-1">
                            <h4 className="text-gray-800 dark:text-gray-300 text-lg font-medium">Newsletter de la société</h4>
                            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ab vel perferendis voluptatem corporis natus.</p>
                        </div>
                        <SwitcherOne />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4.5 mt-6">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Annuller
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                    type="submit"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-span-5 xl:col-span-3 flex flex-col gap-8">
            {
              user && (
                <UserPersonnalInfos 
                  user={user} 
                  session={session} 
                  action="edit"
                  isAdmin={true}
                />
              )
            }
            {/* <div className="col-span-5 xl:col-span-2">
              <div className="rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Informations de sécurité
                  </h3>
                </div>
                <div className="p-7">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Mot de passe actuel
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="password"
                          name="fullName"
                          id="fullName"
                          placeholder="*******************"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Nouveau mot de passe
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="password"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="***************"
                      />
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Confirmer le mot de passe
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="password"
                          name="fullName"
                          id="fullName"
                          placeholder="*******************"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Annuller
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                      type="submit"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
