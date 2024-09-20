class Game {
    MIN_NUMBER = 1
    MAX_NUMBER = 20

    lives : number
    points : number
    secretNumber : number

    secretNumberContainer : HTMLElement | null
    hint : HTMLElement | null

    playerInput : HTMLInputElement | null
    playerForm : HTMLFormElement | null

    resetBtn : HTMLButtonElement | null

    constructor() {
        this.lives = 20
        this.points = 0
        this.secretNumber = this.getRandomNumber()

        this.secretNumberContainer = document.getElementById("secret-num")
        this.hint = document.getElementById("hint")
        this.resetBtn = document.getElementById("btn-reset") as HTMLButtonElement | null

        this.playerInput = document.getElementById("in-player") as HTMLInputElement | null
        this.playerForm = document.getElementById("form-player") as HTMLFormElement | null

        this.resetBtn?.addEventListener("click", () => this.reset())
        this.playerForm?.addEventListener("submit", (event) => this.checkPlayerNumber(event))
    }

    getRandomNumber() : number {
        return Math.floor(Math.random() * (this.MAX_NUMBER - this.MIN_NUMBER)) + this.MIN_NUMBER
    }

    reset() : void {
        if (!this.hint?.innerText) return
        if (!this.secretNumberContainer?.innerText) return

        this.secretNumber = this.getRandomNumber()
        this.secretNumberContainer.innerText = "?"
        this.hint.innerText = "Comencem la partida ..."
    }

    checkPlayerNumber(event : Event) : void {
        event.preventDefault()
        if (!this.playerInput?.value) return

        const playerNumber = parseInt(this.playerInput.value)
        this.playerInput.value = ""

        if (playerNumber == this.secretNumber) this.foundSecretNumber()
        if (playerNumber < this.secretNumber) this.lowerThanSecretNumber(playerNumber)
        if (playerNumber > this.secretNumber) this.biggerThanSecretNumber(playerNumber)
    }

    lowerThanSecretNumber(playerNumber : number) {
        if (!this.hint?.innerText) return
        this.hint.innerText = `El número és més gran que ${playerNumber}`
        this.lives--
    }

    biggerThanSecretNumber(playerNumber : number) {
        if (!this.hint?.innerText) return
        this.hint.innerText = `El número és més petit que ${playerNumber}`
        this.lives--
    }

    foundSecretNumber() {
        if (!this.secretNumberContainer?.innerText) return
        if (!this.hint?.innerText) return

        this.secretNumberContainer.innerText = this.secretNumber.toString()
        this.hint.innerText = 'Has trobat el número secret!!'
        this.points++
    }
}

const game = new Game()