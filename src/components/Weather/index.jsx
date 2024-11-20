import styles from "./index.module.scss"
import TodaysHighlights from "./TodaysHighlights"
import Forecast from "./Forecast"

export default function WeatherPage() {

    return (
        <section className={styles.weatherSection}>
            <TodaysHighlights />
            <Forecast />
        </section>
    )
}