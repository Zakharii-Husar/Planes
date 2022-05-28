// JavaScript source code
import rotationFunction from './orientation.js';

const theGame = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const player = {
        x: 94,
        y: 100,
        w: 94,
        h: 30,
        speed: 4,
        degrees: 0,
        dx: 2,
        dy: 0,
        health: 100,
        bullet: {
            w: 10,
            h: 5,
            speed: 40
        },
        bulletArr: []
    };

    const computer = {
        x: canvas.width,
        y: 100,
        w: 94,
        h: 30,
        speed: 4,
        degrees: 0,
        dx: 0,
        dy: 0,
        health: 100,
        bullet: {
            w: 0,
            h: 0,
            speed: 40,
            invisibleBulletSpeed: 4000
        },
        bulletArr: []
    };


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

    //CREATING PLAYER'S AND COMPUTER'S PLANES WITH ABILITY TO ROTATE

    const drawingPlanes = () => {

        const plane1 = new Image();
        plane1.src = "img/plane1.png";
        plane1.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawRotateImage(plane1,
                player.x,
                player.y,
                player.w,
                player.h,
                player.degrees);
        };

        const plane2 = new Image();
        plane2.src = "img/plane2.png";
        plane2.onload = () => {
            drawRotateImage(plane2,
                computer.x,
                computer.y,
                computer.w,
                computer.h,
                computer.degrees);
        };


    };

    // CREATING BULLETS

    class Shot {
        constructor(w, h, x, y, dx, dy, degrees, target, bulletW, bulletH, bulletSpeed) {
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
                computer.bullet.w = 10;
                computer.bullet.h = 5;
                computer.bullet.speed = 40;
            }
            else {
                computer.bullet.w = 0;
                computer.bullet.h = 0;
                computer.bullet.speed = computer.bullet.invisibleBulletSpeed;
            }
            this.x += this.dx * this.bulletSpeed;
            this.y += this.dy * this.bulletSpeed;
        }
        draw() {
            let bulletPic = new Image();
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
        for (let i = 0; i < player.bulletArr.length; i++) {
            player.bulletArr[i].update();
            player.bulletArr[i].draw();
        };

        for (let j = 0; j < computer.bulletArr.length; j++) {
            computer.bulletArr[j].update();
            computer.bulletArr[j].draw();
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
        computer.bullet.w = 0;
        computer.bullet.h = 0;

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

    // MANUAL CONTROL
    let shootingTimer = 0;
    let shootingFrequency = 10;
    const playerShooting = () => {
        if (shootingTimer === shootingFrequency) {
            player.bulletArr.push(new Shot(
                player.w,
                player.h,
                player.x,
                player.y,
                player.dx,
                player.dy,
                player.degrees,
                computer,
                player.bullet.w,
                player.bullet.h,
                player.bullet.speed))
            setTimeout(function () { player.bulletArr.shift() }, 900);
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
            playerShooting();
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
        if (trigger == true) playerShooting();
        if (left == true) moveLeft();
        if (right == true) moveRight();
    };
    // BOT'S CONTROL

    const computerShooting = () => {
        if (shootingTimer === shootingFrequency) {
            computer.bulletArr.push(new Shot(
                computer.w,
                computer.h,
                computer.x - 40,
                computer.y,
                computer.dx,
                computer.dy,
                computer.degrees,
                player,
                computer.bullet.w,
                computer.bullet.h,
                computer.bullet.speed));
            setTimeout(function () { computer.bulletArr.shift() }, 900);
            shootingTimer = 0;
        }
        shootingTimer += 1;
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

        computerShooting();
    };

    //ANIMATION

    const animating = () => {
        sensorButtons();
        textContent();
        autopilot();
        drawingPlanes();
        orientation(player);
        orientation(computer);
        crashConditions(player);
        crashConditions(computer);
        drawBullets();
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
