/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next"
import styles from "./GeneralSettings.module.scss"

export default function GeneralSettings({ currentSettings, setNewSettings }) {
    const { t, i18n } = useTranslation()

    function handleThemControle(e) {
        let isChecked = e.currentTarget.checked
        setNewSettings(prev => ({ ...prev, theme: isChecked ? "dark" : "light" }))
    }

    function handleLangControle(e) {
        const selectedLang = e.target.selectedOptions[0].getAttribute("value")
        setNewSettings(prev => ({ ...prev, lang: selectedLang }))
    }

    return (
        <div className={styles.generalSettings}>

            <div className={styles.themeMod}>
                <span className={styles.title}>{t("settings_general_darkMode")}</span>
                <label className="switch">
                    <input
                        defaultChecked={currentSettings.theme == "dark"}
                        type="checkbox"
                        onChange={(e) => handleThemControle(e)}
                    />
                    <span className="slider"></span>
                </label>
            </div>

            <div className={styles.lang}>
                <span className={styles.title}>{t("settings_general_lang")}</span>
                <select defaultValue={i18n.language} name="" id="" onChange={(e) => handleLangControle(e)}>
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                </select>
            </div>

        </div>
    )
}