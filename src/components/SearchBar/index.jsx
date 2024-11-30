/* eslint-disable no-unused-vars */
import { useState } from "react"
import styles from "./SearchBar.module.scss"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CurrentLocationButton from "./CurrentLocationButton"
import SearchResults from "./SearchResults"
import { API } from "../../utils/api"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

export default function SearchBar() {
    const { t, i18n: { language } } = useTranslation()
    const [searchQuery, setSearchQuery] = useState("")
    const [isInputFocused, setIsInputFocused] = useState(false)

    const { data = [], isFetching } = useQuery({
        queryKey: ["geocode", searchQuery],
        queryFn: () => API.geocondingFetch(searchQuery),
        enabled: searchQuery.length >= 1,
        initialData: [],
        retry: 2,
    })

    return (
        <section className={styles.searchBar}>

            <div className={styles.group}>
                <div className={styles.searchIcon}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>

                <input
                    type="text"
                    placeholder={t("searchInputPlacholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
                />

                <div
                    className={`${styles.searchLoader}`}
                    style={{ display: isFetching ? "block" : "none" }}
                ></div>

                {<SearchResults data={data} searchQuery={searchQuery} isFocused={isInputFocused} />}

            </div>

            {<CurrentLocationButton />}

        </section >
    )
}

