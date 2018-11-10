const startScreen = document.querySelector('.startScreen');
const startScreenStep1 = startScreen.querySelector('.startScreen__step1');
const startScreenStep2 = startScreen.querySelector('.startScreen__step2');
const gameContainer = document.querySelector('.gameContainer');
const weaponsButton = document.querySelectorAll('.startScreen .button[data-weapon]');
const timesButton = document.querySelectorAll('.startScreen .button[data-time]');
const playersButton = document.querySelector('.players');
const playersValue = playersButton.querySelector('.players__value');
const nameContainer = document.querySelector('.startScreen__title.startScreen__title--player');

Resources.loadAudio('click');
Resources.loadAudio('tick', 0.2);
Resources.loadAudio('timeEnd', 0.3);

const gameInstance = new Game(gameContainer);

// player count

const MIN_PLAYER = 2;
const MAX_PLAYER = 4;

playersButton.addEventListener('click', function () {
    let currentValue = parseInt(playersValue.innerText);
    currentValue++;
    if (currentValue > MAX_PLAYER) {
        currentValue = MIN_PLAYER;
    }
    playersValue.innerText = currentValue;
    gameInstance.setMaxPlayers(currentValue);
    Resources.playAudio('click');
});

// weapon

const numerals = ['First', 'Second', 'Third', 'Fourth'];
let countPlayers = 0;
for (let i = 0; i < weaponsButton.length; i++) {
    const button = weaponsButton[i];
    const weapon = parseInt(button.dataset.weapon);
    button.addEventListener('click', () => {

        Resources.playAudio('click');
        const player = new Player(nameContainer.innerText, weapon);
        gameInstance.addPlayer(player);
        countPlayers++;
        nameContainer.innerText = numerals[countPlayers] + " player";
        button.classList.add('button--disabled');
        playersButton.classList.add('players--disabled');
        if (gameInstance.haveAllPlayers()) {
            startScreenStep2.style.display = 'block';
            startScreenStep1.style.display = 'none';
        }
    });
}

// time

for (let i = 0; i < timesButton.length; i++) {
    const button = timesButton[i];
    const time = parseInt(button.dataset.time);
    button.addEventListener('click', () => {
        Resources.playAudio('click');
        gameInstance.startGame(time);
        startScreenStep2.style.display = 'none';
        gameContainer.style.display = 'block';
    });
}

// audio

var audio = document.getElementById("backgroundAudio");
audio.volume = 0.25;

document.querySelector('.audio__button').addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        this.innerHTML = '<i class="mdi mdi-volume-off"></i>';
    } else {
        audio.pause();
        this.innerHTML = '<i class="mdi mdi-volume-high"></i>';
    }
});
