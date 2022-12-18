import { generateLaplacianMatrix } from "./matrix.js";

const button = document.getElementById('button');
const output = document.getElementById('matrix-display');

function click() {
    const newHTML = matrixToHTML(generateLaplacianMatrix(5));
    output.innerHTML = newHTML;

    console.log('clicked');
    Alert('clicked');
}

function matrixToHTML(matrix) {
    const n = matrix.length;
    let result = '\\(\\begin{bmatrix}';

    for (const row of matrix) {
        let tempRow = '';
        for (const num of row) {
            tempRow += `${num}&`;
        }
        tempRow = tempRow.slice(0, -1); // remove final '&'
        tempRow += '\\'
        result += tempRow;
    }
    result += '\end{bmatrix}\\)';

    return result;

}

button.addEventListener('click', click);


