class Heart {
    constructor(ctx, posX, posY){

    this.ctx = ctx

    this.image = new Image
        this.image.src = "corazon.png"
        
    this.width = 100
    this.height = 100    
        
    this.posX = posX
    this.posY = posY
    
    }

    draw() {
    
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

}

}