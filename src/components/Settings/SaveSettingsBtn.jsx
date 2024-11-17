/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next"
import { settingsActions } from "../../context/SettingsContext"

export default function SaveSettingsBtn({ dispatchSettings, newSettings }) {
    const { t } = useTranslation()

    function saveSettings() {
        localStorage.setItem("appLanguage", newSettings.lang)
        dispatchSettings({
            type: settingsActions.UPDATE_SETTINGS,
            payload: newSettings
        })
        window.location.reload()
    }

    return (
        <button
            onClick={() => saveSettings()}>
            {t("settings_save")}
        </button>
    )
}