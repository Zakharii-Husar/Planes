// JavaScript source code
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 94,
    y: 100,
    w: 94,
    h: 30,
    speed: 5,
    degrees: 0,
    dx: 2,
    dy: 0,
    health: 100
};

const computer = {
    x: canvas.width,
    y: 100,
    w: 94,
    h: 30,
    speed: 5,
    degrees: 0,
    dx: 0,
    dy: 0,
    health: 100
};

const playerBullet = {
    w: 10,
    h: 5,
    speed: 40
};

const computerBullet = {
    w: 0,
    h: 0,
    speed: 40,
    invisibleBulletSpeed: 4000
};

let playersBulletArr = [];
let computersBulletArr = [];

const textContent = () => {
    const playerHealth = document.getElementById("playerHealth");
    playerHealth.textContent = `PLAYER: ${player.health}`;

    const computerHealth = document.getElementById("computerHealth");
    computerHealth.textContent = `ENEMY: ${computer.health}`;
}

//CREATING PLAYER'S AND COMPUTER'S PLANES WITH ABILITY TO ROTATE

const drawingPlanes = () => {
    let plane1 = new Image();
    plane1.src = "img/plane1.png";
    plane1.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(player.x - player.w / 2, player.y - player.h / 2);
        ctx.rotate(player.degrees * Math.PI / 180.0);
        ctx.translate(-player.x - player.w / 2, -player.y - player.h / 2);
        ctx.drawImage(plane1, player.x, player.y, player.w, player.h);
        ctx.restore();
    };

    let plane2 = new Image();
    plane2.src = "img/plane2.png";
    plane2.onload = () => {
        ctx.save();
        ctx.translate(computer.x - computer.w / 2, computer.y - computer.h / 2);
        ctx.rotate(computer.degrees * Math.PI / 180.0);
        ctx.translate(-computer.x - computer.w / 2, -computer.y - computer.h / 2);
        ctx.drawImage(plane2, computer.x, computer.y, computer.w, computer.h);
        ctx.restore();
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
            computerBullet.w = 10;
            computerBullet.h = 5;
            computerBullet.speed = 40;
        }
        else {
            computerBullet.w = 0;
            computerBullet.h = 0;
            computerBullet.speed = computerBullet.invisibleBulletSpeed;
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
            ctx.save();
            ctx.translate(this.x - this.w / 2, this.y - this.h / 2);
            ctx.rotate(this.degrees * Math.PI / 180.0);
            ctx.translate(- this.x - this.w / 2, - this.y - this.h / 2);
            ctx.drawImage(bulletPic, this.x + this.w, this.y + this.h / 2, this.bulletW, this.bulletH);
            ctx.restore();
        }
    }
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


    //left/up
    if (object.degrees >= -180 && object.degrees < -170) {
        object.dx = -0.9;
        object.dy = -0.1;
    } else if (object.degrees >= -170 && object.degrees < -160) {
        object.dx = -0.8;
        object.dy = -0.2;
    } else if (object.degrees >= -160 && object.degrees < -150) {
        object.dx = -0.7;
        object.dy = -0.3;
    } else if (object.degrees >= -150 && object.degrees < -140) {
        object.dx = -0.6;
        object.dy = -0.4;
    } else if (object.degrees >= -140 && object.degrees < -130) {
        object.dx = -0.5;
        object.dy = -0.5;
    } else if (object.degrees >= -130 && object.degrees < -120) {
        object.dx = -0.4;
        object.dy = -0.6;
    } else if (object.degrees >= -120 && object.degrees < -110) {
        object.dx = -0.3;
        object.dy = -0.7;
    } else if (object.degrees >= -110 && object.degrees < -100) {
        object.dx = -0.2;
        object.dy = -0.8;
    } else if (object.degrees >= -100 && object.degrees < -90) {
        object.dx = -0.1;
        object.dy = -0.9;
    }

    //right//up
    if (object.degrees >= -90 && object.degrees < -80) {
        object.dx = 0.1;
        object.dy = -0.9;
    } else if (object.degrees >= -80 && object.degrees < -70) {
        object.dx = 0.2;
        object.dy = -0.8;
    } else if (object.degrees >= -70 && object.degrees < -60) {
        object.dx = 0.3;
        object.dy = -0.7;
    } else if (object.degrees >= -60 && object.degrees < -50) {
        object.dx = 0.4;
        object.dy = -0.6;
    } else if (object.degrees >= -50 && object.degrees < -40) {
        object.dx = 0.5;
        object.dy = -0.5;
    } else if (object.degrees >= -40 && object.degrees < -30) {
        object.dx = 0.6;
        object.dy = -0.4;
    } else if (object.degrees >= -30 && object.degrees < -20) {
        object.dx = 0.7;
        object.dy = -0.3;
    } else if (object.degrees >= -20 && object.degrees < -10) {
        object.dx = 0.8;
        object.dy = -0.2;
    } else if (object.degrees >= -10 && object.degrees < 0) {
        object.dx = 0.9;
        object.dy = -0.1;
    }


    // right/down
    if (object.degrees >= 0 && object.degrees < 10) {
        object.dx = 0.9;
        object.dy = 0.1;
    } else if (object.degrees >= 10 && object.degrees < 20) {
        object.dx = 0.8;
        object.dy = 0.2;
    } else if (object.degrees >= 20 && object.degrees < 30) {
        object.dx = 0.7;
        object.dy = 0.3;
    } else if (object.degrees >= 30 && object.degrees < 40) {
        object.dx = 0.6;
        object.dy = 0.4;
    } else if (object.degrees >= 40 && object.degrees < 50) {
        object.dx = 0.5;
        object.dy = 0.5;
    } else if (object.degrees >= 50 && object.degrees < 60) {
        object.dx = 0.4;
        object.dy = 0.6;
    } else if (object.degrees >= 60 && object.degrees < 70) {
        object.dx = 0.3;
        object.dy = 0.7;
    } else if (object.degrees >= 70 && object.degrees < 80) {
        object.dx = 0.2;
        object.dy = 0.8;
    } else if (object.degrees >= 80 && object.degrees < 90) {
        object.dx = 0.1;
        object.dy = 0.9;
    }

    //left/down
    if (object.degrees >= 90 && object.degrees < 100) {
        object.dx = -0.1;
        object.dy = 0.9;
    } else if (object.degrees >= 100 && object.degrees < 110) {
        object.dx = -0.2;
        object.dy = 0.8;
    } else if (object.degrees >= 110 && object.degrees < 120) {
        object.dx = -0.3;
        object.dy = 0.7;
    } else if (object.degrees >= 120 && object.degrees < 130) {
        object.dx = -0.4;
        object.dy = 0.6;
    } else if (object.degrees >= 130 && object.degrees < 140) {
        object.dx = -0.5;
        object.dy = 0.5;
    } else if (object.degrees >= 140 && object.degrees < 150) {
        object.dx = -0.6;
        object.dy = 0.4;
    } else if (object.degrees >= 150 && object.degrees < 160) {
        object.dx = -0.7;
        object.dy = 0.3;
    } else if (object.degrees >= 160 && object.degrees < 170) {
        object.dx = -0.8;
        object.dy = 0.2;
    } else if (object.degrees >= 170 && object.degrees < 180) {
        object.dx = -0.9;
        object.dy = 0.1;
    }


 // SETTING LIMITATIONS FOR MOVING INSIDE OF THE CANVAS

        if (object.x < - 94) {
            object.x = canvas.width + 94;
        };
        if (object.x > canvas.width + object.w) {
            object.x = -94;
        };
        if (object.y < 30) {
            object.y = 30
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

// EXPLOSION OF A PLANE IN CASE OF COLISION WITH EARTH OR THE HANGAR

let counter = 0;
let frameIndex = 0;

const crash = (object) => {
        if (counter > 12) { frameIndex += 1; counter = 0 };
        let sprite = new Image();
        sprite.src = "img/explosion.png";
    counter += 1;
    object.dx = 0;
    object.dy = 0;
    computerBullet.w = 0;
    computerBullet.h = 0;

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

    setTimeout(() => {
        if (object === player) {
            object.x = 0;
        } else {
            object.x = canvas.width + 126
        };
        object.health = 100;
        object.y = 100;
        object.speed = 3;
        object.degrees = 0;
        object.dx = 2;
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

const playerShooting = () => {
    playersBulletArr.push(new Shot(
        player.w,
        player.h,
        player.x,
        player.y,
        player.dx,
        player.dy,
        player.degrees,
        computer,
        playerBullet.w,
        playerBullet.h,
        playerBullet.speed));
    setTimeout(function () { playersBulletArr.shift() }, 1000);

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
const container = document.getElementById("container");

let rotationRate;


const fireBtn = document.getElementById("fire");
fireBtn.addEventListener("click", () => { container.requestFullscreen(); });
window.screen.orientation.lock('landscape');

const phonePosition = () => {

    window.addEventListener("deviceorientation", function (event) {
        rotationRate = event.alpha// process  event.beta and event.gamma
    }, true);

    if (rotationRate > 0 && rotationRate < 180) {
        moveLeft();
    }
    else {
        moveRight();
    }
}



//SO FAR USELESS

//const keyUp = (e) => {
//    if (e.key === "ArrowRight" || e.key === "Right" ||
//        e.key === "ArrowLeft" || e.key === "Left" ||
//        e.key === "ArrowDown" || e.key === "Down" ||
//        e.key === "ArrowUp" || e.key === "Up" || e.key === " ") {

//    }
//};

//document.addEventListener("keyup", keyUp);

// BOT'S CONTROL

const computerShooting = () => {
    computersBulletArr.push(new Shot(
        computer.w,
        computer.h,
        computer.x - 40,
        computer.y,
        computer.dx,
        computer.dy,
        computer.degrees,
        player,
        computerBullet.w,
        computerBullet.h,
        computerBullet.speed));
    setTimeout(function () { computersBulletArr.shift() }, 1000);

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
       else if (computer.y > 270 && computer.x < 745 && computer.x >= 645 && computer.degrees < -45 && computer.degrees > -180 ) {
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

    if (emergencyHight != 0) {
        antiCrash();
    } else {
        chase();
    }

    computerShooting();
};


//ANIMATION

const animating = () => {
    phonePosition();
    textContent();
    autopilot();
    drawingPlanes();
    orientation(player);
    orientation(computer);
    crashConditions(player);
    crashConditions(computer);
    for (let i = 0; i < playersBulletArr.length; i++) {
            playersBulletArr[i].update();
            playersBulletArr[i].draw();
    };
    for (let j = 0; j < computersBulletArr.length; j++) {
        computersBulletArr[j].update();
        computersBulletArr[j].draw();
    };
    requestAnimationFrame(animating);
};

animating();