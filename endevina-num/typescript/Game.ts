class Game {
    MIN_NUMBER = 1;
    MAX_NUMBER = 20;

    lives: number;
    points: number;
    playerNums: Array<number>;
    secretNumber: number | null;

    mainContainer: HTMLElement | null;
    secretNumberContainer: HTMLElement | null;
    hint: HTMLElement | null;

    playerInput: HTMLInputElement | null;
    playerForm: HTMLFormElement | null;
    playerNumsElement: HTMLElement | null;

    resetBtn: HTMLButtonElement | null;

    header: HTMLElement | null;
    livesContainer: HTMLElement | null;
    pointsContainer: HTMLElement | null;

    constructor() {
        this.lives = 20;
        this.points = 0;
        this.playerNums = [];
        this.secretNumber = this.getRandomNumber();

        this.mainContainer = document.querySelector("main");
        this.secretNumberContainer = document.getElementById("secret-num");
        this.hint = document.getElementById("hint");
        this.playerNumsElement = document.getElementById("player-nums");
        this.resetBtn = document.getElementById("btn-reset") as HTMLButtonElement | null;

        this.header = document.getElementById("header");
        const userMaxNum = prompt("Introdueix el valor maxim: ")
        this.MAX_NUMBER = userMaxNum !== null ? parseInt(userMaxNum) : 20;
        if (!this.header) return;
        this.header.innerText = `Busca un número entre 1 i ${this.MAX_NUMBER}`

        this.livesContainer = document.getElementById("lives");
        this.pointsContainer = document.getElementById("points");

        this.updateLives();
        this.updatePoints();

        this.playerInput = document.getElementById("in-player") as HTMLInputElement | null;
        this.playerForm = document.getElementById("form-player") as HTMLFormElement | null;

        this.resetBtn?.addEventListener("click", () => this.reset());
        this.playerForm?.addEventListener("submit", (event) => this.checkPlayerNumber(event));
    }

    getRandomNumber(): number {
        return Math.floor(Math.random() * (this.MAX_NUMBER - this.MIN_NUMBER + 1)) + this.MIN_NUMBER;
    }

    reset(): void {
        if (!this.hint || !this.secretNumberContainer || !this.mainContainer) return;

        this.secretNumber = this.getRandomNumber();
        this.secretNumberContainer.innerText = "?";
        this.hint.innerText = "Comencem la partida ...";
        this.mainContainer.style.backgroundColor = "var(--background)"

        this.playerNums = []
        this.updatePlayerNums()

        if (this.lives != 0) return
        this.lives = 20;
        this.points = 0;

        this.updateLives();
        this.updatePoints();
    }

    checkPlayerNumber(event: Event): void {
        event.preventDefault();
        if (!this.playerInput || !this.playerInput.value || this.secretNumber == null) return;

        const playerNumber = parseInt(this.playerInput.value);
        this.playerInput.value = "";

        if (!this.isValidNumber(playerNumber)) return

        if (playerNumber === this.secretNumber) this.foundSecretNumber();
        else if (playerNumber < this.secretNumber) this.lowerThanSecretNumber(playerNumber);
        else if (playerNumber > this.secretNumber) this.biggerThanSecretNumber(playerNumber);

        this.savePlayerNumber(playerNumber);
    }

    savePlayerNumber(playerNumber: number): void {
        this.playerNums.push(playerNumber);
        this.updatePlayerNums();
    }

    isValidNumber(playerNumber : number): boolean {
        if (isNaN(playerNumber)) {
            alert("El número introduït és incorrecte.")
            return false;
        }

        if (playerNumber < this.MIN_NUMBER) {
            alert("El número és massa petit.");
            return false;
        }

        if (playerNumber > this.MAX_NUMBER) {
            alert("El número és massa gran.");
            return false;
        }

        return true;
    }

    lowerThanSecretNumber(playerNumber: number): void {
        if (!this.hint) return;
        this.hint.innerText = `El número és més gran que ${playerNumber}`;
        this.decreaseLives();
    }

    decreaseLives(): void {
        if (!this.livesContainer) return;

        
        this.lives--;
        if (this.lives <= 0) this.endGame();
        this.updateLives();
    }

    endGame() : void {
        if (!this.hint || !this.mainContainer ) return;
        this.hint.innerText = "Final de la partida"
        this.mainContainer.style.backgroundColor = "var(--red)"
    }

    biggerThanSecretNumber(playerNumber: number): void {
        if (!this.hint) return;
        this.hint.innerText = `El número és més petit que ${playerNumber}`;
        this.decreaseLives();
    }

    foundSecretNumber(): void {
        if (!this.secretNumberContainer || this.secretNumber == null|| !this.hint || !this.mainContainer) return;

        this.secretNumberContainer.innerText = this.secretNumber.toString();
        this.hint.innerText = 'Has trobat el número secret!!';
        this.increasePoints();
        this.mainContainer.style.backgroundColor = "var(--green)";
        this.secretNumber = null;
    }

    increasePoints(): void {
        this.points++;
        this.updatePoints();
    }

    updateLives(): void {
        if (this.livesContainer) {
            this.livesContainer.innerText = this.lives.toString();
        }
    }

    updatePoints(): void {
        if (this.pointsContainer) {
            this.pointsContainer.innerText = this.points.toString();
        }
    }

    updatePlayerNums(): void {
        if (!this.playerNumsElement) return

        this.playerNumsElement.innerText = "Historial: "+this.playerNums.join(", ")
    }
}
