class Game {
    MIN_NUMBER = 1;
    MAX_NUMBER = 20;

    lives: number;
    points: number;
    secretNumber: number;

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
        if (!this.hint || !this.secretNumberContainer) return;

        this.secretNumber = this.getRandomNumber();
        this.secretNumberContainer.innerText = "?";
        this.hint.innerText = "Comencem la partida ...";
    }

    checkPlayerNumber(event: Event): void {
        event.preventDefault();
        if (!this.playerInput || !this.playerInput.value) return;

        const playerNumber = parseInt(this.playerInput.value);
        this.playerInput.value = "";

        if (isNaN(playerNumber)) return;

        if (playerNumber === this.secretNumber) this.foundSecretNumber();
        else if (playerNumber < this.secretNumber) this.lowerThanSecretNumber(playerNumber);
        else if (playerNumber > this.secretNumber) this.biggerThanSecretNumber(playerNumber);
    }

    lowerThanSecretNumber(playerNumber: number): void {
        if (!this.hint) return;
        this.hint.innerText = `El número és més gran que ${playerNumber}`;
        this.subtractLive();
    }

    subtractLive(): void {
        if (!this.livesContainer) return;
        if (!this.hint) return
        if (this.lives <= 0) {
            this.hint.innerText = "Has perdut totes les vides!";
            return
        }
        this.lives--;
        this.updateLives();
    }

    biggerThanSecretNumber(playerNumber: number): void {
        if (!this.hint) return;
        this.hint.innerText = `El número és més petit que ${playerNumber}`;
        this.subtractLive();
    }

    foundSecretNumber(): void {
        if (!this.secretNumberContainer || !this.hint) return;

        this.secretNumberContainer.innerText = this.secretNumber.toString();
        this.hint.innerText = 'Has trobat el número secret!!';
        this.sumPoints();
    }

    sumPoints(): void {
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
