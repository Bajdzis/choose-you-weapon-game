class Field {
    constructor(boardContainer) {
        this.value = null;
        this.element = document.createElement('div');
        this.element.addEventListener('click', this.handlerClick.bind(this));
        this.element.classList.add('board__field');

        this.element.innerHTML = `<button class="button button--small">
            <i class="mdi button__weapon"></i>
        </button>`;

        boardContainer.appendChild(this.element);
    }

    getValue() {
        return this.value;
    }

    handlerClick() {
        if (this.value === null) {
            const player = gameInstance.getCurrentPlayer();
            const weapon = player.getWeapon();
            window.navigator.vibrate(200);
            this.setValue(weapon);
            gameInstance.nextRound();
        }
    }

    setValue(weapon) {
        this.value = weapon;
        this.element.innerHTML = `<button class="button button--small button--${WEAPON_NAME[weapon]}">
            <i class="mdi mdi-${WEAPON_ICON[weapon]} button__weapon"></i>
        </button>`;
    }
}
