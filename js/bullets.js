class Bullets {

    constructor(ctx, playerPosX, playerPosY, playerPosX0, playerPosY0, playerWidth, playerHeight) {

        this.ctx = ctx
        
        this.posX = playerPosX + playerWidth / 2
        this.posY = playerPosY + playerHeight / 2
        this.playerPosY0 = playerPosY0
        this.playerPosX0 = playerPosX0
        this.playerHeight = playerHeight

        this.width = 15
        this.height = 15
        this.velX = 0
        this.velY = -10

        this.image = new Image()
        this.image.src = "images/new_bullet.png"
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

    move() {
        this.posY += this.velY
    }
}