import { generateLaplacianMatrix, printMatrix } from "./matrix.js";

const mat = generateLaplacianMatrix(3);
printMatrix(mat);

function matrixToHTML(matrix) {
    const n = matrix.length;
    let result = '\\(\\begin{bmatrix}';

    for (const row of matrix) {
        let tempRow = '';
        for (const num of row) {
            tempRow += `${num}&`;
        }
        tempRow = tempRow.slice(0, -1); // remove final '&'
        tempRow += '\\\\'
        result += tempRow;
    }
    result += '\\end{bmatrix}\\)';

    return result;

}

console.log(matrixToHTML(mat));


