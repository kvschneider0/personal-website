import { generateLaplacianMatrix } from "./Thesis/matrix-generation";

const button = document.getElementById('button');
const output = document.getElementById('output');
const countElement = document.getElementById('count');

let countValue = 0;

function click() {
    countValue += 1;
    countElement.innerHTML = `count = ${countValue}`;
}

function matrix() {
    
}

button.addEventListener('click', click);

