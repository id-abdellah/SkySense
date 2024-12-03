import styles from "./index.module.scss"
import TodaysHighlights from "./TodaysHighlights"
import Forecast from "./Forecast"
import { useEffect } from "react"

export default function WeatherPage() {


    useEffect(() => {
        document.title = "Current weather - SkySense"
    }, [])

    return (
        <section className={styles.weatherSection}>
            <TodaysHighlights />
            <Forecast />
        </section>
    )
}