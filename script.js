import { generateMatrix } from "./matrix.js";

const button = document.getElementById('button');
const mathOutput = document.getElementById('matrix-math-div');
const controllabilityOutput = document.getElementById('matrix-controllability-div');

function click() {
    const value = document.getElementById('dim');
    const dim = parseInt(value.value, 10);
    const [newHTML, controllability]  = generateMatrix(dim);
    mathOutput.innerHTML = newHTML;
    controllabilityOutput.innerHTML = `<em>${controllability}</em>`;
    MathJax.typeset();
}
click();

button.addEventListener('click', click);


