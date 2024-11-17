/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useReducer } from "react";
import { produce } from "immer";


/*************************************************
 * actions
**************************************************/
export const globalActions = {
    SET_CITY: "SET_CITY"
}

/*************************************************
 * Reducer & initial state
**************************************************/

const initialState = {
    city: {
        lat: 34.022405,
        lon: -6.834543,
    }
}

function reducer(state, action) {
    return produce(state, (draft) => {
        draft.city = action.payload
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