const APIKEY = import.meta.env.VITE_API_KEY

const BASE_URL = "https://api.openweathermap.org";

export const API = {
    async geocondingFetch(query) {
        const respone = await fetch(`${BASE_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${APIKEY}`)
        const data = await respone.json()
        return data
    }
}