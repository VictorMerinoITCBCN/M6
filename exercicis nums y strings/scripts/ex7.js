// Fes un programa que demani a l’usuari una paraula i posi la primerar lletra en majúscula i la resta en minúscules.

const userInput = prompt("Intodueix una paraula")

const capitalizedUserInput = userInput[0].toUpperCase() + userInput.slice(1)

alert(capitalizedUserInput)