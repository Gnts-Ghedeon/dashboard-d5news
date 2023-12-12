import Link from 'next/link'


const QuickDraft = () => {
    return (
        <div className="rounded-lg border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Brouillon rapide
              </h2>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                        Titre
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                        Contenu
                    </label>
                    <textarea
                        rows={6}
                        placeholder="Qu'avez-vous en tête ?"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                </div>
                <button className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Enregistrer en brouillon
                </button>
            </div>
        </div>
    )
}

export default QuickDraft