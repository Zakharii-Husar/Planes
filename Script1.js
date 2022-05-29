// JavaScript source code
import rotationFunction from './orientation.js';

const theGame = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const player = {
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
        x: canvas.width,
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
        speed: 40
    }

    const bulletArr = [];


    const textContent = () => {
        const playerHealth = document.getElementById("playerHealth");
        playerHealth.textContent = `PLAYER: ${player.health}`;

        const computerHealth = document.getElementById("computerHealth");
        computerHealth.textContent = `ENEMY: ${computer.health}`;
    }

    const drawRotateImage = (pic, x, y, w, h, degrees) => {
        ctx.save();
        ctx.translate(x - w / 2, y - h / 2);
        ctx.rotate(degrees * Math.PI / 180.0);
        ctx.translate(- x - w / 2, - y - h / 2);
        ctx.drawImage(pic, x, y, w, h);
        ctx.restore();
    }

    //CREATING PLAYER'S AND COMPUTER'S PLANES & BULLETS WITH ABILITY TO ROTATE
    class Shot {
        constructor(w, h, x, y, dx, dy, degrees, bulletW, bulletH, bulletSpeed, target) {
            this.w = w;
            this.h = h;
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.degrees = degrees;
            this.target = target;
            this.bulletW = bulletW;
            this.bulletH = bulletH;
            this.bulletSpeed = bulletSpeed;
        }
        update() {
            if (this.x >= this.target.x &&
                this.x <= this.target.x + this.target.w &&
                this.y >= this.target.y &&
                this.y <= this.target.y + this.target.h) {
                this.target.health -= 1;
            }
            this.x += this.dx * this.bulletSpeed;
            this.y += this.dy * this.bulletSpeed;
        }
        draw() {
            const bulletPic = new Image();
            if (this.target == computer) {
                bulletPic.src = "img/bullet.png";
            }
            else {
                bulletPic.src = "img/bullet2.png";
            }
            bulletPic.onload = () => {
                drawRotateImage(bulletPic,
                    this.x - this.w / 2,
                    this.y - this.h / 2,
                    this.bulletW,
                    this.bulletH,
                    this.degrees);
            }
        }
    };

    const drawBullets = () => {
        for (let i = 0; i < bulletArr.length; i++) {
            bulletArr[i].update();
            bulletArr[i].draw();
        };
    };

    const shooting = (shooter) => {
        const interval = setInterval(()=>{
        
            bulletArr.push(new Shot(
                shooter.w,
                shooter.h,
                shooter.x,
                shooter.y,
                shooter.dx,
                shooter.dy,
                shooter.degrees,
                bullet.w,
                bullet.h,
                bullet.speed,
                shooter == computer ? player : computer));
                setTimeout(function () { bulletArr.shift(); }, 500);
                clearInterval(interval);
        },200)

    };

    const drawObjects = () => {

        const playersPlanePic = new Image();
        playersPlanePic.src = "img/plane1.png";
        const computersPlanePic = new Image();
        computersPlanePic.src = "img/plane2.png";

        playersPlanePic.onload = () => {
            computersPlanePic.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawRotateImage(playersPlanePic,
                    player.x,
                    player.y,
                    player.w,
                    player.h,
                    player.degrees);
                drawRotateImage(computersPlanePic,
                    computer.x,
                    computer.y,
                    computer.w,
                    computer.h,
                    computer.degrees);
                drawBullets();
            }
        };


    };


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
            object.x = canvas.width + object.w;
        };
        if (object.x > canvas.width + object.w) {
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

    // EXPLOSION OF PLANES

    let counter = 0;
    let frameIndex = 0;

    const crash = (object) => {
        if (counter > 12) { frameIndex += 1; counter = 0 };
        let sprite = new Image();
        sprite.src = "img/explosion.png";
        counter += 1;
        object.dx = 0;
        object.dy = 0;

        ctx.drawImage(
            sprite,
            frameIndex * 99.9,
            frameIndex * 98.5,
            99.9,
            98.5,
            object.x - object.w,
            object.y - object.h,
            99.9,
            98.5,
        );

        // RESTORE PLANES AFTER CRASH
        const defaultSettings = () => {
            if (object === player) {
                object.x = 0;
            } else {
                object.x = canvas.width + computer.w
            };
            object.health = 100;
            object.y = 100;
            object.speed = 5;
            object.degrees = 0;
            object.dx = 2;
        };

        setTimeout(() => {
            defaultSettings();
            frameIndex = 0;
        }, 1000)
    };

    // CONDITIONS TO CONSIDER PLANE CRASHED

    const crashConditions = (object) => {
        if (object.y > 300) { crash(object) }
        else if (
            object.x > 200 && object.x < 500 && object.y > 280) { crash(object) }
        else if (object.health < 0) {
            crash(object);
        }
    }


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
            shooting(player);
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
        if (trigger == true) shooting(player);
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

        shooting(computer);
    };

    //ANIMATION

    const animating = () => {
        sensorButtons();
        textContent();
        autopilot();
        drawObjects();
        orientation(player);
        orientation(computer);
        crashConditions(player);
        crashConditions(computer);
        requestAnimationFrame(animating);
        console.log(bulletArr.length);
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
