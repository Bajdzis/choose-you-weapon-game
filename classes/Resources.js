const audioInstance = {};

class Resources {
    static loadAudio(audioNames, volume = 1) {
        audioInstance[audioNames] = new Audio(`./sounds/${audioNames}.mp3`);
        audioInstance[audioNames].volume = volume;
    }
    static playAudio(audioName) {
        const clone = audioInstance[audioName].cloneNode(true);
        clone.volume = audioInstance[audioName].volume;
        clone.play();
    }
}
