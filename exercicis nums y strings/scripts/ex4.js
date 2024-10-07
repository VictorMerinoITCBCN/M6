// Fes un programa que demani a l’usuari el temps total d’una trucada demanant primer els minuts i després els segons.
// Mostreu l’import sense IVA i calculant l’IVA (21%) sabent que la companyia telefònica cobra 10 cèntims per establir una connexió telefònica i a partir d’aquest moment, 5 cèntims per minut tarificant per segons. 

const inputInt = (text) => {
    const res = prompt(text)
    if (!res || isNaN(parseInt(res))) return 0

    return parseInt(res)
}

const userMin = inputInt("Minuts: ")
const userSeg = inputInt("Segons: ") + userMin*60

const tarifa = 5/60

const rawPrice = tarifa * userSeg /100
const priceWthIVA = rawPrice * .21 + rawPrice / 100

alert(`Preu sense IVA ${rawPrice.toFixed(2)} €`)
alert(`Preu amb IVA ${priceWthIVA.toFixed(2)} €`)

