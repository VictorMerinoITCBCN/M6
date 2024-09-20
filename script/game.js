var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        var _a, _b;
        this.MIN_NUMBER = 1;
        this.MAX_NUMBER = 20;
        this.lives = 20;
        this.points = 0;
        this.secretNumber = this.getRandomNumber();
        this.secretNumberContainer = document.getElementById("secret-num");
        this.hint = document.getElementById("hint");
        this.resetBtn = document.getElementById("btn-reset");
        this.playerInput = document.getElementById("in-player");
        this.playerForm = document.getElementById("form-player");
        (_a = this.resetBtn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return _this.reset(); });
        (_b = this.playerForm) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", function (event) { return _this.checkPlayerNumber(event); });
    }
    Game.prototype.getRandomNumber = function () {
        return Math.floor(Math.random() * (this.MAX_NUMBER - this.MIN_NUMBER)) + this.MIN_NUMBER;
    };
    Game.prototype.reset = function () {
        var _a, _b;
        if (!((_a = this.hint) === null || _a === void 0 ? void 0 : _a.innerText))
            return;
        if (!((_b = this.secretNumberContainer) === null || _b === void 0 ? void 0 : _b.innerText))
            return;
        this.secretNumber = this.getRandomNumber();
        this.secretNumberContainer.innerText = "?";
        this.hint.innerText = "Comencem la partida ...";
    };
    Game.prototype.checkPlayerNumber = function (event) {
        var _a;
        event.preventDefault();
        if (!((_a = this.playerInput) === null || _a === void 0 ? void 0 : _a.value))
            return;
        var playerNumber = parseInt(this.playerInput.value);
        this.playerInput.value = "";
        if (playerNumber == this.secretNumber)
            this.foundSecretNumber();
        if (playerNumber < this.secretNumber)
            this.lowerThanSecretNumber(playerNumber);
        if (playerNumber > this.secretNumber)
            this.biggerThanSecretNumber(playerNumber);
    };
    Game.prototype.lowerThanSecretNumber = function (playerNumber) {
        var _a;
        if (!((_a = this.hint) === null || _a === void 0 ? void 0 : _a.innerText))
            return;
        this.hint.innerText = "El n\u00FAmero \u00E9s m\u00E9s gran que ".concat(playerNumber);
        this.lives--;
    };
    Game.prototype.biggerThanSecretNumber = function (playerNumber) {
        var _a;
        if (!((_a = this.hint) === null || _a === void 0 ? void 0 : _a.innerText))
            return;
        this.hint.innerText = "El n\u00FAmero \u00E9s m\u00E9s petit que ".concat(playerNumber);
        this.lives--;
    };
    Game.prototype.foundSecretNumber = function () {
        var _a, _b;
        if (!((_a = this.secretNumberContainer) === null || _a === void 0 ? void 0 : _a.innerText))
            return;
        if (!((_b = this.hint) === null || _b === void 0 ? void 0 : _b.innerText))
            return;
        this.secretNumberContainer.innerText = this.secretNumber.toString();
        this.hint.innerText = 'Has trobat el número secret!!';
        this.points++;
    };
    return Game;
}());
var game = new Game();
