    // EXPLOSION OF PLANES
    let COUNTER = 0;
    let FRAMEINDEX = 0;
    const crash = (object, ctx) => {

        const explosionAnimation = () => {
            if (COUNTER > 12) { FRAMEINDEX += 1; COUNTER = 0 };
            let sprite = new Image();
            sprite.src = "img/explosion.png";
            COUNTER += 1;
            object.dx = 0;
            object.dy = 0;
            ctx.drawImage(
                sprite,
                FRAMEINDEX * 99.9,
                FRAMEINDEX * 98.5,
                99.9,
                98.5,
                object.x - object.w,
                object.y - object.h,
                99.9,
                98.5,
            );

            // RESTORE PLANES AFTER CRASH
            const defaultSettings = () => {
                if (object.name === "player") {
                    object.x = 0;
                } else {
                    object.x = canvas.width + object.w
                };
                object.health = 100;
                object.y = 100;
                object.speed = 4;
                object.degrees = 0;
                object.dx = 2;
            };

            setTimeout(() => {
                defaultSettings();
                FRAMEINDEX = 0;
            }, 1000)
        };

        // CONDITIONS TO CONSIDER PLANE CRASHED

        const crashConditions = () => {
            if (object.y > 300) { explosionAnimation(object) }
            else if (
                object.x > 200 && object.x < 500 && object.y > 280) { explosionAnimation(object) }
            else if (object.health < 0) {
                explosionAnimation();
            }
        }

        crashConditions();
    }

    export default crash;