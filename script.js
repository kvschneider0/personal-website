const button = document.getElementById('button');
const countElement = document.getElementById('count');

let countValue = 0;

function click() {
    countValue += 1;
    countElement.innerHTML = `count = ${countValue}`;
}

button.addEventListener('click', click);

