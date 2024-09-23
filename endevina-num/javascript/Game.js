class Game {
    constructor() {
        //Set the values to the max and min number for the secret number
        this.MIN_NUMBER = 1;
        this.MAX_NUMBER = 20;

        //Set the values of the initial lives and points
        this.lives = 20;
        this.points = 0;
        //Generate a secret random number between the max and min numbers
        this.secretNumber = this.getRandomNumber();

        //Get de HTML elements
        this.mainContainer = document.querySelector("main");
        this.secretNumberContainer = document.getElementById("secret-num");
        this.hint = document.getElementById("hint");
        this.resetBtn = document.getElementById("btn-reset");

        this.livesContainer = document.getElementById("lives");
        this.pointsContainer = document.getElementById("points");

        //Set the lives and points values for it respectives HTML elements
        this.updateLives();
        this.updatePoints();

        //Get the HTML elements of the player input and the form
        this.playerInput = document.getElementById("in-player");
        this.playerForm = document.getElementById("form-player");

        //Add a click event listener to the reset button
        this.resetBtn?.addEventListener("click", () => this.reset());
        //Add a submit event listener to the player form
        this.playerForm?.addEventListener("submit", (event) => this.checkPlayerNumber(event));
    }

    //Generate a random number between the max and the min values
    getRandomNumber() {
        return Math.floor(Math.random() * (this.MAX_NUMBER - this.MIN_NUMBER + 1)) + this.MIN_NUMBER;
    }

    //Generate a new secret number, reset the background color
    //and set the variables to it initial values if the player has no lives
    reset() {
        if (!this.hint || !this.secretNumberContainer || !this.mainContainer) return;

        this.secretNumber = this.getRandomNumber();
        this.secretNumberContainer.innerText = "?";
        this.hint.innerText = "Comencem la partida ...";
        this.mainContainer.style.backgroundColor = "var(--background)";

        if (this.lives != 0) return;
        this.lives = 20;
        this.points = 0;

        this.updateLives();
        this.updatePoints();
    }

    //Compare the player input with the secret number
    checkPlayerNumber(event) {
        event.preventDefault();
        if (!this.playerInput || !this.playerInput.value || this.secretNumber == null) return;

        const playerNumber = parseInt(this.playerInput.value);
        this.playerInput.value = "";

        if (!this.isValidNumber(playerNumber)) return;

        if (playerNumber === this.secretNumber) this.foundSecretNumber();
        else if (playerNumber < this.secretNumber) this.lowerThanSecretNumber(playerNumber);
        else if (playerNumber > this.secretNumber) this.biggerThanSecretNumber(playerNumber);
    }

    //return if the number is valid
    isValidNumber(playerNumber) {
        if (isNaN(playerNumber)) {
            alert("El número introduït és incorrecte.");
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

    //Show a hint and decrease live points
    lowerThanSecretNumber(playerNumber) {
        if (!this.hint) return;
        this.hint.innerText = `El número és més gran que ${playerNumber}`;
        this.decreaseLives();
    }

    //Decrease live points
    decreaseLives() {
        if (!this.livesContainer) return;

        this.lives--;
        if (this.lives <= 0) this.endGame();
        this.updateLives();
    }

    //Change the hint message and the background
    endGame() {
        if (!this.hint || !this.mainContainer) return;
        this.hint.innerText = "Final de la partida";
        this.mainContainer.style.backgroundColor = "var(--red)";
    }

    //Show a hint and decrease live points
    biggerThanSecretNumber(playerNumber) {
        if (!this.hint) return;
        this.hint.innerText = `El número és més petit que ${playerNumber}`;
        this.decreaseLives();
    }

    //Change the hint message and the background and icrease points
    foundSecretNumber() {
        if (!this.secretNumberContainer || this.secretNumber == null || !this.hint || !this.mainContainer) return;

        this.secretNumberContainer.innerText = this.secretNumber.toString();
        this.hint.innerText = "Has trobat el número secret!!";
        this.increasePoints();
        this.mainContainer.style.backgroundColor = "var(--green)";
        this.secretNumber = null;
    }
    //Increase points
    increasePoints() {
        this.points++;
        this.updatePoints();
    }

    //Update the HTML element with the value
    updateLives() {
        if (this.livesContainer) {
            this.livesContainer.innerText = this.lives.toString();
        }
    }
    
    //Update the HTML element with the value
    updatePoints() {
        if (this.pointsContainer) {
            this.pointsContainer.innerText = this.points.toString();
        }
    }
}
