let menuHolder = document.getElementById("menuHolder");
let menu = document.getElementById("menu");
let visible = false;
var emojisCollected = 0;

const commonEmojis = ["😂", "😃", "😋", "👍", "😉", "😎", "🤑", "🥱", "😴", "🤔"];
const rareEmojis = ["🥶", "😡", "🥵", "🤢", "👺"];
const epicEmojis = ["🐒", "🦝", "🐟"];
const legendaryEmojis = ["🕴", "💩"];
const emojis = [...commonEmojis, ...rareEmojis, ...epicEmojis, ...legendaryEmojis];
const emojiMap = new Map();

for(let i = 0; i < emojis.length; i++){
    emojiMap.set(i, 0);
    console.log(emojiMap.get(i));
}

// emoji wahrscheinlichkeit
function emojiRarity() {
    let rarity = Math.floor(Math.random() * 100 + 1);
    if(rarity == 1){
        let legendaryRarity = Math.floor(Math.random() + 1);
        return (legendaryEmojis[legendaryRarity]);
    }else if(rarity <= 5){
        let epicRarity = Math.floor(Math.random() * 3);
        return (epicEmojis[epicRarity]);
    }else if(rarity <= 10){
        let rareRarity = Math.floor(Math.random() * 5);
        return (rareEmojis[rareRarity]);
    }else {
        let commonRarity = Math.floor(Math.random() * 10);
        return (commonEmojis[commonRarity]);
    }
}
//emoji creater || interactor
function createEmoji(emojiName){
    let emoji = document.createElement("img");
    let index = emojis.indexOf(emojiName);
    let boundary = document.getElementById("game").getBoundingClientRect();
    let degree = Math.random() * 360;
    var timeOut = Math.floor(Math.random() * 4500) + 3500;

    document.getElementById("game").appendChild(emoji);
    emoji.src = `img/${index}.png`;

    emoji.style.display = "inline-block";
    emoji.style.position = "absolute";
    emoji.style.width = "125px";
    emoji.style.left = Math.random() * boundary.right - 150 + "px";
    emoji.style.top = Math.random() * boundary.bottom - 220 + "px";
    emoji.classList.add("appeared");
    

    emoji.addEventListener("mouseover", () => {
        emoji.style.setProperty("cursor", "pointer");
    });

    emoji.addEventListener("click", () => {
        document.getElementById(`${emojis.indexOf(emojiName)}`).classList.remove("emojiLocked");
        emoji.remove();
        emojisCollected++;
        emojiMap.set(emojis.indexOf(emojiName), emojiMap.get(emojis.indexOf(emojiName)) + 1);
        document.getElementById(emojiName).textContent = `Collected: ${emojiMap.get(emojis.indexOf(emojiName))}`;
        document.getElementById("collectedNumber").textContent = `Emojis collected: ${emojisCollected}`;
    })

    setTimeout(() => {
        emoji.remove();
    }, timeOut);
}

//emoji spawner event
function emojiSpawner(){
    let emojiName = emojiRarity();
    let time = Math.floor(Math.random() * 6500) + 1500;
    createEmoji(emojiName);
    console.log(emojiName);
    setTimeout(emojiSpawner, time);
}

emojiSpawner();

function showMenu(){
    if(visible == true){
        menu.style.display = "none";
        visible = false;
    }else{
        menu.style.display = "grid";
        visible = true;
    }
}