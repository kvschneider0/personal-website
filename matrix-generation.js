// generate random Laplacian matrix

function generateLaplacianMatrix(n) {
    const adjacencyMatrix = generateAdjacencyMatrix(n);
    for (let i = 0; i < n; i++) {
        const rowSum = adjacencyMatrix[i].reduce((sum, x) => sum + x);
        adjacencyMatrix[i][i] = -rowSum;
    }

    return changeMatrixParity([...adjacencyMatrix]);
}

// generate random Adjacency matrix

function generateAdjacencyMatrix(n) {
    if (n < 3) {
        console.log('Error: n < 3 for matrix dimension n.');
        return;
    }

    const result = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let  j = 0; j < n; j++) {
            row.push(randomMatrixElement(i, j));
        }
        result.push(row);
    }

    const resultTranspose = getMatrixTranspose(result);

    return sumMatrix(result, resultTranspose);

}

// prints readable matrix in console

function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let row = '|';
        for (let j = 0; j < matrix.length; j++) {
            const value = matrix[i][j];
            if (value < 0) {
                row += ` ${value}`; // one space
            } else {
                row += `  ${value}`; // two spaces
            }
        }
        row += ' |'
        console.log(row);
    }
}

// returns 1 or 0 at random for matrix entries (indexed by i, j) above diagonal and zero for all else. 

function randomMatrixElement(i, j) {
    if (j <= i) {
        return 0;
    } else {
        return Math.round(Math.random());
    }
}

// adds two matrices together

function sumMatrix(matrix1, matrix2) {
    const n = matrix1.length;
    if (n != matrix2.length) {
        console.log('Error: trying to add two matrices of unequal dimension');
        return;
    }

    const result = [...matrix1];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j]; 
        }
    }

    return result;
}   

// gets transpose matrix of given matrix

function getMatrixTranspose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

// changes parity of matrix

function changeMatrixParity(matrix) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i].map(x => -x);
        result.push(row);
    }

    return result;
}

export { generateLaplacianMatrix, printMatrix }

