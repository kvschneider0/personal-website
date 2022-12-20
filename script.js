import { generateMatrix } from "./matrix.js";

const button = document.getElementById('button');
const mathOutput = document.getElementById('matrix-math-div');
const controllabilityOutput = document.getElementById('matrix-controllability-div');
const graphOutput = document.getElementById('graph-display-div');

let nodes = new vis.DataSet([
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' },
]);
let edges = new vis.DataSet([
    { from: 1, to: 2, label: '1-2'},
    { from: 1, to: 3, label: '1-3'},
    { from: 2, to: 4, label: '2-4'},
    { from: 2, to: 5},
    { from: 3, to: 4},
]);

let data = {
    nodes: nodes,
    edges: edges
};
let options = {};
let network = new vis.Network(graphOutput, data, options);

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


