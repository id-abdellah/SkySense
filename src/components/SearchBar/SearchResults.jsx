/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next"
import styles from "./SearchResults.module.scss"
import Suggestions from "./Suggestions"


export default function SearchResults({ data, searchQuery, isFocused }) {
    const { t } = useTranslation()

    return (
        <div className={styles.searchResults} style={{ display: isFocused ? "block" : "none" }}>
            {
                searchQuery.length == 0 || data.length == 0 && isFocused ? <span>{t("searchNoData")}</span> : null
            }
            <div>
                {
                    data?.map((cityObj, i) => {
                        return <Suggestions cityObj={cityObj} key={i} />
                    })
                }
            </div>
        </div>
    )
}