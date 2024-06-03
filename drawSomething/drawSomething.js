let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

let header = document.querySelector("header").getBoundingClientRect();
let headerHeight = header.height;

canvas.width = window.innerWidth - 4;
canvas.height = window.innerHeight * 0.75;
canvas.style.border = "2px solid black";
canvas.style.background = "white";

let colorDepictor = document.getElementById("color-depictor");

//Initialize Canvas

function init(){
    canvas.width = window.innerWidth - 4;
    canvas.height = window.innerHeight * 0.75;
}

//Drawing Tools

class DrawingTool{
    constructor(x, y, r, color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
}

class Brush extends DrawingTool{
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
}

class Rubber extends DrawingTool{
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.strokeStyle = "white";
        c.stroke();
        c.fillStyle = "white";
        c.fill();
        c.closePath();
    }
}

//Mouse Movement + Interactivity

let mouse = {
    x: undefined,
    y: undefined
}


let drawingTools = [new Brush(), new Rubber()];
let drawingTool = 0;

//Choosing a Tool

let brushTool = document.getElementById("tools-brush");
let rubberTool = document.getElementById("tools-rubber");

function chooseTool(input){
    switch(true){
        case input === 'brush':
            drawingTool = drawingTools[0];
            brushTool.style.backgroundColor = "rgba(0, 0, 255, 0.2)"
            rubberTool.style.backgroundColor = "rgb(255, 255 ,255)"
            break;
        case input === 'rubber':
            drawingTool = drawingTools[1];
            brushTool.style.backgroundColor = "rgb(255, 255 ,255)"
            rubberTool.style.backgroundColor = "rgba(0, 0, 255, 0.2)"
            break;
        case input === 'clear':
            c.clearRect(0, 0, window.innerWidth - 2, window.innerHeight * 0.75);
            break;
    }
}

//Functionality
let drawing = false;
let hovering = false;

//events window
window.addEventListener("mousemove", (event) => {
    if(!drawing) return;

    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("mousedown", (event) => {
    drawing = true;

    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("mouseup", () => {
    drawing = false;
})

window.addEventListener("resize", () =>{
    init();
})

//Animating Brush
animate = () => {
    requestAnimationFrame(animate);
    var colorRed = document.getElementById("color-red").value;
    var colorGreen = document.getElementById("color-green").value;
    var colorBlue = document.getElementById("color-blue").value;
    var opacity = (document.getElementById("brush-opacity").value / 100).toFixed(2);
    var color = `rgba(${colorRed}, ${colorGreen}, ${colorBlue}, ${opacity})`;

    var size = document.getElementById("brush-size").value;

    drawingTool.x = mouse.x;
    drawingTool.y = mouse.y - headerHeight;
    drawingTool.r = size;
    drawingTool.color = color;

    let canvasCondition = mouse.y <= canvas.height + headerHeight && mouse.y >= header.height && mouse.x <= canvas.width && mouse.x >= 0;
    if(canvasCondition){
        drawingTool.draw();
    }

    colorDepictor.style.background = color;
}

window.onload = animate();