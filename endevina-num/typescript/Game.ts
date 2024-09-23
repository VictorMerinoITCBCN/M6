class Game {
    MIN_NUMBER = 1;
    MAX_NUMBER = 20;

    lives: number;
    points: number;
    secretNumber: number | null;

    mainContainer: HTMLElement | null;
    secretNumberContainer: HTMLElement | null;
    hint: HTMLElement | null;

    playerInput: HTMLInputElement | null;
    playerForm: HTMLFormElement | null;

    resetBtn: HTMLButtonElement | null;

    livesContainer: HTMLElement | null;
    pointsContainer: HTMLElement | null;

    constructor() {
        this.lives = 20;
        this.points = 0;
        this.secretNumber = this.getRandomNumber();

        this.mainContainer = document.querySelector("main");
        this.secretNumberContainer = document.getElementById("secret-num");
        this.hint = document.getElementById("hint");
        this.resetBtn = document.getElementById("btn-reset") as HTMLButtonElement | null;

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
    }

    isValidNumber(playerNumber : number) : boolean {
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
}
