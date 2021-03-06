class Balls {

    constructor(ctx, blackScoreSize, y0, x0, gameWidth, gameHeight, ballWidth, ballHeight, ballVelX, ballVelY, maxY) {

        this.ctx = ctx

        this.ballWidth = ballWidth
        this.ballHeight = ballHeight

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.width = ballWidth
        this.height = ballHeight
        
        this.velX = ballVelX
        this.velY = ballVelY
        this.gravity = 0.1

        this.blackScoreSize = blackScoreSize
        this.posX0 = x0
        this.posY0 = maxY
        this.posY = y0
        this.posX = this.posX0

        this.image = new Image()
        this.image.src = "images/bola-red.png"

    }

    draw() {               
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

    move() { 
        this.posX += this.velX
        this.velY += this.gravity
        this.posY += this.velY
       
        if (this.posY >= this.gameHeight - this.height - this.blackScoreSize || this.posY <= 0) {
            this.velY *= -1
            this.velY -= this.gravity
        }

        if (this.posX > this.gameWidth - this.width || this.posX < 0) {
            this.velX *= -1
        }        
    }   
}