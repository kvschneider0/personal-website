import { generateMatrix } from "./matrix.js";

const button = document.getElementById('button');
const output = document.getElementById('matrix-display');

function click() {
    const value = document.getElementById('dim');
    const dim = parseInt(value.value, 10);
    const [newHTML, controllability]  = generateMatrix(dim);
    output.innerHTML = newHTML;
    MathJax.typeset();
}
click();

button.addEventListener('click', click);


