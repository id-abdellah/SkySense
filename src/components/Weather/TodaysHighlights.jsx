/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query"
import { globalActions, useGlobalContext } from "../../context/GlobalContext.jsx"
import { useSettingsContext } from "../../context/SettingsContext.jsx"
import { API } from "../../utils/api.js"
import styles from "./TodaysHighlights.module.scss"
import { getDate } from "../../utils/date.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark, faCalendar, faEye } from "@fortawesome/free-regular-svg-icons"
import { faBookmark as bookmarked, faCloud, faDroplet, faGauge, faTemperatureHalf } from "@fortawesome/free-solid-svg-icons"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"
import countriesCodes from "../../utils/countriesCode.json"
import { unitConversion } from "../../utils/unitsConversions.js"
import { useTranslation } from "react-i18next"
import { cityAddedToFavorites, cityRemovedFromFavorites } from "../../utils/toasts.js"


export default function TodaysHighlights() {
    const {
        state: {
            city,
            favCities
        },
        dispatch: globalDispatch
    } = useGlobalContext();

    const { state: settingsState } = useSettingsContext()


    const { data: currentWeatherData, isLoading, isError } = useQuery({
        queryFn: () => API.currentWeather(city.lat, city.lon, settingsState.lang),
        queryKey: ["currentWeather", city.lang, city.lon, settingsState.lang],
        refetchOnWindowFocus: false,
        cacheTime: 0,
        staleTime: 0
    })

    if (isLoading) return <div>Loading ...</div>
    if (isError) return <div>Error Occured</div>

    return (
        <div className={styles.todaysHighlights}>
            <Now
                data={currentWeatherData}
                units={settingsState.units}
                globalDispatch={globalDispatch}
                favCities={favCities}
            />
            <Highlights
                data={currentWeatherData}
                units={settingsState.units}
            />
        </div>
    )
}


/**
 * SubComponenet => "Now" component
 */

function Now({ data, units, favCities, globalDispatch }) {
    const { i18n } = useTranslation()

    /**
     * when a city "ID" is already exist in favCities state. will dispatch "REMOVE_FAV_CITY" action.
     * otherwise will dispatch "ADD_FAV_CITY" action
     */
    function addFavCity() {
        const name = data.name;
        const id = data.id;

        /* check if city is already exist in favourites list */
        const isExist = isCityBookmarked();

        if (isExist) {
            globalDispatch({
                type: globalActions.REMOVE_FAV_CITY,
                payload: id
            })
            cityRemovedFromFavorites(name)
            return
        }
        globalDispatch({
            type: globalActions.ADD_FAV_CITY,
            payload: {
                ...data.coord,
                name,
                id
            }
        })
        cityAddedToFavorites(name)
    }

    // checks if city is already bookmarked in favourites cities
    function isCityBookmarked() {
        return favCities.some(c => c.id == data.id)
    }

    return (
        <>
            <div className={styles.now}>

                <div className={styles.cityInfos}>
                    <div><FontAwesomeIcon icon={faCalendar} /> {getDate.getCurrentDate(i18n.language)}</div>
                    <div><FontAwesomeIcon icon={faMapPin} /> {countriesCodes[data.sys.country][i18n.language]}</div>
                </div>

                <div className={styles.wrapper}>

                    <div>
                        <div className={styles.cityName}>
                            {data.name}
                            <div onClick={() => addFavCity()}>
                                {
                                    isCityBookmarked()
                                        ?
                                        <FontAwesomeIcon icon={bookmarked} />
                                        :
                                        <FontAwesomeIcon icon={faBookmark} />
                                }
                            </div>
                        </div>
                        <div className={styles.status}>{data.weather[0].description}</div>
                        <div className={styles.temp}>
                            {unitConversion.tempConversion(data.main.temp, units.temperature)}°
                        </div>
                    </div>

                    <div>
                        <img src={`weather-icons/${data.weather[0].icon}.png`} alt="" />
                    </div>

                </div>

            </div>
        </>
    )
}


/**
 * SubComponenet => "Highlights" component
 */

