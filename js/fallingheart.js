class FallingHeart {

    constructor(ctx, posX, blackScore) {

        this.ctx = ctx

        this.image = new Image
        this.image.src = "images/corazon.png"

        this.width = 100
        this.height = 100

        this.posX = posX
        this.posY = 0
        this.posYMax = blackScore

        this.vel = 3

    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

    move() {
        this.posY += this.vel
        if (this.posY >= this.posYMax) {
            this.vel = 0
        }
    }

}