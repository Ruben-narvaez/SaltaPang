const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    background: undefined,
    player: undefined,
    lifes: [],
    enemy: [],
    balls: [],
    ballY: 80,
    ballVel: 3,
    firstBallSize: {
        width: 150,
        height: 150
    },
    keys: {
        LEFT: 37,
        RIGHT: 39,
        C: 67,
        SPACE: 32,
    },

    blackScoreSize: 160,

    init() {
        this.canvas = document.getElementById("myCanvas")
        this.ctx = this.canvas.getContext("2d")
        this.setDimensions()
        this.bottomLine()
        this.start()
    },

    setDimensions() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.canvas.width = this.width / 1.5
        this.canvas.height = this.height / 1.5
        this.canvas.style.left = "15%"
        this.canvas.style.right = "15%"
        this.canvas.style.top = "100px"
        this.canvas.style.position = "absolute"
    },

    start() {
        this.reset();
        this.interval = setInterval(() => {
            if (this.framesCounter > 5000) {
                this.framesCounter = 0;
            }
            this.framesCounter++
            this.clear()
            this.bottomLine()
            this.randomEnemy()
            this.drawAll()
            this.moveAll()
            this.player.clearBullets()
            this.clearEnemy()
            this.isBulletCollision()
            this.lessLife()
            this.dogCollision()
            this.rules()
            this.gameOver()
            this.win()
        }, 1000 / this.FPS)

    },

    bottomLine() {
        this.ctx.lineWidth = 4
        this.ctx.strokeStyle = "grey"
        this.ctx.beginPath()
        this.ctx.moveTo(0, this.canvas.height - this.blackScoreSize)
        this.ctx.lineTo(this.canvas.width, this.canvas.height - this.blackScoreSize)
        this.ctx.stroke()
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height, "Background.png");
        this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, 70, 70, this.keys, this.blackScoreSize);
        this.balls.push(new Balls(this.ctx, this.blackScoreSize, this.ballY, this.canvas.width / 2, this.canvas.width, this.canvas.height, this.firstBallSize.width, this.firstBallSize.height, this.ballVel, 0.1, this.ballY))          
    
        this.lifes.push(new Heart(this.ctx, 350, this.canvas.height - 135))
        this.lifes.push(new Heart(this.ctx, 400, this.canvas.height - 135))
        this.lifes.push(new Heart(this.ctx, 450, this.canvas.height - 135))
        this.lifes.push(new Heart(this.ctx, 500, this.canvas.height - 135))
        this.lifes.push(new Heart(this.ctx, 550, this.canvas.height - 135))
    
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },
    
    randomEnemy() {
        if (this.framesCounter % 1200 === 0) {
            this.enemy.push(new Enemy(this.ctx, this.canvas.width, this.canvas.height, 70, 70, this.blackScoreSize))
        }
    },

    clearEnemy() {
        this.enemy = this.enemy.filter(elm => elm.posX > (-elm.width))
    },

    drawAll() {
        this.background.draw();
        this.player.bullets.forEach(elm => elm.draw())
        this.balls.forEach(elm => elm.draw());
        this.player.draw();
        this.enemy.forEach(elm => elm.draw())
        this.lifes.forEach(elm => elm.draw())
    },

    moveAll() {
        this.player.move()
        this.player.bullets.forEach(elm => elm.move())
        this.balls.forEach(elm => elm.move())
        this.enemy.forEach(elm => elm.move())
    },

    isBulletCollision() {       
        this.balls.forEach((ball, idx) => {

            this.player.bullets.forEach((bullet, index) => {

                if (this.checkCollision(ball, bullet)) {
                    this.balls.splice(idx, 1)
                    this.player.bullets.splice(index, 1)
                    if (ball.width >= this.firstBallSize.width / 5) {
                        this.balls.push(new Balls(this.ctx, this.blackScoreSize, ball.posY - 25, ball.posX, this.canvas.width, this.canvas.height, ball.width / 1.5, ball.height / 1.5, this.ballVel, ball.velY * 0.2, ball.posY0))
                        this.balls.push(new Balls(this.ctx, this.blackScoreSize, ball.posY - 25, ball.posX, this.canvas.width, this.canvas.height, ball.width / 1.5, ball.height / 1.5, this.ballVel * -1, ball.velY * 0.2, ball.posY0))               
                        
                    }                   
                }                
            })          
        })      
    },
            
    checkCollision(obj1, obj2) { 
        return obj1.posX + obj1.width >= obj2.posX &&
            obj1.posY + obj1.height >= obj2.posY + obj2.height &&
            obj1.posX <= obj2.posX + obj2.width
    },

    win() {
        if (this.balls.length == 0) {
            console.log("WIN MOTHERFOCA!")
        }
    },
    
    lessLife() {
        this.balls.forEach((elm, index) => {
            if (this.player.posX < elm.posX + elm.width &&
                this.player.posX + this.player.width > elm.posX &&
                this.player.posY < elm.posY + elm.height &&
                this.player.height + this.player.posY > elm.posY) {
                
                elm.velY *= -1
                this.lifes.pop()
                elm.posY -= 10

                
            }
        })
                 
    },

    dogCollision() {
        this.enemy.forEach((enemy, index) => {
            if (this.checkCollision(this.player, enemy)) {
                this.enemy.splice(index, 1)
                this.lifes.pop()
                this.player.posX -= 20
           }
        })
    },

    rules() {
        this.ctx.font = "40px Luckiest Guy";
        this.ctx.fillStyle = "#BC8F8F"
        this.ctx.fillText("CONTROLS", 50, this.canvas.height - 115)
        
        this.ctx.font = "20px Luckiest Guy";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("Move - arrows", 50, this.canvas.height - 80)
        this.ctx.fillText("Jump - space", 50, this.canvas.height - 60)
        this.ctx.fillText("Shoot - c", 50, this.canvas.height - 40)
    },

    gameOver() {
        if (this.lifes.length == 0) {
            this.ctx.font = "bold 100px Luckiest Guy";
            this.ctx.fillStyle = "#7B68EE"
            this.ctx.fillText("Try again", 350, this.canvas.height / 2 - 30)
            clearInterval(this.interval)
        }
    }
}