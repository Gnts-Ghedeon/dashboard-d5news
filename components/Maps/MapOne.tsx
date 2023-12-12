import React, { useEffect, useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMerc } from "@react-jvectormap/world";
import Image from 'next/image'

type CountryData = {
  name: string;
  capital: string;
  population: string;
}

const MapOne = () => {
  const [themeColor, setThemeColor] = useState<string>("light")
  const [bgColor, setBgColor] = useState<string>("#24303F")
  useEffect(() => {
    const colorTheme = localStorage.getItem("color-theme")
    if (colorTheme) {
      setThemeColor(colorTheme);
      setBgColor(colorTheme === "light" ? "#FFFFFF" : "#24303F");
    }
  }, []);

  const customData: Record<string, CountryData> = {
    US: {
      name: "United States",
      capital: "Washington D.C.",
      population: "331,9 millions",
    },
    CG: {
      name: "République du Congo",
      capital: "Brazzaville",
      population: "5,836 millions",
    },
    FR: {
      name: "France",
      capital: "Paris",
      population: "67,75 millions",
    }
  };
  return (
    <div className="col-span-12 rounded-lg border border-stroke bg-white py-6 px-7.5 shadow-default  dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Sessions par pays
      </h4>
      <p>
        Visualiser les visiteurs du site web en survolant la carte
      </p>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9">
          <div id="mapOne" className="mapOne map-btn h-[300px] lg:h-[500px] my-4">
            <VectorMap
              map={worldMerc}
              zoomOnScroll={false}
              backgroundColor={bgColor}
              selectedRegions={["CG", "US", "FR"]}
              regionStyle={{
                initial: {
                  fill: "#4b5563"
                },
                hover: {
                  fillOpacity: 1,
                  // fill: "#003478",
                },
                selected: {
                  fill: "rgba(128,202,238,1)",
                },
              }}
              onRegionTipShow={(event, element, code) => {
                const countryData = customData[code]

                const targetElement = document.querySelector(`div.jvectormap-tip`);
                if (countryData) {
                  if (targetElement instanceof HTMLElement) {
                    targetElement.innerHTML = `
                      <div style="background-color: #F8FAFC; color: black; padding: 2px 8px;">
                        <strong>${countryData.name}</strong><br />
                        Capital: ${countryData.capital}<br />
                        Polulation: ${countryData.population}<br />
                      </div>
                    `;
                  }
                } else {
                  if (targetElement instanceof HTMLElement) {
                    targetElement.innerHTML = `
                      <div style="background-color: #F8FAFC; color: black; padding: 2px 8px;">
                        <strong>${targetElement.textContent}</strong><br />
                        Aucune donnée
                      </div>
                    `
                  }
                }
                
                // if (countryData) {
                //   element.html(`
                //     <div style="background-color: #F8FAFC; color: black; padding: 2px 8px;">
                //       <strong>${countryData.name}</strong><br />
                //       Capital: ${countryData.capital}<br />
                //       Population: ${countryData.population}
                //     </div>
                //   `)
                // } else {
                //   element.html(`
                //     <div style="background-color: #F8FAFC; color: black; padding: 2px 8px;">
                //       <strong>${element.html()}</strong><br />
                //       Aucune donnée
                //     </div>
                //   `)
                // }
              }}
            />
          </div>
        </div>
        <div className="col-span-3">
          <h2 className="pb-2 text-xl font-semibold text-black dark:text-white">Nombre de visiteurs par pays</h2>
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-900 border-b border-stroke dark:border-strokedark dark:bg-boxdark">
              <tr>
                <th scope="col" className="font-medium dark:text-white pl-2 py-4 text-left whitespace-nowrap">
                  #
                </th>
                <th scope="col" className="font-medium dark:text-white px-2 py-4 text-left whitespace-nowrap">
                  Pays
                </th>
                <th scope="col" className="font-medium dark:text-white px-2 py-4 text-right whitespace-nowrap">
                  Visites
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-stroke dark:border-strokedark dark:bg-boxdark">
                <td className="dark:text-gray-100 pl-2 py-4">
                  1
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 flex items-center gap-2">
                  <Image
                    height="12"
                    width="32"
                    alt="Congo"
                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/CG.svg"
                  />
                  <span>Congo</span>
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 text-right">
                  1.204
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-stroke dark:border-strokedark dark:bg-boxdark">
                <td className="dark:text-gray-100 pl-2 py-4">
                  2
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 flex items-center gap-2">
                  <Image
                    height="12"
                    width="32"
                    alt="Etats Unis"
                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                  />
                  <span>Etats Unis</span>
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 text-right">
                  1.204
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-stroke dark:border-strokedark dark:bg-boxdark">
                <td className="dark:text-gray-100 py-4 pl-2">
                  3
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 flex items-center gap-2">
                  <Image
                    height="12"
                    width="32"
                    alt="France"
                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg"
                  />
                  <span>France</span>
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 text-right">
                  1.204
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-stroke dark:border-strokedark dark:bg-boxdark">
                <td className="dark:text-gray-100 py-4 pl-2">
                  4
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 flex items-center gap-2">
                  <Image
                    height="12"
                    width="32"
                    alt="Allemagne"
                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/DE.svg"
                  />
                  <span>Allemagne</span>
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 text-right">
                  1.204
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-stroke dark:border-strokedark dark:bg-boxdark">
                <td className="dark:text-gray-100 py-4 pl-2">
                  5
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 flex items-center gap-2">
                  <Image
                    height="12"
                    width="32"
                    alt="Espagne"
                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg"
                  />
                  <span>Espagne</span>
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 text-right">
                  1.204
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-stroke dark:border-strokedark dark:bg-boxdark">
                <td className="dark:text-gray-100 py-4 pl-2">
                  6
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 flex items-center gap-2">
                  <Image
                    height="12"
                    width="32"
                    alt="France"
                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg"
                  />
                  <span>France</span>
                </td>
                <td className=" dark:text-gray-100 px-2 py-4 text-right">
                  1.204
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MapOne;
