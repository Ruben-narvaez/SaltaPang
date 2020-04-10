class Enemy {

    constructor(ctx, gameWidth, gameHeight, enemyWidth, enemyHeight, blackScoreSize) {

        this.ctx = ctx

        this.width = enemyWidth
        this.height = enemyHeight

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.posX = gameWidth 
        this.posY = gameHeight - this.height - blackScoreSize
    
        this.vel = 6

        this.image = new Image()
        this.image.src = "enemy-dog.png"
        this.image.width = 685
        this.image.height = 42
        this.image.frames = 12
        this.framesIndex = 0

    }

    draw() {             
        this.ctx.drawImage(
            this.image,
            (Math.floor(this.framesIndex) * Math.floor(this.image.width / this.image.frames)) + (this.image.width / 2),
            0,
            Math.floor((this.image.width) / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        )
        this.animate()
    }

    animate() {
        this.framesIndex += 0.25
        if (this.framesIndex == 6) {
            this.framesIndex = 0
        }
    }

    move() {
        this.posX -= this.vel
    }

}