class Enemy {

    constructor(ctx, gameWidth, gameHeight, enemyWidth, enemyHeight, blackScoreSize) {

        this.ctx = ctx;

        this.enemyrWidth = enemyWidth;
        this.enemyHeight = enemyHeight;

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.posX = gameWidth - this.playerWidth
        this.posY = gameHeight - this.playerHeight - blackScoreSize;
    
        this.vel = 10

    }

    draw() {

        this.ctx.fillStyle = "green"
        this.ctx.fillRect(this.posX, this.posY, this.enemyWidth, this.enemyHeight)

    }

    move() {

        this.posX -= this.vel

        if (this.posX >= this.gameWidth - this.playerWidth) {
            
        }

        if (this.posX <= 0) {
            this.vel *= -1
        }

    }

}