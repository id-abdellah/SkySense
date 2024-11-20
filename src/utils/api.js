const APIKEY = import.meta.env.VITE_API_KEY

const BASE_URL = "https://api.openweathermap.org";

export const API = {
    async geocondingFetch(query) {
        const respone = await fetch(`${BASE_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${APIKEY}`);
        const data = await respone.json();
        return data
    },

    async currentWeather(lat, lon, lang = "en") {
        const respone = await fetch(`${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${APIKEY}`);
        const data = await respone.json();
        return data
    },

    async forecast(lat, lon, lang = "en") {
        const response = await fetch(`${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${APIKEY}`)
        const data = await response.json();
        return data
    },

    async geocodingReverse(lat, lon) {
        const respone = await fetch(`${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${APIKEY}`)
        const data = await respone.json()
        return data
    },

    async airPollution(lat, lon) {
        const respone = await fetch(`${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
        const data = await respone.json();
        return data
    }
}