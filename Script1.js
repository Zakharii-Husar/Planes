// JavaScript source code
import drawObjects from './modules/draw.js';
import orientation from './modules/orientation.js';
import crash from './modules/crash.js';
import autopilot from './modules/autopilot.js';
import { keyControl, sensorControl } from './modules/control.js';

const theGame = () => {

    const PROPERTIES = {
        player: {
            name: "player",
            x: 47,
            y: 100,
            w: 47,
            h: 15,
            speed: 4,
            degrees: 0,
            dx: 2,
            dy: 0,
            health: 100
        },
        computer: {
            name: "computer",
            x: document.getElementById("canvas").width,
            y: 100,
            w: 47,
            h: 15,
            speed: 4,
            degrees: 0,
            dx: 0,
            dy: 0,
            health: 100
        },
        bullet: {
            w: 7,
            h: 3,
            speed: 40,
            counter: 0,
            amount: []
        },
        canvas: document.getElementById("canvas"),
        ctx: document.getElementById("canvas").getContext("2d")
    };


    const textContent = () => {
        const playerHealth = document.getElementById("playerHealth");
        playerHealth.textContent = `PLAYER: ${PROPERTIES.player.health}`;

        const computerHealth = document.getElementById("computerHealth");
        computerHealth.textContent = `ENEMY: ${PROPERTIES.computer.health}`;
    }

    //ANIMATION

    const animating = () => {
        sensorControl(PROPERTIES);
        textContent();
        autopilot(PROPERTIES);
        drawObjects(PROPERTIES);
        orientation(PROPERTIES.player, PROPERTIES.canvas);
        orientation(PROPERTIES.computer, PROPERTIES.canvas);
        crash(PROPERTIES.player, PROPERTIES.ctx);
        crash(PROPERTIES.computer, PROPERTIES.ctx);
        requestAnimationFrame(animating);
    };
    keyControl(PROPERTIES);
    animating();
}

//MENU

const fullScreen = () => {
    container.requestFullscreen(); screen.orientation.lock('landscape')
};


const start = () => {
    theGame();
    fullScreen();
};

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", start);
