/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next"
import styles from "./UnitsSettings.module.scss"

export default function UnitsSettings({ currentSettings: { units }, setNewSettings }) {
    const { t } = useTranslation()
    return (
        <div className={styles.unitsSettings}>

            <div className={styles.unit}>
                <div className={styles.title}>{t("settings_units_temp")}</div>
                <div className={styles.tabs}>
                    <div>
                        <input
                            defaultChecked={units.temperature == "c"}
                            value="c"
                            type="radio"
                            name="temperature"
                            id="celsius"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        temperature: "c"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="celsius">Celsius</label>
                    </div>
                    <div>
                        <input
                            defaultChecked={units.temperature == "f"}
                            value="f"
                            type="radio"
                            name="temperature"
                            id="fahrenheit"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        temperature: "f"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="fahrenheit">Fahrenheit</label>
                    </div>
                    <div>
                        <input
                            defaultChecked={units.temperature == "k"}
                            value="k"
                            type="radio"
                            name="temperature"
                            id="kelvin"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        temperature: "k"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="kelvin">Kelvin</label>
                    </div>
                </div>
            </div>

            <div className={styles.unit}>
                <div className={styles.title}>{t("settings_units_wind")}</div>
                <div className={styles.tabs}>
                    <div>
                        <input
                            defaultChecked={units.windSpeed == "ms"}
                            value="ms"
                            type="radio"
                            name="windSpeed"
                            id="ms"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        windSpeed: "ms"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="ms">m/s</label>
                    </div>
                    <div>
                        <input
                            defaultChecked={units.windSpeed == "mih"}
                            value="mih"
                            type="radio"
                            name="windSpeed"
                            id="mih"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        windSpeed: "mih"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="mih">miles/h</label>
                    </div>
                    <div>
                        <input
                            defaultChecked={units.windSpeed == "kmh"}
                            value="kmh"
                            type="radio"
                            name="windSpeed"
                            id="kmh"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        windSpeed: "kmh"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="kmh">km/h</label>
                    </div>
                </div>
            </div>

            <div className={styles.unit}>
                <div className={styles.title}>{t("settings_units_pres")}</div>
                <div className={styles.tabs}>
                    <div>
                        <input
                            defaultChecked={units.pressure == "hPa"}
                            value="hPa"
                            type="radio"
                            name="pressure"
                            id="hpa"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        pressure: "hPa"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="hpa">hpa</label>
                    </div>
                    <div>
                        <input
                            defaultChecked={units.pressure == "mmHg"}
                            value="mmHg"
                            type="radio"
                            name="pressure"
                            id="mmHg"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        pressure: "mmHg"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="mmHg">mmHg</label>
                    </div>
                    <div>
                        <input
                            defaultChecked={units.pressure == "atm"}
                            value="atm"
                            type="radio"
                            name="pressure"
                            id="atm"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        pressure: "atm"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="atm">atm</label>
                    </div>
                </div>
            </div>

            <div className={styles.unit}>
                <div className={styles.title}>{t("settings_units_dist")}</div>
                <div className={styles.tabs}>
                    <div>
                        <input
                            defaultChecked={units.distance == "meters"}
                            value="meters"
                            type="radio"
                            name="distance"
                            id="meters"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        distance: "meters"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="meters">Meters</label>
                    </div>
                    <div>
                        <input
                            defaultChecked={units.distance == "miles"}
                            value="miles"
                            type="radio"
                            name="distance"
                            id="miles"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        distance: "miles"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="miles">Miles</label>
                    </div>
                    <div>
                        <input
                            defaultChecked={units.distance == "km"}
                            value="km"
                            type="radio"
                            name="distance"
                            id="km"
                            onClick={() => {
                                setNewSettings(prev => ({
                                    ...prev,
                                    units: {
                                        ...prev.units,
                                        distance: "km"
                                    }
                                }))
                            }}
                        />
                        <label htmlFor="km">KM</label>
                    </div>
                </div>
            </div>

        </div>
    )
}