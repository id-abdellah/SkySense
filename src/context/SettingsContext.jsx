/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useReducer } from "react";
import { produce } from "immer";




/*********************************************
 * Actions
**********************************************/
export const settingsActions = {
    CHANGE_THEME: "CHANGE_THEME",
    UPDATE_SETTINGS: "UPDATE_SETTINGS"
}


/*********************************************
 * useReducer & initState
**********************************************/

const initState = {
    units: {
        temperature: "c", /* c - f - k */
        windSpeed: "ms", /* ms (meter/s) - mih (miles/h) - kmh (kilometers/h) */
        pressure: "hPa", /* hpa - mmHg - atm */
        distance: "meters", /* km - miles */
    },
    theme: "dark",
    lang: "en"
}

/**
 * Load persisted state from local storage
 */

function loadState() {
    const savedState = localStorage.getItem("appSettingsState");
    return savedState ? JSON.parse(savedState) : initState
}

function reducer(state, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case settingsActions.CHANGE_THEME: {
                const currentTheme = draft.theme;
                draft.theme = currentTheme == "dark" ? "light" : "dark";
                break;
            }
            case settingsActions.UPDATE_SETTINGS: {
                return action.payload
            }
            default:
                break;
        }
    })
}

/***********************************************
 * Settings Context
************************************************/

const SettingsContext = createContext()

export function SettingsContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, loadState());

    useEffect(() => {
        localStorage.setItem("appSettingsState", JSON.stringify(state))
        console.log("Settings State", state)
    }, [state])

    return (
        <SettingsContext.Provider value={{ state, dispatch }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettingsContext() {
    return useContext(SettingsContext)
}