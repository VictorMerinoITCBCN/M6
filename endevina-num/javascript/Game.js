class Game {
    constructor() {
        //Max and min default number for de secret number
        this.MIN_NUMBER = 1;
        this.MAX_NUMBER = 20;

        //Number of lives and initial points
        this.lives = 20;
        this.points = 0;
        this.secretNumber = this.getRandomNumber();

        //Get the game elements from de DOM
        this.secretNumberContainer = document.getElementById("secret-num");
        this.hint = document.getElementById("hint");
        this.resetBtn = document.getElementById("btn-reset");

        this.livesContainer = document.getElementById("lives");
        this.pointsContainer = document.getElementById("points");

        //Set the initial values on the lives and points DOM elements
        this.updateLives();
        this.updatePoints();

        //Get the game elements from de DOM
        this.playerInput = document.getElementById("in-player");
        this.playerForm = document.getElementById("form-player");

        //Add click event listener on the reset button if exists
        if (this.resetBtn) {
            this.resetBtn.addEventListener("click", () => this.reset());
        }
        //Add submit event listener on the form if exists
        if (this.playerForm) {
            this.playerForm.addEventListener("submit", (event) => this.checkPlayerNumber(event));
        }
    }

    //generate a random number between the max and the min values
    getRandomNumber() {
        return Math.floor(Math.random() * (this.MAX_NUMBER - this.MIN_NUMBER + 1)) + this.MIN_NUMBER;
    }

    //Reset the game
    reset() {
        if (!this.hint || !this.secretNumberContainer) return;

        this.secretNumber = this.getRandomNumber();
        this.secretNumberContainer.innerText = "?";
        this.hint.innerText = "Comencem la partida ...";
    }

    //Compare the player number with the secret one
    checkPlayerNumber(event) {
        event.preventDefault();
        if (!this.playerInput || this.secretNumber == null || !this.playerInput.value) return;

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

    //Add a hint in the hint element
    lowerThanSecretNumber(playerNumber) {
        if (!this.hint) return;
        this.hint.innerText = `El número és més gran que ${playerNumber}`;
        this.decreaseLive();
    }
    //Decrease the lives number if the lives are higher than 0
    decreaseLive() {
        if (!this.livesContainer || !this.hint) return;
        if (this.lives <= 0) {
            this.hint.innerText = "Has perdut totes les vides!";
            return
        }
        this.lives--;
        this.updateLives();
    }

    //Add a hint in the hint element
    biggerThanSecretNumber(playerNumber) {
        if (!this.hint) return;
        this.hint.innerText = `El número és més petit que ${playerNumber}`;
        this.decreaseLive();
    }

    //Add the winner text to the hint element
    foundSecretNumber() {
        if (!this.secretNumberContainer || !this.hint) return;

        this.secretNumberContainer.innerText = this.secretNumber.toString();
        this.hint.innerText = 'Has trobat el número secret!!';
        this.increasePoints();
        this.secretNumber = null;
    }

    //Increase the number of points
    increasePoints() {
        this.points++;
        this.updatePoints();
    }

    //Set the lives value to the DOM element
    updateLives() {
        if (this.livesContainer) {
            this.livesContainer.innerText = this.lives.toString();
        }
    }
    //Set the points value to the DOM element
    updatePoints() {
        if (this.pointsContainer) {
            this.pointsContainer.innerText = this.points.toString();
        }
    }
}
