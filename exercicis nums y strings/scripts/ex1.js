// Fes un programa que demani un valor a l’usuari i indiqui si el valor és un número.
// Fes servir l’operador ternari per mostrar la informació.

const user_input = prompt("Ingresa un numero: ")
!user_input ? alert("No has introduit res")
: isNaN(parseFloat(user_input)) ? alert("No es un numero") : alert("Es un numero") 