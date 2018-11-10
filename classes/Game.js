class Game {
    constructor(gameContainer) {
        this.gameContainer = gameContainer;
        this.timer = null;
        this.timeContainer = document.querySelector('.timer');
        this.players = [];
        this.maxPlayers = 2;
        this.board = new BigBoard(gameContainer);
        this.currentPlayerIndex = 0;
        this.createBoardLine();
    }

    setMaxPlayers(maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    createBoardLine() {
        var boardLines = document.getElementById('boardLines').content;
        this.gameContainer.appendChild(document.importNode(boardLines, true))
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    showWinnerScreen(weapon) {
        const div = document.createElement('div');
        div.className = `winnerScreen winnerScreen--${WEAPON_NAME[weapon]}`;
        if (weapon === WEAPON.DRAW) {
            div.innerHTML = `
            <div class="winnerScreen__title">no winners, no losers</div>
            <div class="winnerScreen__weapon">is draw</div>
            <div class="winnerScreen__button">
                <button class="button button--${WEAPON_NAME[weapon]} button--normal">
                    <div class="button__weapon button__weapon--autoWidth">
                        <i class="mdi mdi-refresh"></i> play again
                    </div>
                </button>
            </div>
        `;
        } else {
            div.innerHTML = `
            <div class="winnerScreen__title">The winer is </div>
            <div class="winnerScreen__weapon">${WEAPON_NAME[weapon]}</div>
            <div class="winnerScreen__button">
                <button class="button button--${WEAPON_NAME[weapon]} button--normal">
                    <div class="button__weapon button__weapon--autoWidth">
                        <i class="mdi mdi-refresh"></i> play again
                    </div>
                </button>
            </div>
        `;
        }

        div.querySelector('button').addEventListener('click', function () {
            window.location.reload();
        });
        this.gameContainer.appendChild(div);
    }

    nextRound() {
        this.currentPlayerIndex++;
        this.currentPlayerIndex = this.currentPlayerIndex % this.maxPlayers;
        const result = this.board.checkValues();
        if (result !== null) {
            this.timer.stop();
            this.timeContainer.innerHTML = "";
            this.showWinnerScreen(result);
        } else {
            this.refreshBackground();
            this.timer.nextPlayer();
        }
    }

    refreshBackground() {
        document.body.className = `game game--${this.getCurrentPlayer().getWeaponName()}Round`;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    haveAllPlayers() {
        return this.maxPlayers === this.players.length;
    }

    handleEndTime() {
        var currentWeapon = this.getCurrentPlayer().getWeapon();
        this.board.chooseRandomField(currentWeapon);
        this.nextRound();
    }

    startGame(timeFormMove) {
        this.timer = new Timer(this.players, this.timeContainer, this.handleEndTime.bind(this));
        this.timer.setMaxTime(timeFormMove);
        this.refreshBackground();
    }

}
