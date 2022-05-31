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
                this.target.health -= Math.floor(Math.random() * 20);
            }
            this.x += this.dx * this.bulletSpeed;
            this.y += this.dy * this.bulletSpeed;
        }
        draw(drawRotateImage) {
            const bulletPic = new Image();
            if (this.target.name === "computer") {
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

    const shooting = (shooter, target, bullet) => {
        bullet.counter += 1
        if (bullet.counter === 10) {
            bullet.counter = 0;
            bullet.amount.push(new Shot(
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
                target));
            setTimeout(() => { bullet.amount.shift(); }, 500);
        }

    };

    export default shooting;