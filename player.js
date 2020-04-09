class Player {

    constructor(ctx, gameWidth, gameHeight, playerWidth, playerHeight, keys, blackScoreSize) {

        this.ctx = ctx;

        this.playerWidth = playerWidth;
        this.playerHeight = playerHeight;

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.image = new Image();
        this.image.src = "randomcharacter.png";

        this.posX = (gameWidth / 2) - (this.playerWidth / 2);
        this.posY = gameHeight - this.playerHeight - blackScoreSize;
        this.posY0 = this.posY;
        this.posX0 = this.posX;

        this.keys = keys;

        this.velPlayer = 14

        this.velY = 1;
        this.gravity = 0.4;

        this.bullets = [];

        this.setListeners();
    }

    draw() {

        // this.ctx.drawImage(this.image, this.posX, this.posY, this.playerWidth, this.playerHeight);
        this.ctx.fillStyle = "pink"
        this.ctx.fillRect(this.posX, this.posY, this.playerWidth, this.playerHeight)

    }

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posX0, this.posY0, this.playerWidth, this.playerHeight));
    }


    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.posY > 0);
    }

    move(direction) {

        //this.ctx.drawImage(this.player, this.posX, this.posY, this.playerWidth, this.playerHeight)
        this.ctx.fillStyle = "pink"
        this.ctx.fillRect(this.posX, this.posY, this.playerWidth, this.playerHeight)

        if (this.posX >= this.gameWidth - this.playerWidth) {
            this.posX = this.gameWidth - this.playerWidth
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


        /*if (direction === "up" && direction === "right") {
            this.posY += this.velY;
            this.velY += this.gravity;
            this.posX += this.velPlayer    
            }*/

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
