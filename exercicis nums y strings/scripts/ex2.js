// Fes un programa que demani un valor a l’usuari i indiqui si el valor és un enter o un decimal.

const user_input = prompt("Ingresa un numero")
!user_input || isNaN(parseFloat(user_input)) ? alert("Has d'introduir un numero")
: parseFloat(user_input) % 1 === 0 ? alert("Es enter") : alert("Es decimal")