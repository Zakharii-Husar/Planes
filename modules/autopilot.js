import shooting from "./shooting.js";

const autopilot = (PROPERTIES) => {

    // CRASH PROTECTION

    let emergencyHight = 0;

    const heightDetection = (() => {
        if (PROPERTIES.computer.y > 230 && PROPERTIES.computer.x > 300 && PROPERTIES.computer.x < 645) {
            emergencyHight = 1;
        }
        else if (PROPERTIES.computer.y > 270 && PROPERTIES.computer.x > 200 && PROPERTIES.computer.x <= 300 && PROPERTIES.computer.degrees > -135 && PROPERTIES.computer.degrees < 0) {
            emergencyHight = 2;
        }
        else if (PROPERTIES.computer.y > 270 && PROPERTIES.computer.x < 745 && PROPERTIES.computer.x >= 645 && PROPERTIES.computer.degrees < -45 && PROPERTIES.computer.degrees > -180) {
            emergencyHight = 3;
        }
        else if (PROPERTIES.computer.y > 270) {
            emergencyHight = 1
        }
    })();

    const antiCrash = () => {
        if (emergencyHight === 1) {
            if (PROPERTIES.computer.degrees >= -90 && PROPERTIES.computer.degrees <= 90) {
                PROPERTIES.computer.degrees += 2;
            }
            else {
                PROPERTIES.computer.degrees -= 2;
            }
        }
        else if (emergencyHight === 2) {
            PROPERTIES.computer.degrees += 2;
        }
        else if (emergencyHight === 3) {
            PROPERTIES.computer.degrees -= 2;
        }
    };

    // PLANE CHASING

    const chase = () => {
        if (PROPERTIES.player.x < PROPERTIES.computer.x) {
            if (PROPERTIES.computer.dx <= 0) {
                if (PROPERTIES.player.y < PROPERTIES.computer.y) {
                    PROPERTIES.computer.degrees += 0.5;
                }
                else if (PROPERTIES.player.y > PROPERTIES.computer.y) {
                    PROPERTIES.computer.degrees -= 0.5;
                }
                else if (PROPERTIES.player.y === PROPERTIES.computer.y) {
                    return
                }
            }
            else {
                if (PROPERTIES.player.y < PROPERTIES.computer.y) {
                    PROPERTIES.computer.degrees += 0.5;
                }
                else if (PROPERTIES.player.y > PROPERTIES.computer.y) {
                    PROPERTIES.computer.degrees -= 0.5;
                }
            }
        }
        else {
            if (PROPERTIES.player.y < PROPERTIES.computer.y) {
                PROPERTIES.computer.degrees += 0.5;
            }
            else {
                PROPERTIES.computer.degrees -= 0.5;
            }
        }
    }

    // MAKING DECISION BETWEEN CRASH PROTECTION AND CHASING

    if (emergencyHight !== 0) {
        antiCrash();
    } else {
        chase();
    }

    shooting(PROPERTIES.computer, PROPERTIES.player, PROPERTIES.bullet);
};

export default autopilot;