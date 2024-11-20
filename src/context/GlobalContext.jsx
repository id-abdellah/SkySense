/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useReducer } from "react";
import { produce } from "immer";


/*************************************************
 * actions
**************************************************/
export const globalActions = {
    SET_CITY: "SET_CITY",
    ADD_FAV_CITY: "ADD_FAV_CITY",
    REMOVE_FAV_CITY: "REMOVE_FAV_CITY"
}

/*************************************************
 * Reducer & initial state
**************************************************/

const initialState = {
    city: {
        lat: 34.022405,
        lon: -6.834543,
    },
    favCities: []
}

function reducer(state, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case globalActions.SET_CITY:
                draft.city = action.payload
                break;
            case globalActions.ADD_FAV_CITY:
                draft.favCities.push(action.payload)
                break;
            case globalActions.REMOVE_FAV_CITY: {
                const id = action.payload;
                const newFavCitiesList = draft.favCities.filter(c => c.id !== id)
                draft.favCities = newFavCitiesList
                break
            }
            default:
                break;
        }
    })
}

/*************************************************
 * Global Context Provider
**************************************************/

const GlobalContext = createContext()


export function GlobalContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        console.log("Global State", state)
    }, [state])

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext)
}