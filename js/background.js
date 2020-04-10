class Background {

    constructor(ctx, backW, backH, imgSource) {

        this.ctx = ctx
        
        this.width = backW
        this.height = backH

        this.image = new Image()
        this.image.src = imgSource

        this.posX = 0
        this.posY = 0
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height / 2)
    }
} 