var order = ["green", "red", "yellow", "blue"];
const myMap = new Map();
myMap.set('green', 0);
myMap.set('red', 1);
myMap.set('yellow', 2);
myMap.set('blue', 3);

function random() {
    return Math.floor(Math.random() * 4);
}

function blink(c) {
    var n = document.querySelectorAll(".btn")[c];
    n.style.backgroundColor = 'white';
    setTimeout(() => {
        n.style.backgroundColor = order[c];
    }, 200);
    (new Audio("sounds/" + order[c] + ".mp3")).play();
}

let sequence = [];
let playerInput = [];
let level = 1;
let flag=false;
function nextSequence() {
    playerInput = [];
    $("h1").text("Level " + level);
    var c = random();
    flag=true;
    sequence.push(c);
    blink(c);
}

$(document).on("keypress", function () {
    if(level === 1 && !flag) {
        nextSequence();
    }
});

$(".btn").click(function (event) {
    var m = myMap.get(event.currentTarget.id);
    playerInput.push(m);
    blink(m);

    if (playerInput[playerInput.length - 1] !== sequence[playerInput.length - 1]) {
        $("h1").text("Game Over, Press Any key to restart");
        (new Audio("sounds/wrong.mp3")).play();
        $("body").css("background-color", "red");
        setTimeout(() => {
            $("body").css("background-color", "#011F3F");
        }, 200);
        flag=false;
        sequence = []; 
        level = 1; 
    } else if (playerInput.length === sequence.length) {
        level++;
        setTimeout(nextSequence, 500);
    }
});
