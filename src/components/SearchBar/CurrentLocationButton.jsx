/* eslint-disable no-unused-vars */
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { geolocationErrorNotify, geolocationSuccessNotify } from "../../utils/toasts.js";
import { globalActions, useGlobalContext } from "../../context/GlobalContext.jsx";
import { useTranslation } from "react-i18next";


export default function CurrentLocationButton() {
    const { t } = useTranslation()
    const { dispatch } = useGlobalContext()

    return (
        <button onClick={() => getLocation(dispatch, t)}>
            <FontAwesomeIcon icon={faLocationCrosshairs} />
            <span>{t("locationBtn")}</span>
        </button>
    )
}

/**
 * Geolocation Handler
 * */

function getLocation(dispatch, t) {
    if (!navigator.geolocation) return geolocationErrorNotify(t("geolocationSupport"))

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const coords = position.coords.toJSON()
            const currentLocation = {
                lat: coords.latitude,
                lon: coords.longitude
            }
            dispatch({
                type: globalActions.SET_CITY,
                payload: currentLocation
            })
            geolocationSuccessNotify()
        },
        (error) => {
            geolocationErrorNotify(error.message)
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    )
}


