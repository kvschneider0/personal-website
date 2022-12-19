import { generateLaplacianHTML } from "./matrix.js";

const button = document.getElementById('button');
const output = document.getElementById('matrix-display');

function click() {
    const newHTML = generateLaplacianHTML(5);
    output.innerHTML = newHTML;
    MathJax.typeset();
}

button.addEventListener('click', click);


