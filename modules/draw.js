const drawObjects = ( { ctx, canvas, player, computer, bullet}) => {

    const drawRotateImage = (pic, x, y, w, h, degrees) => {
        ctx.save();
        ctx.translate(x - w / 2, y - h / 2);
        ctx.rotate(degrees * Math.PI / 180.0);
        ctx.translate(- x - w / 2, - y - h / 2);
        ctx.drawImage(pic, x, y, w, h);
        ctx.restore();
    }

    const playersPlanePic = new Image();
    playersPlanePic.src = "img/plane.png";
    const computersPlanePic = new Image();
    computersPlanePic.src = "img/plane2.png";

    const drawBullets = () => {
        for (let i = 0; i < bullet.amount.length; i++) {
            bullet.amount[i].update();
            bullet.amount[i].draw(drawRotateImage);
        };
    };

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

export default drawObjects;