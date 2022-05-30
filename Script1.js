// JavaScript source code
import drawObjects from './modules/draw.js';
import rotationFunction from './modules/orientation.js';
import crash from './modules/crash.js';
import shooting from './modules/shooting.js';

const theGame = () => {
    const CANVAS = document.getElementById("canvas");
    const CTX = CANVAS.getContext("2d");

    const player = {
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
    };

    const computer = {
        name: "computer",
        x: CANVAS.width,
        y: 100,
        w: 47,
        h: 15,
        speed: 4,
        degrees: 0,
        dx: 0,
        dy: 0,
        health: 100
    };

    const bullet = {
        w: 7,
        h: 3,
        speed: 40,
        counter: 0,
        amount: []
    };


    const textContent = () => {
        const playerHealth = document.getElementById("playerHealth");
        playerHealth.textContent = `PLAYER: ${player.health}`;

        const computerHealth = document.getElementById("computerHealth");
        computerHealth.textContent = `ENEMY: ${computer.health}`;
    }


    // CHANGING DIRECTION DEPENDING ON THE ANGLE OF AN OBJECT

    const orientation = (object) => {

        if (object.speed > 5) {
            object.speed = 5;
        } else if (object.speed < 1) {
            object.dy += 1;
        };
        if (object.speed < 0.2) {
            object.speed = 0.2;
        };

        if (object.degrees < -180) { object.degrees = 179 };
        if (object.degrees > 180) { object.degrees = -179 };


        object.x += object.dx * object.speed;
        object.y += object.dy * object.speed;

        rotationFunction(object);

        // SETTING LIMITATIONS FOR MOVING INSIDE OF THE CANVAS

        if (object.x < - object.w) {
            object.x = CANVAS.width + object.w;
        };
        if (object.x > CANVAS.width + object.w) {
            object.x = -object.w;
        };
        if (object.y < object.h) {
            object.y = object.h
        }


        // CHANGING COMPUTER MOVEMENT INTO ANOTHER DIRECTION (PREVENTING COMPUTER MOVING BACKWARDS)

        if (object === computer) {
            if (object.dx < 0) {
                object.dx = Math.abs(object.dx);
            }
            else {
                object.dx = -Math.abs(object.dx)
            };
            if (object.dy < 0) {
                object.dy = Math.abs(object.dy);
            }
            else {
                object.dy = -Math.abs(object.dy)
            };
        };
    };


    //KEYS

    const speedUp = () => {
        player.speed += 0.1;

    };
    const speedDown = () => {
        player.speed -= 0.1;
    };

    const moveRight = () => {
        player.degrees += player.speed;

    };
    const moveLeft = () => {
        player.degrees -= player.speed;
    };


    const keyDown = (e) => {
        if (e.key === "ArrowRight" || e.key === "Right") {
            moveRight();
        };
        if (e.key === "ArrowLeft" || e.key === "Left") {
            moveLeft();
        };
        if (e.key === "ArrowDown" || e.key === "Down") {
            speedDown();
        };
        if (e.key === "ArrowUp" || e.key === "Up") {
            speedUp();
        };
        if (e.key === " ") {
            shooting(player, computer, bullet);
        }
    };

    document.addEventListener("keydown", keyDown);

    //MOBILE CONTROL
    let trigger = false;
    let left = false;
    let right = false;
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
        if (trigger == true) shooting(player, computer, bullet);
        if (left == true) moveLeft();
        if (right == true) moveRight();
    };

    const autopilot = () => {

        // CRASH PROTECTION

        let emergencyHight = 0;

        const heightDetection = (() => {
            if (computer.y > 230 && computer.x > 300 && computer.x < 645) {
                emergencyHight = 1;
            }
            else if (computer.y > 270 && computer.x > 200 && computer.x <= 300 && computer.degrees > -135 && computer.degrees < 0) {
                emergencyHight = 2;
            }
            else if (computer.y > 270 && computer.x < 745 && computer.x >= 645 && computer.degrees < -45 && computer.degrees > -180) {
                emergencyHight = 3;
            }
            else if (computer.y > 270) {
                emergencyHight = 1
            }
        })();

        const antiCrash = () => {
            if (emergencyHight === 1) {
                if (computer.degrees >= -90 && computer.degrees <= 90) {
                    computer.degrees += 2;
                }
                else {
                    computer.degrees -= 2;
                }
            }
            else if (emergencyHight === 2) {
                computer.degrees += 2;
            }
            else if (emergencyHight === 3) {
                computer.degrees -= 2;
            }
        };

        // PLANE CHASING

        const chase = () => {
            if (player.x < computer.x) {
                if (computer.dx <= 0) {
                    if (player.y < computer.y) {
                        computer.degrees += 0.5;
                    }
                    else if (player.y > computer.y) {
                        computer.degrees -= 0.5;
                    }
                    else if (player.y === computer.y) {
                        return
                    }
                }
                else {
                    if (player.y < computer.y) {
                        computer.degrees += 0.5;
                    }
                    else if (player.y > computer.y) {
                        computer.degrees -= 0.5;
                    }
                }
            }
            else {
                if (player.y < computer.y) {
                    computer.degrees += 0.5;
                }
                else {
                    computer.degrees -= 0.5;
                }
            }
        }

        // MAKING DESICION BETWEEN CRASH PROTECTION AND CHASING

        if (emergencyHight !== 0) {
            antiCrash();
        } else {
            chase();
        }

        shooting(computer, player, bullet);
    };

    //ANIMATION

    const animating = () => {
        sensorButtons();
        textContent();
        autopilot();
        drawObjects(CTX, CANVAS, player, computer, bullet.amount);
        orientation(player);
        orientation(computer);
        crash(player, CTX);
        crash(computer, CTX);
        requestAnimationFrame(animating);
    };

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
