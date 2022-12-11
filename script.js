import { generateLaplacianMatrix } from "./matrix-generation.js";

const button = document.getElementById('button');
const output = document.getElementById('output');

function click() {
    const newHTML = matrixToHTML(generateLaplacianMatrix(5));
    output.innerHTML = newHTML;

    console.log('clicked');
    Alert('clicked');
}

function matrixToHTML(matrix) {
    const n = matrix.length;
    let result = '';

    for (let i = 0; i < n; i++) {
        result += '<tr>';
        for (let j = 0; j < n; j++) {
            result += `<td>${matrix[i][j]}</td>`;
        }
        result += '</tr>';
    }

    return result;
}

button.addEventListener('click', click);


