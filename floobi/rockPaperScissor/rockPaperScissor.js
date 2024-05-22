const choices = ["rock", "paper", "scissors"];
let result = "";
let winsCount = 0;
let lossCount = 0;
let ratioCount = 0;
let winScreen = document.getElementById("wins");
let lossScreen = document.getElementById("losses");
let ratioScreen = document.getElementById("ratio");
let botChoice = document.getElementById("choosing");

function playGame(choice){
    // Der Computer wählt aus
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    //Text vom Bot
    switch(computerChoice){
        case "rock":
            botChoice.textContent = "👊";
            break;
        case "paper":
            botChoice.textContent = "🤚";
            break;
        case "scissors":
            botChoice.textContent = "✌️";
            break;
        
    }
    //Resultat
    if(computerChoice === choice){
        result = "It's a tie!"
        document.getElementById("choose").textContent = result;
    } else {
        switch(choice){
            case "rock":
                result = (computerChoice === "scissors") ? "You win!" : "You lose!";
                break;
            case "paper":
                result = (computerChoice === "rock") ? "You win!" : "You lose!";
                break;
            case "scissors":
                result = (computerChoice === "paper") ? "You win!" : "You lose!";
                break;
        }
        document.getElementById("choose").textContent = result;
        //Text Spieler + W / L / W/L Nummern
        switch(result){
            case "You win!":
                winsCount++;
                winScreen.textContent = "W: " + winsCount;
                if(lossCount === 0){
                    ratioCount = winsCount / (lossCount + 1);
                } else {
                    ratioCount = winsCount / lossCount;
                }
                ratioScreen.textContent = "W/L: " + Math.round((ratioCount + Number.EPSILON) * 100) / 100;
                break;
            case "You lose!":
                lossCount++;
                lossScreen.textContent = "L: " + lossCount;
                ratioCount = winsCount / lossCount;
                ratioScreen.textContent = "W/L: " + Math.round((ratioCount + Number.EPSILON) * 100) / 100;
                break;
        }
    }
}