"use client"

import { useEffect, useState } from 'react'

type MetaDataProps = {
    metas: {
        metaTitle: string | null | undefined;
        metaDescription: string | null | undefined;
        metaKeywords: string | null | undefined;
    }
}

const MetaData = ({ metas }: MetaDataProps) => {
    const [showContent, setShowContent] = useState<boolean>(true)
    const [metaDescriptionValue, setMetaDescriptionValue] = useState<string>("")
    const [metaTitleValue, setMetaTitleValue] = useState<string>("")
    const [metaKeywordsValue, setMetaKeywordsValue] = useState<string>("")

    useEffect(() => {
        setMetaDescriptionValue(metas?.metaDescription || "")
        setMetaTitleValue(metas?.metaTitle || "")
        setMetaKeywordsValue(metas?.metaKeywords || "")
    }, [metas])
    return (
        <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark mt-8 mb-4">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                    Métadonnées
                </h2>
                <button
                    type="button"
                    className=""
                    onClick={() => setShowContent(!showContent)}
                >
                    <svg className={(showContent ? "rotate-180 " : "") + "h-8 transform "} viewBox="0 0 1792 1792" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" />
                    </svg>
                </button>
            </div>
            <div className="py-4 px-6.5 flex flex-col gap-4">
                {
                    showContent && (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Meta title
                                    </label>
                                    <input
                                        type="text"
                                        name="metaTitle"
                                        placeholder=""
                                        onChange={(e) => setMetaTitleValue(e.target.value)}
                                        value={metaTitleValue}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Meta keywords
                                    </label>
                                    <input
                                        type="text"
                                        name="metaKeywords"
                                        placeholder=""
                                        onChange={(e) => setMetaKeywordsValue(e.target.value)}
                                        value={metaKeywordsValue}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Meta description
                                </label>
                                <textarea
                                    name="metaDescription"
                                    rows={6}
                                    placeholder=""
                                    value={metaDescriptionValue}
                                    onChange={(e) => setMetaDescriptionValue(e.target.value)}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default MetaData