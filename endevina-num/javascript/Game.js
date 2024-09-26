class Game {
    MIN_NUMBER = 1;  // Minimum number allowed in the game
    MAX_NUMBER = 20; // Maximum number allowed in the game (can be changed by the user)

    constructor() {
        this.lives = 20; // Initial number of lives
        this.points = 0; // Initial points
        this.playerNums = []; // Array to store the numbers guessed by the player
        this.secretNumber = this.getRandomNumber(); // Secret number generated at the start of the game

        // Select elements from the DOM to display game information and manage user interaction
        this.mainContainer = document.querySelector("main");
        this.secretNumberContainer = document.getElementById("secret-num");
        this.hint = document.getElementById("hint");
        this.playerNumsElement = document.getElementById("player-nums");
        this.resetBtn = document.getElementById("btn-reset");

        // Retrieve header element and ask user for a custom maximum number for the game
        this.header = document.getElementById("header");
        const userMaxNum = prompt("Introdueix el valor maxim: ");
        this.MAX_NUMBER = userMaxNum !== null ? parseInt(userMaxNum) : 20; // Use user input or default to 20
        if (!this.header) return; // If header is not available, stop
        this.header.innerText = `Busca un número entre 1 i ${this.MAX_NUMBER}`; // Update header text

        // Select elements to display lives and points
        this.livesContainer = document.getElementById("lives");
        this.pointsContainer = document.getElementById("points");

        // Update the initial display of lives and points
        this.updateLives();
        this.updatePoints();

        // Get player input field and form elements
        this.playerInput = document.getElementById("in-player");
        this.playerForm = document.getElementById("form-player");

        // Add event listeners to handle game reset and form submission
        this.resetBtn?.addEventListener("click", () => this.reset());
        this.playerForm?.addEventListener("submit", (event) => this.checkPlayerNumber(event));
    }

    // Generate a random number between MIN_NUMBER and MAX_NUMBER
    getRandomNumber() {
        return Math.floor(Math.random() * (this.MAX_NUMBER - this.MIN_NUMBER + 1)) + this.MIN_NUMBER;
    }

    // Reset the game state, lives, and points, and update the UI accordingly
    reset() {
        if (!this.hint || !this.secretNumberContainer || !this.mainContainer) return;

        // Generate a new secret number and reset the displayed number
        this.secretNumber = this.getRandomNumber();
        this.secretNumberContainer.innerText = "?";
        this.hint.innerText = "Comencem la partida ..."; // Reset hint text
        this.mainContainer.style.backgroundColor = "var(--background)"; // Reset background color

        this.playerNums = []; // Clear player's guess history
        this.updatePlayerNums(); // Update the displayed guess history

        if (this.lives != 0) return; // If lives are not zero, don't reset lives and points
        this.lives = 20; // Reset lives
        this.points = 0; // Reset points

        this.updateLives(); // Update lives display
        this.updatePoints(); // Update points display
    }

    // Handle form submission, check the player's guessed number, and provide feedback
    checkPlayerNumber(event) {
        event.preventDefault(); // Prevent form from reloading the page
        if (!this.playerInput || !this.playerInput.value || this.secretNumber == null) return;

        const playerNumber = parseInt(this.playerInput.value); // Get and parse player's guess
        this.playerInput.value = ""; // Clear the input field

        if (!this.isValidNumber(playerNumber)) return; // Validate the player's number

        // Check if player's guess is correct, higher, or lower than the secret number
        if (playerNumber === this.secretNumber) this.foundSecretNumber();
        else if (playerNumber < this.secretNumber) this.lowerThanSecretNumber(playerNumber);
        else if (playerNumber > this.secretNumber) this.biggerThanSecretNumber(playerNumber);

        this.savePlayerNumber(playerNumber); // Save the guessed number in the history
    }

    // Save the player's guessed number and update the UI with the new guess
    savePlayerNumber(playerNumber) {
        this.playerNums.push(playerNumber); // Add player's guess to the history
        this.updatePlayerNums(); // Update the displayed guess history
    }

    // Validate if the player's guessed number is within the valid range
    isValidNumber(playerNumber) {
        if (isNaN(playerNumber)) {
            alert("El número introduït és incorrecte."); // Notify if the number is invalid
            return false;
        }

        if (playerNumber < this.MIN_NUMBER) {
            alert("El número és massa petit."); // Notify if the number is too small
            return false;
        }

        if (playerNumber > this.MAX_NUMBER) {
            alert("El número és massa gran."); // Notify if the number is too big
            return false;
        }

        return true; // If valid, return true
    }

    // Provide feedback if the guessed number is lower than the secret number
    lowerThanSecretNumber(playerNumber) {
        if (!this.hint) return;
        this.hint.innerText = `El número és més gran que ${playerNumber}`; // Update hint text
        this.decreaseLives(); // Decrease player's lives
    }

    // Decrease the player's lives and check if the game should end
    decreaseLives() {
        if (!this.livesContainer) return;

        this.lives--; // Decrease lives by one
        if (this.lives <= 0) this.endGame(); // End game if no lives remain
        this.updateLives(); // Update the displayed number of lives
    }

    // End the game when the player runs out of lives
    endGame() {
        if (!this.hint || !this.mainContainer) return;
        this.hint.innerText = "Final de la partida"; // Notify the player the game is over
        this.mainContainer.style.backgroundColor = "var(--red)"; // Change background to red to signal game over
    }

    // Provide feedback if the guessed number is higher than the secret number
    biggerThanSecretNumber(playerNumber) {
        if (!this.hint) return;
        this.hint.innerText = `El número és més petit que ${playerNumber}`; // Update hint text
        this.decreaseLives(); // Decrease player's lives
    }

    // Handle when the player guesses the secret number correctly
    foundSecretNumber() {
        if (!this.secretNumberContainer || this.secretNumber == null || !this.hint || !this.mainContainer) return;

        this.secretNumberContainer.innerText = this.secretNumber.toString(); // Display the secret number
        this.hint.innerText = 'Has trobat el número secret!!'; // Notify the player of their success
        this.increasePoints(); // Increase player's points
        this.mainContainer.style.backgroundColor = "var(--green)"; // Change background to green to indicate success
        this.secretNumber = null; // Invalidate the current secret number, game over
    }

    // Increase the player's points and update the UI
    increasePoints() {
        this.points++; // Increment points by one
        this.updatePoints(); // Update the displayed number of points
    }

    // Update the displayed number of lives in the UI
    updateLives() {
        if (this.livesContainer) {
            this.livesContainer.innerText = this.lives.toString(); // Update the lives text
        }
    }

    // Update the displayed number of points in the UI
    updatePoints() {
        if (this.pointsContainer) {
            this.pointsContainer.innerText = this.points.toString(); // Update the points text
        }
    }

    // Update the displayed history of guessed numbers
    updatePlayerNums() {
        if (!this.playerNumsElement) return;

        this.playerNumsElement.innerText = "Historial: " + this.playerNums.join(", "); // Display the player's guess history
    }
}
