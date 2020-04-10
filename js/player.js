class Player {

    constructor(ctx, gameWidth, gameHeight, playerWidth, playerHeight, keys, blackScoreSize) {

        this.ctx = ctx

        this.width = playerWidth
        this.height = playerHeight

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.image = new Image()
        this.image.src = "images/kirbi-sprite.png"
        this.image.width = 241
        this.image.height = 26
        this.image.frames = 8
        this.framesIndex = 0

        //this.bulletsSound = new Audio("sound/bullet.wav")

        this.posX = (gameWidth / 2) - (this.width / 2)
        this.posY = gameHeight - this.height - blackScoreSize + 10
        this.posY0 = this.posY
        this.posX0 = this.posX

        this.keys = keys
        this.keyState = {
            keyLeft: false,
            keyRight: false,
        }

        this.velPlayer = 3

        this.velY = 1
        this.gravity = 0.4

        this.bullets = []
        this.isJumping = false
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
        )
        this.animate()
    }

    animate() {
        this.framesIndex += 0.25
        if (this.framesIndex == 8) {
            this.framesIndex = 0
        }
    }

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posX0, this.posY0, this.width, this.height))
       // this.bulletsSound.play()
    }


    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.posY > 0)
    }

    move(direction) {

        if (this.keyState.keyRight && this.posX <= this.gameWidth - this.width) {
            this.posX += this.velPlayer
        }

        if (this.keyState.keyLeft && this.posX >= 0) {
            this.posX -= this.velPlayer
        }

        if (this.posY < this.posY0) {
            this.posY += this.velY
            this.velY += this.gravity
        } else {
            this.posY = this.posY0
            this.velY = 1
        }

        if (this.keyState.keyLeft === true) {
            this.posX -= this.velPlayer
        }
        if (this.keyState.keyRight === true) {
            this.posX += this.velPlayer
        }
    }

    setListeners() {
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.SPACE:
                    if (this.posY >= this.posY0) {
                        this.posY -= 60
                        this.velY -= 8
                    }
                    this.move("up")
                    break;
                case this.keys.C:
                    this.shoot()
                    break;
            }
            if (e.keyCode === this.keys.RIGHT) { this.keyState.keyRight = true }
            if (e.keyCode === this.keys.LEFT) { this.keyState.keyLeft = true }
        })

        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case this.keys.RIGHT:
                    this.keyState.keyRight = false
                    break;
                case this.keys.LEFT:
                    this.keyState.keyLeft = false
                    break;
            }
        })
    }
}