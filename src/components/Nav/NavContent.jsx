import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./NavContent.module.scss"
import { faCloud, faGear, faMapLocationDot, faStar, faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Nav() {
    const { t, i18n } = useTranslation()

    return (
        <section className={styles.navContent}>

            <div className={styles.logo} onClick={() => i18n.changeLanguage(i18n.language == "en" ? "ar" : "en")}>
                <FontAwesomeIcon icon={faUmbrella} />
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
        </section>
    )
}