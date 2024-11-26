import { useQuery } from "@tanstack/react-query"
import styles from "./Forecast.module.scss"
import { API } from "../../utils/api"
import { useGlobalContext } from "../../context/GlobalContext"
import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"
import { unitConversion } from "../../utils/unitsConversions"
import { useSettingsContext } from "../../context/SettingsContext"

export default function Forecast() {
    const { state: { city } } = useGlobalContext()
    const { state: { units } } = useSettingsContext()
    const { t, i18n } = useTranslation()

    const { data, isLoading, isError } = useQuery({
        queryFn: () => API.forecast(city.lat, city.lon, i18n.language),
        queryKey: ["4DaysForecast", city.lat, city.lon]
    })

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occured</div>;

    return (
        <>
            <h3>{t("forecast")}</h3>
            <div className={styles.forecast}>
                {
                    Object.keys(getForecasts(data.list)).map(day => {
                        return (
                            <div key={day} className={styles.dayWrapper}>
                                <div className={styles.dayTitle}>
                                    <FontAwesomeIcon icon={faCalendarDay} />
                                    <span>{day}</span>
                                </div>
                                <div className={styles.hourForecastWrapper}>
                                    {
                                        getForecasts(data.list)[day].map(obj => {
                                            return (
                                                <div key={obj.hour}>
                                                    <div className={styles.hour}>{obj.hour}</div>
                                                    <div className={styles.icon}>
                                                        <img src={`weather-icons/${obj.icon}.png`} alt="" />
                                                    </div>
                                                    <div className={styles.temp}>{unitConversion.tempConversion(obj.temp, units.temperature)} °{units.temperature.toUpperCase()}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}


/**
 * 1. getting available days of months and store theme in array "datesArray"
 * 2. convert the "datesArray" to an object. each key is "day of month" and value is an empty array to fill it later[]
 * 3. looping through "forcastList" and pushing to every "day of month" and object contains "forcaste hour, temperature, weather icon"
 */

function getForecasts(forecastList) {
    // array of dates available in forecastList
    const datesArray = [...new Set(forecastList.map((obj) => obj.dt_txt.split(" ")[0]))]

    // converts array of dates to object
    const datesObj = datesArray.reduce((acc, value) => {
        acc[value] = []
        return acc
    }, {})

    for (let i = 0; i < forecastList.length; i++) {
        const currentItem = forecastList[i];
        const itemDate = currentItem.dt_txt.split(" ")[0]

        const objToPush = {
            hour: (new Date(currentItem.dt_txt)).getHours().toString().padStart(2, "0") + ":00",
            temp: currentItem.main.feels_like,
            icon: currentItem.weather[0].icon
        }

        datesObj[itemDate].push(objToPush)
    }

    return datesObj
}