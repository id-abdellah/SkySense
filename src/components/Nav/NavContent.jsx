import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./NavContent.module.scss"
import { faCloud, faGear, faMapLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { settingsActions, useSettingsContext } from "../../context/SettingsContext";

export default function Nav() {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { state: { theme }, dispatch } = useSettingsContext()

    return (
        <section className={styles.navContent}>

            <div className={styles.logo} onClick={() => navigate("/")}>
                <span>Sky</span><span>Sense</span>
            </div>

            <ul className={styles.navLinks}>
                <li>
                    <NavLink to="/" title="Weather">
                        <FontAwesomeIcon icon={faCloud} />
                        <span>{t("navWeather")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/mycities" title="my cities">
                        <FontAwesomeIcon icon={faStar} />
                        <span>{t("navCities")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/map" title="Map">
                        <FontAwesomeIcon icon={faMapLocationDot} />
                        <span>{t("navMap")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" title="Settings">
                        <FontAwesomeIcon icon={faGear} />
                        <span>{t("navSettings")}</span>
                    </NavLink>
                </li>
            </ul>

            <div
                className={styles.themeToggle}
                onClick={() => dispatch({ type: settingsActions.CHANGE_THEME })}
            >
                {
                    theme == "dark"
                        ?
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M12 19a1 1 0 0 1 .993.883L13 20v1a1 1 0 0 1-1.993.117L11 21v-1a1 1 0 0 1 1-1m6.313-2.09l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7a1 1 0 0 1 1.218-1.567zm-11.306.083a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0M4 11a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11zm17 0a1 1 0 0 1 .117 1.993L21 13h-1a1 1 0 0 1-.117-1.993L20 11zM6.213 4.81l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7A1 1 0 0 1 6.11 4.74zm12.894.083a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0M12 2a1 1 0 0 1 .993.883L13 3v1a1 1 0 0 1-1.993.117L11 4V3a1 1 0 0 1 1-1m0 5a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7">
                            </path>
                        </svg>
                        :
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M12.3 22h-.1a10.3 10.3 0 0 1-7.34-3.15a10.46 10.46 0 0 1-.26-14a10.1 10.1 0 0 1 4-2.74a1 1 0 0 1 1.06.22a1 1 0 0 1 .24 1a8.4 8.4 0 0 0 1.94 8.81a8.47 8.47 0 0 0 8.83 1.94a1 1 0 0 1 1.27 1.29A10.2 10.2 0 0 1 19.6 19a10.28 10.28 0 0 1-7.3 3">
                            </path>
                        </svg>
                }
            </div>
        </section>
    )
}