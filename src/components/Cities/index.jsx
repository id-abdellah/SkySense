import { useQueries } from "@tanstack/react-query"
import { globalActions, useGlobalContext } from "../../context/GlobalContext"
import styles from "./favCities.module.scss"
import { API } from "../../utils/api"
import Loader from "../Loader"
import { unitConversion } from "../../utils/unitsConversions"
import { useSettingsContext } from "../../context/SettingsContext"
import { cityRemovedFromFavorites } from "../../utils/toasts"
import countriesCode from "../../utils/countriesCode.json"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function MyCities() {
    const { state: { favCities }, dispatch: globalDispatch } = useGlobalContext()
    const { state: { units } } = useSettingsContext()
    const { t, i18n: { language } } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "My cities - SkySense"
    }, [])

    // delete a city from bookmark list
    const unbookmarkHandler = (cityName, cityId) => {
        const confirmed = confirm(`You wanna delete "${cityName}" city from your favorites list?`);
        if (!confirmed) return;
        globalDispatch({
            type: globalActions.REMOVE_FAV_CITY,
            payload: cityId
        })
        cityRemovedFromFavorites(cityName)
    }

    // see city weather details
    const seeDetailsHandler = (coords) => {
        globalDispatch({
            type: globalActions.SET_CITY,
            payload: coords
        })
        navigate("/")
    }

    const results = useQueries({
        queries: favCities.map(city => {
            return {
                queryFn: () => API.currentWeather(city.lat, city.lon),
                queryKey: ["favCities", city.lat, city.lon],
                refetchOnWindowFocus: false
            }
        })
    })

    const isLoading = results.some(city => city.isLoading)
    const isError = results.some(city => city.isError)

    if (isLoading) return <section className={styles.favCitiesSection}><Loader /></section>;
    if (isError) return <section className={styles.favCitiesSection}><pre>Something went wrong :(</pre></section>;

    return (
        <section className={styles.favCitiesSection}>
            <div className={styles.wrapper}>
                {
                    results.map(({ data }) => {
                        return (
                            <div className={styles.cityCard} key={data.id}>
                                <div className={styles.cityName}>
                                    {data.name} <br />
                                    <span>{data.sys.country in countriesCode ? countriesCode[data.sys.country][language] : "unknown"}</span>
                                </div>
                                <div className={styles.weatherStatus}>
                                    <img src={`weather-icons/${data.weather[0].icon}.png`} alt="" />
                                </div>
                                <div className={styles.temp}>{unitConversion.tempConversion(data.main.temp, units.temperature)} °{units.temperature.toUpperCase()}</div>
                                <div className={styles.action}>
                                    <button onClick={() => seeDetailsHandler(data.coord)}>{t("favPage_seeDetails")}</button>
                                    <button onClick={() => unbookmarkHandler(data.name, data.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                                            <path fill="currentColor" d="m16 16.707l1.146 1.147a.5.5 0 0 0 .708-.708l-15-15a.5.5 0 1 0-.708.708L4 4.707V17.5a.5.5 0 0 0 .794.404L10 14.118l5.206 3.786A.5.5 0 0 0 16 17.5zM16 4.5v9.379L4.794 2.673A2.5 2.5 0 0 1 6.5 2h7A2.5 2.5 0 0 1 16 4.5">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}