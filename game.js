const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    background: undefined,
    player: undefined,
    enemy: undefined,
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
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.setDimensions();
        this.bottomLine();
        this.start();
    },

    setDimensions() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width / 1.5;
        this.canvas.height = this.height / 1.5;
        this.canvas.style.left = "15%";
        this.canvas.style.right = "15%";
        this.canvas.style.top = "100px";
        this.canvas.style.position = "absolute";
    },

    start() {
        this.reset();
        this.interval = setInterval(() => {
            if (this.framesCounter > 5000) {
                this.framesCounter = 0;
            }
            this.framesCounter++;
            this.clear();
            this.bottomLine();
            this.drawAll();
            this.moveAll()
            this.player.clearBullets()
            this.isBulletCollision()
            this.gameOver()
            this.win()
        }, 1000 / this.FPS);

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
        this.balls.push(new Balls(this.ctx, this.blackScoreSize, this.ballY, this.canvas.width / 2, this.canvas.width, this.canvas.height, this.firstBallSize.width, this.firstBallSize.height, this.ballVel, this.ballY))
        this.enemy = new Enemy(this.ctx, this.canvas.width, this.canvas.height, 70, 70, this.blackScoreSize)        
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawAll() {
        this.background.draw();
        this.player.draw();
        this.player.bullets.forEach(elm => elm.draw())
        this.balls.forEach(elm => elm.draw());
        this.enemy.draw()
    },

    moveAll() {
        this.player.move()
        this.player.bullets.forEach(elm => elm.move())
        this.balls.forEach(elm => elm.move());
        this.enemy.move()
    },

    isBulletCollision() {       
        this.balls.forEach((ball, idx) => {

            this.player.bullets.forEach((bullet, index) => {

                if (this.checkCollision(ball, bullet)) {
                    this.balls.splice(idx, 1)
                    this.player.bullets.splice(index, 1)
                    if (ball.width >= this.firstBallSize.width / 5) {
                        console.log(ball.posY0)
                        this.balls.push(new Balls(this.ctx, this.blackScoreSize, ball.posY - 25, ball.posX, this.canvas.width, this.canvas.height, ball.width / 1.5, ball.height / 1.5, this.ballVel, ball.posY0))
                        this.balls.push(new Balls(this.ctx, this.blackScoreSize, ball.posY - 25, ball.posX, this.canvas.width, this.canvas.height, ball.width / 1.5, ball.height / 1.5, this.ballVel * -1, ball.posY0))               
                        
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
    
    gameOver() {
        if (this.balls.some(elm =>
            this.player.posX + this.player.playerWidth >= elm.posX &&
            this.player.posY - this.player.playerHeight <= elm.posY + elm.height &&
            this.player.posX <= elm.posX + elm.width)) {
            console.log("GAME OVER MOTHERFOCA!")
        }
    }
}