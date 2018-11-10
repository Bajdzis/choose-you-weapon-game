class Timer {
    constructor(players, container, callback) {
        this.players = players;
        this.container = container;
        this.callback = callback;
        this.nextTimeout = 1000;
        this.maxTime = 3000;
        this.currentTime = 0;
        this.currentPlayer = 0;
        this.createDOM();
        this.intervalId = null;
        this.start();
    }

    createDOM() {
        let html = "";
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            html += `<button class="button button--${player.getWeaponName()} button--normal button--active">
                <div class="button__weapon button__weapon--autoWidth"><i class="mdi mdi-${player.getIconName()}"></i><span class="timer__time" data-timer-player-id="${i}"></span></div>
            </button>`;
        }
        this.container.innerHTML = html;
        this.timers = this.container.querySelectorAll('[data-timer-player-id]');
    }

    showTime() {
        let seconds = (this.maxTime - this.currentTime) / 1000;
        const minutes = Math.floor(seconds / 60);
        seconds = new String(seconds % 60);
        for (let i = 0; i < this.timers.length; i++) {
            const timer = this.timers[i];
            if (this.currentPlayer === i) {
                timer.classList.add('timer__time--active');
                timer.parentNode.parentNode.classList.remove('button--disabled');
            } else {
                timer.classList.remove('timer__time--active');
                timer.parentNode.parentNode.classList.add('button--disabled');

            }
            timer.innerHTML = `${minutes}:${seconds.padStart(2, '0')}`
        }
    }

    setMaxTime(seconds) {
        this.maxTime = seconds * 1000;
        this.showTime();
    }

    nextPlayer() {
        this.currentPlayer++;
        this.currentPlayer = this.currentPlayer % this.players.length;
        this.currentTime = 0;
        this.showTime();
        this.start();
    }

    handlerTimeout() {
        this.currentTime += this.nextTimeout;
        if (this.currentTime === this.maxTime) {
            this.stop();
            this.callback();
            Resources.playAudio('timeEnd');
        } else {
            Resources.playAudio('tick');
        }
        this.showTime();
    }

    start() {
        this.stop();
        Resources.playAudio('tick');
        this.intervalId = setInterval(this.handlerTimeout.bind(this), this.nextTimeout);
    }

    stop() {
        if (this.intervalId === null) {
            return;
        }
        clearInterval(this.intervalId);
    }

}