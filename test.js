import { generateLaplacianMatrix, printMatrix } from "./Thesis/matrix-generation.js";

const mat = generateLaplacianMatrix(3);

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

console.log(matrixToHTML(mat));

printMatrix(mat);

