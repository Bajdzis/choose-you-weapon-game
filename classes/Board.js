class Board {
    constructor(container) {
        this.fields = [];
        this.element = document.createElement('div');
        this.element.classList.add('board');
        this.container = document.createElement('div');
        this.container.className = 'board__container';
        for (let x = 0; x < 3; x++) {
            this.fields.push([]);
            for (let y = 0; y < 3; y++) {
                this.fields[x].push(new Field(this.container));
            }
        }
        this.element.appendChild(this.container);
        container.appendChild(this.element);
    }

    getValue() {
        const weapon = checkTheResult(this.fields);
        if (weapon !== null) {
            this.element.classList.add('board--resolve');
            this.element.classList.add(`board--${WEAPON_NAME[weapon]}`);
            this.element.innerHTML = `<button class="button button--medium button--active button--${WEAPON_NAME[weapon]}">
            <i class="mdi mdi-${WEAPON_ICON[weapon]} button__weapon"></i>
            </button>`;
        }
        return weapon;
    }

    chooseRandomField(weapon) {
        const notWinnerFields = this.getNotWinnerFields();
        const random = Math.round(Math.random() * (notWinnerFields.length - 1));
        notWinnerFields[random].setValue(weapon);
    }

    getNotWinnerFields() {
        const notWinnerFields = [];
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const field = this.fields[x][y];
                if (field.getValue() === null) {
                    notWinnerFields.push(field);
                }
            }
        }
        return notWinnerFields;
    }
}
