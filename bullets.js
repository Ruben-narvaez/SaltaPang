class Bullets {

    constructor(ctx, playerPosX, playerPosY, playerPosX0, playerPosY0, playerWidth, playerHeight) {
        this.ctx = ctx;
        this.posX = playerPosX + playerWidth / 2;
        this.posY = playerPosY + playerHeight / 2;
        this.playerPosY0 = playerPosY0;
        this.playerPosX0 = playerPosX0
        this.playerHeight = playerHeight;

        this.width = 10
        this.height = 10
        this.velX = 0;
        this.velY = -10;


    }

    draw() {


        this.ctx.fillStyle = "white"
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)

    }

    move() {
        this.posY += this.velY;
    }

}