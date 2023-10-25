let holesArray = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
let marbles = ["../img/pinkMarble.png",
    "../img/orangeMarble.png",
    "../img/blueMarble.png",
    "../img/greenMarble.png",
    "../img/purpleMarble.png"];
for (let j = 0; j < 14; j++)  appearMarble(j, holesArray[j]);
let name1 = JSON.parse(localStorage.getItem('player1')).name;
let name2 = JSON.parse(localStorage.getItem('player2')).name;
document.getElementById("player0").innerText = name1;
document.getElementById("player1").innerText = name2;
let numPlayer = 0;
nameHidden(numPlayer)


function appearMarble(location, amount) {
    let canvas = document.getElementById(location);
    let ctx = canvas.getContext("2d");
    writeAcount(location);
    for (let i = 0; i < amount; i++) {
        x = Math.floor(Math.random() * 140) + 20;
        y = Math.floor(Math.random() * 75) + 5;
        let img = document.createElement('img')
        img.src = marbles[Math.floor(Math.random() * 5)];
        if (location === 6 || location === 13)
            ctx.drawImage(img, x, y, 100, 20);
        else
            ctx.drawImage(img, x, y, 100, 50);
    }
}


function writeAcount(location) {
    let p = document.createElement('p');
    p.className = "p"
    p.textContent = holesArray[location];
    let element = document.getElementById('div' + location);
    if (element.children.length > 1) {
        const secondChild = element.children[1];
        element.removeChild(secondChild);
    }
    element.appendChild(p);
}


for (let j = 0; j < 14; j++) {
    disable(6, 14, 0, 6);
    if (!(j === 13 && j === 6)) {
        document.getElementById(j).addEventListener("click", chosenHole);
    }
}

function logOut() {
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');
    window.location.assign("../html/login.html");
}

function newGame() {
    location.reload()
}

function disableTrue(j) {
    document.getElementById(j).disabled = true;
    document.getElementById(j).setAttribute('style', 'pointer-events:none');
}

function disableFalse(j) {
    document.getElementById(j).disabled = false;
    document.getElementById(j).setAttribute('style', 'pointer-events:auto');
}

function disable(start, end, startFalse, endFalse) {
    for (let j = start; j < end; j++)  disableTrue(j)
    for (let j = startFalse; j < endFalse; j++) disableFalse(j)
}

function allDisable() {
    for (let i = 0; i < 14; i++) {
        disableTrue(i);
    }
}

function chosenHole(event) {
    audio();
    const chosenHole = event.target.id;
    if (holesArray[chosenHole] === 0)
        return;
    moveMarbles(chosenHole);
}


async function moveMarbles(chosenHole) {
    allDisable();
    numOfMarbles = holesArray[chosenHole];
    holesArray[chosenHole] = 0;
    let index = chosenHole;
    index++;
    for (let i = 0; i < numOfMarbles; i++) {
        if (((index + i) % 14 === 13 && numPlayer === 0) || ((index + i) % 14 === 6 && numPlayer === 1)) {
            i++;
            numOfMarbles++;
        }
        holesArray[(index + i) % 14]++;
        await new Promise(resolve => setTimeout(resolve, 500));
        let canvas = document.getElementById(chosenHole);
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        writeAcount(chosenHole);
        appearMarble((index + i) % 14, 1);
    }
    checkTurn(index, numOfMarbles);
}


function checkTurn(index, numOfMarbles) {
    let landing = (index - 1 + numOfMarbles) % 14;
    if ((holesArray[landing] === 1 || landing === 6 || landing === 13) && (holesArray[0] === 0 && holesArray[1] === 0 && holesArray[2] === 0 && holesArray[3] === 0 && holesArray[4] === 0 && holesArray[5] === 0) || (holesArray[7] === 0
        && holesArray[8] === 0 && holesArray[9] === 0 && holesArray[10] === 0 && holesArray[11] === 0 && holesArray[12] === 0)) {
        alert("game over");
        finishGame();
        return;
    }
    if (holesArray[landing] === 1 && landing != 6 && landing != 13) {
        alert("your turn is finish");
        if (numPlayer) {
            numPlayer = 0;
            disable(6, 14, 0, 6);
            nameHidden(numPlayer)
        }
        else {
            numPlayer = 1;
            nameHidden(numPlayer)
            disable(0, 7, 7, 13);
        }
        return;
    }
    if (landing === 13 || landing === 6) {
        alert("click again");
        numPlayer ? disable(0, 7, 7, 13) : disable(6, 14, 0, 6);
        return;
    }
    setTimeout(() => {
        moveMarbles(landing);
    }, 1000);
}


function nameHidden(numPlayer) {
    if (!numPlayer) {
        document.getElementById("player0").style.visibility = "visible";
        document.getElementById("player1").style.visibility = "hidden";
    }
    else {
        document.getElementById("player1").style.visibility = "visible";
        document.getElementById("player0").style.visibility = "hidden";
    }
}


function finishGame() {
    let winner = holesArray[6] == holesArray[13] ? 'you have the same score' : holesArray[6] > holesArray[13] ? 'player1' : 'player2';
    if (winner != 'you have the same score') {
        winner = JSON.parse(localStorage.getItem(winner)).name + ' is the winner';
    }
    document.getElementById("winner").style.display = 'block'
    document.getElementById("winnerName").innerText = winner;
    document.getElementById("game").style.display = 'none';
}


function audio() {
    var audio = new Audio('../audio/Film Slate 02.wav');
    audio.play();
}

function openInstructions() {
    document.getElementById('instructions-modal').style.visibility = "visible";
}

function closeInstructions(){
    document.getElementById('instructions-modal').style.visibility = "hidden"; 
}

