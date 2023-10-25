let userNum = 1;
let w = document.getElementById('nextPlayer');
w.innerText = 'player' + userNum;

function RequiredField(logInUserName, logInUserPassword) {
    if (!logInUserName || !logInUserPassword) {
        alert('must fill name and password.');
        return false;
    }
    return true;
}

function signUp(event) {
    event.preventDefault();
    const logInUserName = document.getElementById('name').value;
    const logInUserPassword = document.getElementById('password').value;
    if(!RequiredField(logInUserName, logInUserPassword)) return;
    if (!findUser(logInUserName, logInUserPassword)) {
        let user = new User(logInUserName, logInUserPassword);
        let arrUsers = JSON.parse(localStorage.getItem('gamers')) || []
        arrUsers.push(user)
        localStorage.setItem('gamers', JSON.stringify(arrUsers))
        localStorage.setItem('player' + userNum, JSON.stringify(user));
    }
    else {
        alert("you have to log in")
        return
    }
    checkNumUser();
    return false;
}

function checkNumUser() {
    if (userNum === 2) {
        window.location.href = "../html/menu.html";
    }
    else {
        userNum = 2;
        document.getElementById('nextPlayer').innerText = 'player' + userNum;
        document.getElementsByTagName('form')[0].style.rotate = '360deg';
        reset();
    }
}

function reset() {
    document.getElementById('name').value = "";
    document.getElementById('password').value = "";
}

function logIn(event) {
    event.preventDefault();
    const logInUserName = document.getElementById('name').value;
    const logInUserPassword = document.getElementById('password').value;
    if(!RequiredField(logInUserName, logInUserPassword)) return;
    if (!findUser(logInUserName, logInUserPassword)) {
        alert("you have to sign up")
        return
    }
    else {
        let user = new User(logInUserName, logInUserPassword);
        localStorage.setItem('player' + userNum, JSON.stringify(user));
        checkNumUser();
    }
}
function findUser(name, password) {
    let foundUser;
    let arrUsers = JSON.parse(localStorage.getItem('gamers')) || [];
    foundUser = arrUsers.find(user => {
        return user.name === name && user.password === password;
    })
    return foundUser;
}