/* eslint-disable no-unused-vars */
/**
 * Celsius to Fahrenheit
 * @param {number} c 
 * @returns number 
 */

function celsiusToFahrenheit(c) {
    return +((c * (9 / 5)) + 32).toFixed(2)
}


/**
 * Celsius to Kelvin
 * @param {number} c 
 * @returns {number}
 */

function celsiusToKelvin(c) {
    return +(c + 273.15).toFixed(2)
}


/**
 * Conver windSpeed m/s => miles/h | k/h
 * @param {number} ws wind speed in m/s
 * @param {string} to miles/h || kilometers/h
 * @returns {number}
 */

function windSpeedMS(ws, to) {
    if (to == "mih") {
        return +(ws * 2.237).toFixed(2)
    } else if (to == "kmh") {
        return +(ws * 3.6).toFixed(2)
    }
}


/**
 * Pressure conversion
 * hPa => mmHg
 * hPa => atm
 */

function pressure_to_mmHg(p) {
    return +(p * 0.75006).toFixed(2)
}

function pressure_to_atm(p) {
    return +(p / 1013.25).toFixed(2)
}


/**
 * Visibility Conversion
 * meters => km
 * meters => miles
 */

function visib_to_km(v) {
    return (v / 1000).toFixed(2)
}

function visib_to_miles(v) {
    return (v / 1609.34).toFixed(2)
}

export const unitConversion = {
    tempConversion(currValue, to) {
        if (to == "f") return celsiusToFahrenheit(currValue);
        if (to == "k") return celsiusToKelvin(currValue);
        return currValue
    },
    windspeedConversion(currValue, to) {
        if (to == "mih") return windSpeedMS(currValue, "mih") + " mi/h";
        if (to == "kmh") return windSpeedMS(currValue, "kmh") + " km/h"
        return currValue + " m/s"
    },
    pressureConversion(currValue, to) {
        if (to == "mmHg") return pressure_to_mmHg(currValue);
        if (to == "atm") return pressure_to_atm(currValue);
        return currValue
    },
    visibilityConversion(currValue, to) {
        if (to == "km") return visib_to_km(currValue);
        if (to == "miles") return visib_to_miles(currValue);
        return currValue
    }
}