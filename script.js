import { generateLaplacianMatrix } from "./matrix-generation";

const button = document.getElementById('button');
const output = document.getElementById('output');
const countElement = document.getElementById('output');

let countValue = 0;

function click() {
    countValue += 1;
    countElement.innerHTML = `count = ${countValue}`;
}

// function click() {
//     const newHTML = matrixToHTML(generateLaplacianMatrix(5));
//     output.innerHTML = newHTML;

//     console.log('clicked');
//     Alert('clicked');
// }

function matrixToHTML(matrix) {
    const n = matrix.length;
    let result = '<table>';

    for (let i = 0; i < n; i++) {
        result += '<tr>';
        for (let j = 0; j < n; j++) {
            result += `<td>${matrix[i][j]}</td>`;
        }
        result += '</tr>';
    }
    result += '</table>';

    return result;
}

button.addEventListener('click', click);

