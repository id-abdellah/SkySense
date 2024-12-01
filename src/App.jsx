/* eslint-disable no-unused-vars */
import styles from "./App.module.scss"
import { useEffect } from "react"
import { useSettingsContext } from "./context/SettingsContext"
import { useTranslation } from "react-i18next"
import { Route, Routes } from "react-router-dom"

import Nav from "./components/Nav/NavContent"
import WeatherPage from "./components/Weather/index.jsx"
import MapPage from "./components/Map/index.jsx"
import SettingsPage from "./components/Settings/index.jsx"
import MyCities from "./components/Cities/index.jsx"
import SearchBar from "./components/SearchBar/index.jsx"

export default function App() {
    const { state: { theme } } = useSettingsContext()
    const { i18n } = useTranslation()

    useEffect(() => {
        document.body.setAttribute("data-theme", theme)
        document.body.setAttribute("data-lang", i18n.language)
    }, [theme, i18n.language])

    return (
        <div className={`${styles.hero} container`}>
            <main>
                <SearchBar />
                <Routes>
                    <Route path="/" element={<WeatherPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/mycities" element={<MyCities />} />
                </Routes>
            </main>

            <nav>
                <Nav />
            </nav>
        </div>
    )
}