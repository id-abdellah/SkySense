import { useEffect, useState } from "react"
import { useSettingsContext } from "../../context/SettingsContext"
import styles from "./Settings.module.scss"
import UnitsSettings from "./UnitsSettings"
import { useTranslation } from "react-i18next"
import SaveSettingsBtn from "./SaveSettingsBtn.jsx"
import GeneralSettings from "./GeneralSettings.jsx"


export default function SettingsPage() {
    const { t } = useTranslation()
    const { state: currentSettings, dispatch: dispatchSettings } = useSettingsContext()
    const [newSettings, setNewSettings] = useState(() => structuredClone(currentSettings))

    useEffect(() => {
        setNewSettings(structuredClone(currentSettings))
        document.title = "Settings - SkySense"
    }, [currentSettings])


    return (
        <section className={styles.settingsPage}>
            <h2 className={styles.grTitle}>{t("settings_general")}</h2>
            <GeneralSettings currentSettings={currentSettings} setNewSettings={setNewSettings} />

            <h2 className={styles.grTitle}>{t("settings_units")}</h2>
            <UnitsSettings currentSettings={currentSettings} newSettings={newSettings} setNewSettings={setNewSettings} />

            {<SaveSettingsBtn dispatchSettings={dispatchSettings} newSettings={newSettings} />}
        </section>
    )
}