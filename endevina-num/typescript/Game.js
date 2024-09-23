var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        var _a, _b;
        this.MIN_NUMBER = 1;
        this.MAX_NUMBER = 20;
        this.lives = 20;
        this.points = 0;
        this.secretNumber = this.getRandomNumber();
        this.mainContainer = document.querySelector("main");
        this.secretNumberContainer = document.getElementById("secret-num");
        this.hint = document.getElementById("hint");
        this.resetBtn = document.getElementById("btn-reset");
        this.livesContainer = document.getElementById("lives");
        this.pointsContainer = document.getElementById("points");
        this.updateLives();
        this.updatePoints();
        this.playerInput = document.getElementById("in-player");
        this.playerForm = document.getElementById("form-player");
        (_a = this.resetBtn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return _this.reset(); });
        (_b = this.playerForm) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", function (event) { return _this.checkPlayerNumber(event); });
    }
    Game.prototype.getRandomNumber = function () {
        return Math.floor(Math.random() * (this.MAX_NUMBER - this.MIN_NUMBER + 1)) + this.MIN_NUMBER;
    };
    Game.prototype.reset = function () {
        if (!this.hint || !this.secretNumberContainer || !this.mainContainer)
            return;
        this.secretNumber = this.getRandomNumber();
        this.secretNumberContainer.innerText = "?";
        this.hint.innerText = "Comencem la partida ...";
        this.mainContainer.style.backgroundColor = "var(--background)";
        if (this.lives != 0)
            return;
        this.lives = 20;
        this.points = 0;
        this.updateLives();
        this.updatePoints();
    };
    Game.prototype.checkPlayerNumber = function (event) {
        event.preventDefault();
        if (!this.playerInput || !this.playerInput.value || this.secretNumber == null)
            return;
        var playerNumber = parseInt(this.playerInput.value);
        this.playerInput.value = "";
        if (!this.isValidNumber(playerNumber))
            return;
        if (playerNumber === this.secretNumber)
            this.foundSecretNumber();
        else if (playerNumber < this.secretNumber)
            this.lowerThanSecretNumber(playerNumber);
        else if (playerNumber > this.secretNumber)
            this.biggerThanSecretNumber(playerNumber);
    };
    Game.prototype.isValidNumber = function (playerNumber) {
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
    };
    Game.prototype.lowerThanSecretNumber = function (playerNumber) {
        if (!this.hint)
            return;
        this.hint.innerText = "El n\u00FAmero \u00E9s m\u00E9s gran que ".concat(playerNumber);
        this.decreaseLives();
    };
    Game.prototype.decreaseLives = function () {
        if (!this.livesContainer)
            return;
        this.lives--;
        if (this.lives <= 0)
            this.endGame();
        this.updateLives();
    };
    Game.prototype.endGame = function () {
        if (!this.hint || !this.mainContainer)
            return;
        this.hint.innerText = "Final de la partida";
        this.mainContainer.style.backgroundColor = "var(--red)";
    };
    Game.prototype.biggerThanSecretNumber = function (playerNumber) {
        if (!this.hint)
            return;
        this.hint.innerText = "El n\u00FAmero \u00E9s m\u00E9s petit que ".concat(playerNumber);
        this.decreaseLives();
    };
    Game.prototype.foundSecretNumber = function () {
        if (!this.secretNumberContainer || this.secretNumber == null || !this.hint || !this.mainContainer)
            return;
        this.secretNumberContainer.innerText = this.secretNumber.toString();
        this.hint.innerText = 'Has trobat el número secret!!';
        this.increasePoints();
        this.mainContainer.style.backgroundColor = "var(--green)";
        this.secretNumber = null;
    };
    Game.prototype.increasePoints = function () {
        this.points++;
        this.updatePoints();
    };
    Game.prototype.updateLives = function () {
        if (this.livesContainer) {
            this.livesContainer.innerText = this.lives.toString();
        }
    };
    Game.prototype.updatePoints = function () {
        if (this.pointsContainer) {
            this.pointsContainer.innerText = this.points.toString();
        }
    };
    return Game;
}());
