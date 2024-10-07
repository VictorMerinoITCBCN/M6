// Fes un programa que demani a l’usuari un número de 5 dígits, comprovi que s’ha afegit correctament els 5 dígits i informi si aquest número comença i acaba amb el mateix valor.

const isPalindrome = (str) => {
    return str[0] === str[str.length-1]
}

const num = prompt("Introdueix un numero de 5 digits:")

num.length === 5 && !isNaN(parseFloat(num)) ? isPalindrome(num) ? alert("El numero es palindrome") : alert("El numero no es palindrome")
: alert("Numero incorrecte.")
