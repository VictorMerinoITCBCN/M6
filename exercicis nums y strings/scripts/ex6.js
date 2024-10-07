// Fes un programa que demani a l’usuari una paraula i determini si acaba amb un número o amb una lletra.

const userInput = prompt("Introdueix una paraula:")

isNaN(parseFloat(userInput[userInput.length-1])) 
? alert("Acaba amb una lletra.") 
: alert("Acaba amb un numero.")