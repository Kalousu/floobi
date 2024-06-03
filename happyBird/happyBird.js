window.onload = () => {
    //initializing
    let canvas = document.querySelector("canvas");
    let c = canvas.getContext("2d");

    let header = document.querySelector("header").getBoundingClientRect();
    let headerHeight = header.height;

    let canvasWidth = window.innerWidth / 1.5;
    let canvasHeight = window.innerHeight - headerHeight * 2;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "2px solid black";

    
    let startScreen = document.getElementById("start-screen");
    startScreen.style.left = (window.innerWidth / 2) - 340 + "px";
    startScreen.style.top = (window.innerHeight / 2) - 100.5 + "px";
    startScreen.style.display = "inline-block";

    let gameOverScreen = document.getElementById("game-over-screen");
    gameOverScreen.style.left = (window.innerWidth / 2) - 454 + "px";
    gameOverScreen.style.top = (window.innerHeight / 2) - 250.5 + "px";

    let pointsText = document.getElementById("point-counter");

    var points = 0;
    let playing = false;
    let titleScreen = true;
    let endScreen = false;
    let pipeSpawned = false;
    var pipeOffsets = [];

    //initializing
    function init(){
        var gameWidth = window.innerWidth / 1.5;
        var gameHeight = window.innerHeight - headerHeight * 2;
        canvas.width = gameWidth;
        canvas.height = gameHeight;
        startScreen.style.left = (window.innerWidth / 2) - 340 + "px";
        startScreen.style.top = (window.innerHeight / 2) - 100.5 + "px";
    }

    //classes
    class Background{
        constructor(x, y){
            this.x = x;
            this.y = y;
            this.width = document.getElementById("background-image").width;
            this.height = canvasHeight;
            this.image = document.getElementById("background-image");
        }

        draw(){
            c.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        update(){
            this.x -= 1;
            if(this.x <= -360){
                this.x += 1800;
            }
        }
    }

    class PipeUp{
        constructor(x, y){
            this.x = x;
            this.y = y;
            this.image = document.getElementById("pipe-up")
            this.width = 800;
            this.height = 800;
        }

        draw(){
            c.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        update(){
            this.x -= 4;
        }
    }

    class PipeDown{
        constructor(x, y){
            this.x = x;
            this.y = y;
            this.image = document.getElementById("pipe-down");
            this.width = 800;
            this.height = 800;
        }

        draw(){
            c.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        update(){
            this.x -= 4;
        }
    }

    class Bird{
        constructor(){
            this.x = 100;
            this.y = canvasHeight / 2 - (80 / 2);
            this.dy = 13;
            this.height = 100;
            this.width = 100;
            this.image = document.getElementById("bird-image");
        }

        draw(){
            c.drawImage(this.image, this.x, this.y, this.height, this.width);
        }

        fly(){
            bird.y -= this.dy;
            if(this.dy >= -20){
                this.dy = this.dy - 0.8;
            }
        }
    }

    class SafeSpace{
        constructor(x, y, height, width){
            this.x = x;
            this.y = y;
            this.height = height;
            this.width = width;
        }

        draw(){
            c.fillRect(this.x, this.y, this.height, this.width);
        }

        update(){
            this.x -=4;
        }
    }

    //birb
    let bird = new Bird();

    //pipeDown
    let pipeDown = [];
    let pipeUp = [];

    //safe spaces
    var safeSpaces = [];

    //4 images stuck together
    let images = [];
    for(let i = 0; i < 5; i++){
        images[i] = new Background(360 * i, 0);
    }

    //spawning pipes

    //event listeners
    window.addEventListener("resize", () =>{
        init();
    })

    canvas.addEventListener("click", () => {
        if(titleScreen){
            titleScreen = false;
            playing = true;
            startScreen.style.display = "none";
        }else if(endScreen){
            endScreen = false;
            titleScreen = true;
            gameOverScreen.style.display = "none";
            startScreen.style.display = "inline-block";
            bird.x = 100;
            bird.y = canvasHeight / 2 - (80 / 2);
            bird.dy = 0;
            c.clearRect(0, 0, canvasWidth, canvasHeight);
            for(let i = 0; i < pipeDown.length; i++){
                pipeDown.shift();
                pipeUp.shift();
                safeSpaces.shift();
            }
            console.log("playing again");
        }
    })

    startScreen.addEventListener("click", () => {
        if(titleScreen){
            titleScreen = false;
            playing = true;
            startScreen.style.display = "none";
        }
    })

    gameOverScreen.addEventListener("click", () => {
        if(endScreen){
            endScreen = false;
            titleScreen = true;
            gameOverScreen.style.display = "none";
            startScreen.style.display = "inline-block";
            bird.x = 100;
            bird.y = canvasHeight / 2 - (80 / 2);
            bird.dy = 0;
            c.clearRect(0, 0, canvasWidth, canvasHeight);
            for(let i = 0; i <= pipeDown.length; i++){
                pipeDown.shift();
                pipeUp.shift();
                safeSpaces.shift();
            }
            console.log("playing again");
            points = 0;
        }
    })

    canvas.addEventListener("mousedown", () => {

    })

    //detecting collision


    function animate(){
        c.clearRect(0, 0, canvasWidth, canvasHeight);
        //drawing image
        for(let i = 0; i < images.length; i++){
            images[i].draw();
        }
        bird.draw();
        if(playing){
            console.log("playing");
            bird.draw();
            //updating image position if out of screen
            for(let i = 0; i < images.length; i++){
                images[i].update();
            }
            bird.fly();
            //bird flying
            canvas.onclick = () => {
                bird.dy = 13;
            }
            //pipe spawner
            if(pipeSpawned == false){
                pipeSpawned = true;
                setTimeout(() => {
                    let pipeOffset = Math.floor(Math.random() * 400);
                    pipeOffsets.push(pipeOffset);
                    pipeDown.push(new PipeDown(canvas.width, -450 + pipeOffset));
                    pipeUp.push(new PipeUp(canvas.width, canvas.height - 650 + pipeOffset));
                    safeSpaces.push(new SafeSpace(canvas.width + 310, pipeOffset + 105, 210, 270));
                    pipeSpawned = false;
                }, 3000)
            }
            //pipe handler
            if(pipeDown.length >= 1){
                for(let i = 0; i < pipeDown.length; i++){
                    pipeDown[i].draw();
                    pipeDown[i].update();
                    pipeUp[i].draw();
                    pipeUp[i].update();
                    safeSpaces[i].update();
                }
            }
            //game over condition
            if(bird.y < (bird.height - 110) || bird.y > (canvas.height - bird.height + 20)){
                document.getElementById("final-score").textContent = `${Math.floor(points)} points!!`
                playing = false;
                endScreen = true;
                gameOverScreen.style.display = "inline-block";
            }else if(safeSpaces.length >= 1){
                if((safeSpaces[0].x + safeSpaces[0].width) < 0){
                    pipeDown.shift();
                    pipeUp.shift();
                    safeSpaces.shift();
                }
                if(bird.x > (safeSpaces[0].x - 50) && bird.x < (safeSpaces[0].x + 210)){
                    if(bird.y > safeSpaces[0].y + safeSpaces[0].height || bird.y < safeSpaces[0].y){
                    document.getElementById("final-score").textContent = `${Math.floor(points)} points!!`
                    playing = false;
                    endScreen = true;
                    gameOverScreen.style.display = "inline-block";
                    }
                }
            }
            points += 0.1;
            pointsText.textContent = Math.floor(points);
        }
        requestAnimationFrame(animate);
    }

    animate();
}