class Game {
    constructor() {
        this.MIN_NUMBER = 1;
        this.MAX_NUMBER = 20;

        this.lives = 20;
        this.points = 0;
        this.secretNumber = this.getRandomNumber();

        this.secretNumberContainer = document.getElementById("secret-num");
        this.hint = document.getElementById("hint");
        this.resetBtn = document.getElementById("btn-reset");

        this.livesContainer = document.getElementById("lives");
        this.pointsContainer = document.getElementById("points");

        this.updateLives();
        this.updatePoints();

        this.playerInput = document.getElementById("in-player");
        this.playerForm = document.getElementById("form-player");

        if (this.resetBtn) {
            this.resetBtn.addEventListener("click", () => this.reset());
        }

        if (this.playerForm) {
            this.playerForm.addEventListener("submit", (event) => this.checkPlayerNumber(event));
        }
    }

    getRandomNumber() {
        return Math.floor(Math.random() * (this.MAX_NUMBER - this.MIN_NUMBER + 1)) + this.MIN_NUMBER;
    }

    reset() {
        if (!this.hint || !this.secretNumberContainer) return;

        this.secretNumber = this.getRandomNumber();
        this.secretNumberContainer.innerText = "?";
        this.hint.innerText = "Comencem la partida ...";
    }

    checkPlayerNumber(event) {
        event.preventDefault();
        if (!this.playerInput || !this.playerInput.value) return;

        const playerNumber = parseInt(this.playerInput.value);
        this.playerInput.value = "";

        if (isNaN(playerNumber)) return;

        if (playerNumber === this.secretNumber) {
            this.foundSecretNumber();
        } else if (playerNumber < this.secretNumber) {
            this.lowerThanSecretNumber(playerNumber);
        } else if (playerNumber > this.secretNumber) {
            this.biggerThanSecretNumber(playerNumber);
        }
    }

    lowerThanSecretNumber(playerNumber) {
        if (!this.hint) return;
        this.hint.innerText = `El número és més gran que ${playerNumber}`;
        this.subtractLive();
    }

    subtractLive() {
        if (!this.livesContainer || !this.hint) return;
        if (this.lives <= 0) {
            this.hint.innerText = "Has perdut totes les vides!";
            return
        }
        this.lives--;
        this.updateLives();
    }

    biggerThanSecretNumber(playerNumber) {
        if (!this.hint) return;
        this.hint.innerText = `El número és més petit que ${playerNumber}`;
        this.subtractLive();
    }

    foundSecretNumber() {
        if (!this.secretNumberContainer || !this.hint) return;

        this.secretNumberContainer.innerText = this.secretNumber.toString();
        this.hint.innerText = 'Has trobat el número secret!!';
        this.sumPoints();
    }

    sumPoints() {
        this.points++;
        this.updatePoints();
    }

    updateLives() {
        if (this.livesContainer) {
            this.livesContainer.innerText = this.lives.toString();
        }
    }

    updatePoints() {
        if (this.pointsContainer) {
            this.pointsContainer.innerText = this.points.toString();
        }
    }
}
