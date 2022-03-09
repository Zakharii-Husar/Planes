export const orientation = (object) => {

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
