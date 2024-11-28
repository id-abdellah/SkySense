import { MapContainer, Marker, TileLayer, useMap, useMapEvent } from "react-leaflet"
import { globalActions, useGlobalContext } from "../../context/GlobalContext"
import { useSettingsContext } from "../../context/SettingsContext"
import "./Map.scss"
import "leaflet/dist/leaflet.css"
import { divIcon } from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import { useQueries } from "@tanstack/react-query"
import { API } from "../../utils/api"
import { useTranslation } from "react-i18next"
import { unitConversion } from "../../utils/unitsConversions"
import Spinner from "../spinner"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"

// const customIcon = new Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/128/854/854853.png",
//     iconSize: [25, 25]
// })


function CustomZoomControl() {
    const map = useMap();

    const zoomIn = (e) => {
        e.stopPropagation()
        map.zoomIn()
    }
    const zoomOut = (e) => {
        e.stopPropagation()
        map.zoomOut()
    }

    return (
        <div className="customZoomControls">
            <button className="no-map-click" onClick={(e) => zoomIn(e)}>+</button>
            <button className="no-map-click" onClick={(e) => zoomOut(e)}>-</button>
        </div>
    )
}

export default function MapPage() {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation();
    const { state: { units } } = useSettingsContext()
    const { state: { favCities, city }, dispatch: globalDispatch } = useGlobalContext();

    const favCitiesData = useQueries({
        queries: favCities.map(city => {
            return {
                queryFn: () => API.currentWeather(city.lat, city.lon, i18n.language),
                queryKey: ["mapWeather", city.lat, city.lon, i18n.language],
                refetchOnWindowFocus: false
            }
        })
    })

    const MapClickHandler = () => {
        useMapEvent("click", (e) => {
            if (e.originalEvent.target.classList.contains("no-map-click")) return
            const { lat, lng: lon } = e.latlng
            const payload = {
                lat,
                lon
            }
            globalDispatch({
                type: globalActions.SET_CITY,
                payload
            })
            navigate("/")
        })
    }

    const isLoading = favCitiesData.some(query => query.isLoading)
    const isError = favCitiesData.some(query => query.isError)

    if (isLoading) return <Spinner />
    if (isError) return <div>Error occured</div>;

    return (
        <section className="mapPage">
            <div className="instructions">
                <div>
                    <span><FontAwesomeIcon icon={faCircleInfo} /></span>
                    <span>{t("mapInstruction1")}</span>
                </div>
                <div>
                    <span><FontAwesomeIcon icon={faCircleInfo} /></span>
                    <span>{t("mapInstruction2")}</span>
                </div>
            </div>
            <MapContainer center={[city.lat, city.lon]} zoom={6} attributionControl={false} zoomControl={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <MarkerClusterGroup>
                    {favCitiesData.map(({ data }) => {
                        return (
                            <Marker
                                key={data.coord.lat}
                                position={[data.coord.lat, data.coord.lon]}
                                icon={
                                    divIcon({
                                        className: "weather-div-icon",
                                        html:
                                            `
                                        <div class="weather-map-box">
                                            <div>${data.name}</div>
                                            <div>
                                                <img src="weather-icons/${data.weather[0].icon}.png"/>
                                            </div>
                                            <div>${data.weather[0].description}</div>
                                            <div class="temp">${unitConversion.tempConversion(data.main.temp, units.temperature)} °${units.temperature.toUpperCase()}</div>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                    <!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    `
                                    })
                                }
                            />
                        )
                    })}
                    <CustomZoomControl />
                </MarkerClusterGroup>

                <MapClickHandler />
            </MapContainer>
        </section>
    )
}