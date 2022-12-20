import { generateMatrix } from "./matrix.js";

const button = document.getElementById('button');
const mathOutput = document.getElementById('matrix-math-div');
const controllabilityOutput = document.getElementById('matrix-controllability-div');
const graphOutput = document.getElementById('graph-display-div');

let graphOptions = {
    edges: {
        physics: false,
        smooth: false
    }
};

function click() {
    // get user dimension input
    const value = document.getElementById('dim');
    const dim = parseInt(value.value, 10);
    // generate random matrix
    const [graphData, newHTML, controllability]  = generateMatrix(dim);
    // Draw graph
    let network = new vis.Network(graphOutput, graphData, graphOptions);
    // write new HTML elements
    mathOutput.innerHTML = newHTML;
    controllabilityOutput.innerHTML = `<em>${controllability}</em>`;
    // tell MathJax (for LaTeX) to look for new code
    MathJax.typeset();
}
click();

button.addEventListener('click', click);


