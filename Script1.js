// JavaScript source code
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 126,
    y: 100,
    w: 126,
    h: 39,
    speed: 3,
    degrees: 0,
    dx: 2,
    dy: 0
};

const computer = {
    x: canvas.width,
    y: 100,
    w: 126,
    h: 39,
    speed: 5,
    degrees: 0,
    dx: 0,
    dy: 0
};

const barn = {
    x: canvas.width / 2 - 174,
    y: 300,
    w: 348,
    h: 150
};


const bullet = {
    w: 20,
    h: 10,
    speed: 10
};

let bulletArr = [];



const backGround = () => {
    let skyGrass = new Image();
    skyGrass.src = "img/1.jpg";
    skyGrass.onload = () => {
        ctx.drawImage(skyGrass, 0, 0, 852, 480);
    };
    let barnPic = new Image();
    barnPic.src = "img/hang.png";
    barnPic.onload = () => {
        ctx.drawImage(barnPic, barn.x, barn.y, barn.w, barn.h);
        
    };
};

//CREATING PLAYER'S AND COMPUTER'S PLANES WITH ABILITY TO ROTATE

const planesPosition = () => {
    let plane1 = new Image();
    plane1.src = "img/plane1.png";
    plane1.onload = () => {
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
    constructor(w, h, x, y, dx, dy, degrees) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.degrees = degrees;
        this.speed = bullet.speed;
    }
    update() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }
    draw() {
        let bulletPic = new Image();
        bulletPic.src = "img/bullet.png";
        bulletPic.onload = () => {
            //ctx.save();
            //ctx.translate(player.x - player.w / 2, player.y - player.h / 2);
            //ctx.rotate(bullet.degrees * Math.PI / 180.0);
            //ctx.translate(-player.x - player.w / 2, -player.y - player.h / 2);
            //ctx.drawImage(bulletPic, bullet.x, bullet.y, bullet.w, bullet.h);
            //ctx.restore();

            ctx.save();
            ctx.translate(this.x - this.w / 2, this.y - this.h / 2);
            ctx.rotate(this.degrees * Math.PI / 180.0);
            ctx.translate(- this.x - this.w / 2, - this.y - this.h / 2);
            ctx.drawImage(bulletPic, this.x + this.w, this.y + this.h / 2, bullet.w, bullet.h);
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

        if (object.x < -126) {
            object.x = canvas.width + 126;
        };
        if (object.x > canvas.width + object.w) {
            object.x = -126;
        };
        if (object.y < 39) {
            object.y = 39
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
        sprite.src = "img/explosion1.png";
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

// RESTORE planesPosition AFTER CRASH

    setTimeout(() => {
        if (object === player) {
            object.x = 0;
        } else {
            object.x = canvas.width + 126
        };
        object.y = 100;
        object.speed = 3;
        object.degrees = 0;
        object.dx = 2;
            frameIndex = 0;
        }, 1000)
};

// CONDITIONS TO CONSIDER PLANE CRASHED

const colisionDetection = (object) => {
    if (object.y > 400) { crash(object) }
    else if (
        object.x > barn.x + 80 && object.x < barn.x + barn.w && object.y > barn.y) { crash(object) };
};

// MANUAL CONTROL

const speedUp = (object) => {
    object.speed += 0.1;

};
const speedDown = (object) => {
    object.speed -= 0.1;
};

const moveRight = (object) => {
    object.degrees += object.speed;

};
const moveLeft = (object) => {
    object.degrees -= object.speed;
};

function playerShooting() {
    bulletArr.push(new Shot(player.w, player.h, player.x, player.y, player.dx, player.dy, player.degrees))
}

const keyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "Right") {
        moveRight(player);
    };
    if (e.key === "ArrowLeft" || e.key === "Left") {
        moveLeft(player);
    };
    if (e.key === "ArrowDown" || e.key === "Down") {
        speedDown(player);
    };
    if (e.key === "ArrowUp" || e.key === "Up") {
        speedUp(player);
    };
    if (e.key === " ") {
        playerShooting();
    }
};

//SO FAR USELESS

const keyUp = (e) => {
    if (e.key === "ArrowRight" || e.key === "Right" ||
        e.key === "ArrowLeft" || e.key === "Left" ||
        e.key === "ArrowDown" || e.key === "Down" ||
        e.key === "ArrowUp" || e.key === "Up" || e.key === " ") {

        setTimeout(function () { fuse = 0; bullet.dx = 0; bullet.dy = 0; }, 1000)
    }
};

// COMPUTER CONTROL

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
        if (player.x <= computer.x) {
            if (computer.dx <= 0) {
                if (player.y < computer.y) {
                    computer.degrees += 1;
                }
                else if (player.y > computer.y) {
                    computer.degrees -= 1;
                }
                else if (player.y === computer.y) {
                    return
                }
            }
            else {
                if (player.y < computer.y) {
                    computer.degrees += 1;
                }
                else if (player.y > computer.y) {
                    computer.degrees -= 1;
                }
            }
        }
        else {
                if (player.y <= computer.y) {
                    computer.degrees += 1;
                }
                else {
                    computer.degrees -= 1;
                }
        }
    }

// MAKING DESICION BETWEEN CRASH PROTECTION AND CHASING

    if (emergencyHight != 0) {
        antiCrash();
    } else {
        chase();
    }
};

console.log(bulletArr)

//ANIMATION

const drawing = () => {
    autopilot();
    backGround();
    planesPosition();
    orientation(player);
    orientation(computer);
    colisionDetection(player);
    colisionDetection(computer);
    if (bulletArr !== 0) {
        for (let i = 0; i < bulletArr.length; i++) {
            bulletArr[i].update();
            bulletArr[i].draw();
        }
    }
    requestAnimationFrame(drawing);
};

drawing();


document.addEventListener("keyup", keyUp);
document.addEventListener("keydown", keyDown);