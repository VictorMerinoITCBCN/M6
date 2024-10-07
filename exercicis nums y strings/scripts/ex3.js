// Fes un programa que permeti realitzar la conversió entre temperatures de  ºC a ºF  i de ºF a ºC, d’acord amb la següent fórmula: 
// 			ºF = (9.0/5.0)* (ºC)+32. 
// El programa ha de demanar a l’usuari quina conversió ha de fer (“C” o “F”) i la temperatura que es vol convertir.

const celsiusToFahrenheit = (c) => {
    return c * 9/5 + 32
}

const fahrenheitToCelsius = (f) => {
    return (f-32) / (9/5)
}

const validateTempUnits = (unit) => {
    return unit?.toLocaleLowerCase() === "f" || unit?.toLocaleLowerCase() === "c"
}

const user_option = prompt("Quina conversió vols fer ('C' o 'F')?")
const user_temp = prompt("Indica la temperatura:")
if ( user_option && validateTempUnits(user_option) && user_temp) {
    const  res = user_option?.toLowerCase() === "f" 
    ? celsiusToFahrenheit(parseFloat(user_temp)) 
    : fahrenheitToCelsius(parseFloat(user_temp))

    alert(`${res} º${user_option.toUpperCase()}`)
}