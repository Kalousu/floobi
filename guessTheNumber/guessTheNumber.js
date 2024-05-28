number = document.getElementById("numberGenerated");
input = document.getElementById("input");
let numGenerated;
let tries = 0;
let active = false;
var audio = new Audio("../audio/yippee.mp3");
audio.volume = 0.05;

function playGame(){
    numGenerated = Math.floor(Math.random() * 100 + 1);
    console.log(numGenerated);
    number.textContent = "?";
    active = true;
}

input.addEventListener("keyup", function(event){
    if(event.key === "Enter" && active == true) {
        const numGuessed = Number(input.value);
        switch(true){
            case isNaN(numGuessed):
                number.textContent = "Please enter a valid number!";
                console.log(numGuessed)
                break;
            case(numGuessed < 0 || numGuessed > 100):
                number.textContent = "Only numbers from 1 - 100!";
                break;
            case(numGuessed == numGenerated):
                number.textContent = "Congrats! You won!";
                audio.play();
                active = false;
                break;
            case(numGuessed >= numGenerated - 2 && numGuessed <= numGenerated + 2):
                number.textContent = "Scorching hot!";
                break;
            case(numGuessed >= numGenerated - 10 && numGuessed <= numGenerated + 10):
                number.textContent = "You're closer!";
                break;
            case(numGuessed >= 0 && numGuessed <= 100):
                if(tries == 0){
                    tries++;
                    number.textContent = "Try another number!"
                } else{
                    tries++;
                    number.textContent = `Try another number! (x${tries})`
                }
                break;
            default:
                number.textContent = "Decimals are not allowed!";
                break;
        }
    }else if(event.key === "Enter" && active == false) {
        number.textContent = "Generate a number first!";
    }
})