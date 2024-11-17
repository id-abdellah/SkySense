/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"
import styles from "./Suggestions.module.scss"
import { globalActions, useGlobalContext } from "../../context/GlobalContext"

export default function Suggestions({ cityObj }) {
    const { dispatch } = useGlobalContext()



    function handleSuggestionsClick(e) {
        const choosedCity = e.currentTarget
        const cityInfos = {
            lat: choosedCity.dataset.lat,
            lon: choosedCity.dataset.lon
        }

        dispatch({
            type: globalActions.SET_CITY,
            payload: cityInfos
        })
    }

    return (
        <div
            className={styles.suggestion}
            onClick={handleSuggestionsClick}
            data-lat={cityObj.lat}
            data-lon={cityObj.lon}
        >
            <div className={styles.suggestion_icon}>
                <FontAwesomeIcon icon={faMapPin} />
            </div>
            <div className={styles.suggestion_names}>
                <div>{cityObj.name}</div>
                <div>
                    <span>{"state" in cityObj ? cityObj.state + ". " : ""}</span>
                    <span>{cityObj.country}</span>
                </div>
            </div>
        </div>
    )
}