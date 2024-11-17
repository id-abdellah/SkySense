/**
 * Celsius to Fahrenheit
 * @param {number} c 
 * @returns number 
 */

export function celsiusToFahrenheit(c) {
    return +((c * (9 / 5)) + 32).toFixed(2)
}


/**
 * Celsius to Kelvin
 * @param {number} c 
 * @returns {number}
 */

export function celsiusToKelvin(c) {
    return +(c + 273.15).toFixed(2)
}


/**
 * Conver windSpeed m/s => miles/h | k/h
 * @param {number} ws wind speed in m/s
 * @param {string} to miles/h || kilometers/h
 * @returns {number}
 */

export function windSpeedMS(ws, to) {
    if (to == "mph") {
        return +(ws * 2.237).toFixed(2)
    } else if (to == "kmph") {
        return +(ws * 3.6).toFixed(2)
    }
    return -1
}


/**
 * Pressure conversion
 * hPa => mmHg
 * hPa => atm
 */

export function pressure_to_mmHg(p) {
    return +(p * 0.75006).toFixed(4)
}

export function pressure_to_atm(p) {
    return +(p / 1013.25).toFixed(2)
}


/**
 * Visibility Conversion
 * meters => km
 * meters => miles
 */

export function visib_to_km(v) {
    return v / 1000
}

export function visib_to_miles(v) {
    return v / 1609.34
}