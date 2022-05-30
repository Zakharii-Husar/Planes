import rotationFunction from './rotation.js';

    // CHANGING DIRECTION DEPENDING ON THE ANGLE OF AN OBJECT

    const orientation = (object, canvas) => {

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

        // SETTING LIMITATIONS FOR MOVING INSIDE OF THE canvas

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

        if (object.name === "computer") {
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

    export default orientation;