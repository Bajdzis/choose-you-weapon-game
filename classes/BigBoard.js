class BigBoard {
    constructor(container) {
        this.boards = [];
        this.element = document.createElement('table');
        this.element.className = 'boardBig';
        this.container = document.createElement('tbody');
        this.container.className = 'boardBig__container';
        for (let x = 0; x < 3; x++) {
            const tr = document.createElement('tr');
            this.container.appendChild(tr);
            this.boards.push([]);
            for (let y = 0; y < 3; y++) {
                const td = document.createElement('td');
                tr.appendChild(td);

                const board = new Board(td);
                this.boards[x].push(board);
            }
        }
        this.element.appendChild(this.container);
        container.appendChild(this.element);
    }

    checkValues() {
        const result = checkTheResult(this.boards);
        return result;
    }

    chooseRandomField(weapon) {
        const notWinnerBoards = this.getNotWinnerBoards();
        const random = Math.round(Math.random() * (notWinnerBoards.length - 1));
        notWinnerBoards[random].chooseRandomField(weapon);
    }

    getNotWinnerBoards() {
        const notWinnerBoards = [];
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const board = this.boards[x][y];
                if (board.getValue() === null) {
                    notWinnerBoards.push(board);
                }
            }
        }
        return notWinnerBoards;
    }
}
