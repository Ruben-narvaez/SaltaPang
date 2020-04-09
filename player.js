class Player {

    constructor(ctx, gameWidth, gameHeight, playerWidth, playerHeight, keys, blackScoreSize) {

        this.ctx = ctx

        this.width = playerWidth
        this.height = playerHeight

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.image = new Image()
        this.image.src = "kirbi-sprite.png"
        this.image.width = 241
        this.image.height = 26
        this.image.frames = 8
        this.framesIndex = 0

        this.posX = (gameWidth / 2) - (this.width / 2)
        this.posY = gameHeight - this.height - blackScoreSize + 10
        this.posY0 = this.posY
        this.posX0 = this.posX

        this.keys = keys

        this.velPlayer = 14

        this.velY = 1
        this.gravity = 0.4

        this.bullets = []

        this.setListeners()
    }

    draw() {

        this.ctx.drawImage(
            this.image,
            Math.floor(this.framesIndex) * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
           
        this.animate();

    }

    animate() {
        this.framesIndex += 0.25
        if (this.framesIndex == 8) {
            this.framesIndex = 0
        }
    }

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posX0, this.posY0, this.width, this.height));
    }


    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.posY > 0);
    }

    move(direction) {
        
        if (this.posX >= this.gameWidth - this.width) {
            this.posX = this.gameWidth - this.width
        }

        if (this.posX <= 0) {
            this.posX = 0
        }

        if (this.posY < this.posY0) {
            this.posY += this.velY;
            this.velY += this.gravity;
        } else {
            this.posY = this.posY0;
            this.velY = 1;
        }

        direction === 'right' ? this.posX += this.velPlayer : null
        direction === 'left' ? this.posX -= this.velPlayer : null

    }

    setListeners() {
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.SPACE:
                    if (this.posY >= this.posY0) {
                        this.posY -= 60;
                        this.velY -= 8;
                    }
                    this.move("up")

                    break;
                case this.keys.C:
                    this.shoot();
                    break;
                case this.keys.RIGHT:
                    this.move("right")
                    break;
                case this.keys.LEFT:
                    this.move("left")
                    break;
            }
        });
    }

}