function Highlights({ data: weatherData, units }) {
    const { t } = useTranslation()

    const { data: airPollutionData, isLoading, isError } = useQuery({
        queryFn: () => API.airPollution(weatherData.coord.lat, weatherData.coord.lon),
        queryKey: ["airePollution", weatherData.coord.lat, weatherData.coord.lon],
        refetchOnWindowFocus: false,
        cacheTime: 0
    })


    if (isLoading) return <div>Loading ...</div>
    if (isError) return <div>Error Occured</div>

    return (
        <div className={styles.highlights}>

            <div className={styles.airQuality}>
                <div className={styles.title}>{t("highlights_airQuality")} (µg/m<sup>3</sup>)</div>
                <div className={styles.wrapper}>
                    <div>
                        <span>O3</span>
                        <span>{airPollutionData.list[0].components.o3}</span>
                    </div>
                    <div>
                        <span>CO</span>
                        <span>{airPollutionData.list[0].components.co}</span>
                    </div>
                    <div>
                        <span>SO2</span>
                        <span>{airPollutionData.list[0].components.so2}</span>
                    </div>
                    <div>
                        <span>NH3</span>
                        <span>{airPollutionData.list[0].components.nh3}</span>
                    </div>
                </div>
            </div>

            <div className={styles.sun}>
                <div className={styles.title}>{t("highlights_sun")}</div>
                <div className={styles.wrapper}>
                    <div>
                        <div className={styles.icon}>
                            <img src="sunrise.png" alt="" />
                        </div>
                        <div className={styles.time}>
                            <span>{t("highlights_sunrise")}</span>
                            <span>{getDate.getSunriseSunset(weatherData.sys.sunrise)}</span>
                        </div>
                    </div>
                    <div>
                        <div className={styles.icon}>
                            <img src="sunset.png" alt="" />
                        </div>
                        <div className={styles.time}>
                            <span>{t("highlights_sunset")}</span>
                            <span>{getDate.getSunriseSunset(weatherData.sys.sunset)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.humidiy}>
                <div className={styles.title}>{t("highlights_humidity")}</div>
                <div className={styles.wrapper}>
                    <div><FontAwesomeIcon icon={faDroplet} /></div>
                    <div>{weatherData.main.humidity}%</div>
                </div>
            </div>

            <div className={styles.pressure}>
                <div className={styles.title}>{t("highlights_pressure")}</div>
                <div className={styles.wrapper}>
                    <div><FontAwesomeIcon icon={faGauge} /></div>
                    <div>{unitConversion.pressureConversion(weatherData.main.pressure, units.pressure)} {units.pressure}</div>
                </div>
            </div>

            <div className={styles.visib}>
                <div className={styles.title}>{t("highlights_visibility")}</div>
                <div className={styles.wrapper}>
                    <div><FontAwesomeIcon icon={faEye} /></div>
                    <div>{unitConversion.visibilityConversion(weatherData.visibility, units.distance)} {units.distance == "meters" ? "m" : units.distance == "miles" ? "mi" : units.distance}</div>
                </div>
            </div>

            <div className={styles.feels}>
                <div className={styles.title}>{t("highlights_feels")}</div>
                <div className={styles.wrapper}>
                    <div><FontAwesomeIcon icon={faTemperatureHalf} /></div>
                    <div>{unitConversion.tempConversion(weatherData.main.feels_like, units.temperature)} °{units.temperature.toUpperCase()}</div>
                </div>
            </div>

            <div className={styles.wind}>
                <div className={styles.title}>{t("highlights_wind")}</div>
                <div className={styles.wrapper}>
                    <div>
                        <img
                            style={{ transform: `rotate(${weatherData.wind.deg}deg)` }}
                            src="weather-icons/direction.png"
                            alt="image that describes wind direction" />
                    </div>
                    <div>{unitConversion.windspeedConversion(weatherData.wind.speed, units.windSpeed)}</div>
                </div>
            </div>

            <div className={styles.clouds}>
                <div className={styles.title}>{t("highlights_clouds")}</div>
                <div className={styles.wrapper}>
                    <div><FontAwesomeIcon icon={faCloud} /></div>
                    <div>{weatherData.clouds.all}%</div>
                </div>
            </div>
        </div>
    )
}