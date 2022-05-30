//KEYS
import shooting from './shooting.js';

const speedUp = (PROPERTIES) => {
    PROPERTIES.player.speed += 0.1;

};
const speedDown = (PROPERTIES) => {
    PROPERTIES.player.speed -= 0.1;
};

const moveRight = (PROPERTIES) => {
    PROPERTIES.player.degrees += PROPERTIES.player.speed;

};
const moveLeft = (PROPERTIES) => {
    PROPERTIES.player.degrees -= PROPERTIES.player.speed;
};


const keyControl = (PROPERTIES) => {


    const keyDown = (e) => {
        if (e.key === "ArrowRight" || e.key === "Right") {
            moveRight(PROPERTIES);
        };
        if (e.key === "ArrowLeft" || e.key === "Left") {
            moveLeft(PROPERTIES);
        };
        if (e.key === "ArrowDown" || e.key === "Down") {
            speedDown(PROPERTIES);
        };
        if (e.key === "ArrowUp" || e.key === "Up") {
            speedUp(PROPERTIES);
        };
        if (e.key === " ") {
            shooting(PROPERTIES.player, PROPERTIES.computer, PROPERTIES.bullet);
        }
    };

    document.addEventListener("keydown", keyDown);
}

let trigger = false;
let left = false;
let right = false;

const sensorControl = (PROPERTIES) => {
    //MOBILE CONTROL
    const sensorButtons = () => {
        const fireBtn = document.getElementById("fire");
        const leftBtn = document.getElementById("left");
        const rightBtn = document.getElementById("right");
        fireBtn.addEventListener("touchstart", () => trigger = true);
        fireBtn.addEventListener("touchend", () => trigger = false);
        leftBtn.addEventListener("touchstart", () => left = true);
        leftBtn.addEventListener("touchend", () => left = false);
        rightBtn.addEventListener("touchstart", () => right = true);
        rightBtn.addEventListener("touchend", () => right = false);
        if (trigger == true) shooting(PROPERTIES.player, PROPERTIES.computer, PROPERTIES.bullet);
        if (left == true) moveLeft(PROPERTIES);
        if (right == true) moveRight(PROPERTIES);
    };
    sensorButtons();
}

export { keyControl, sensorControl };