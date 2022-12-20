export { generateMatrix, generateEquationHTML }

function generateMatrix(n) {
    const matrix = generateLaplacianMatrix(n);
    const matrixHTML = matrixToHTML(matrix);
    const matrixControllability = pbhTest(matrix);

    return  [matrixHTML, matrixControllability]; //make this object in the future?
}

// SECTION 1: Generate matrix & it's LaTeX code for display
// generate equation LaTeX

function generateEquationHTML(n) {
    let result = '$$L=';
    const matrixHTML = matrixToHTML(generateLaplacianMatrix(n));
    result += matrixHTML.slice(2);
    return result;
}

// writes LaTeX code which generates matrix 

function matrixToHTML(matrix) {
    const n = matrix.length;
    let result = '$$\\begin{bmatrix}';

    for (const row of matrix) {
        let tempRow = '';
        for (const num of row) {
            tempRow += `${num}&`;
        }
        tempRow = tempRow.slice(0, -1); // remove final '&'
        tempRow += '\\\\'
        result += tempRow;
    }

    result += '\\end{bmatrix}$$';

    return result;

}

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

// SECTION 2: Eigenvectors

//IMPORTANT: following line should be commented when running in the browser. For testing locally in npm, make sure it is uncommented.
// import * as math from 'mathjs';

//Big test run
function test() {
    const result = { cu: 0, cc: 0, ec: 0 };

    let used = [];

    for (let i = 0; i < 10000; i++) {
        const mat = generateLaplacianMatrix(8);
        if (used.includes(mat)) {
            continue;
        }
        used.push(mat);
        const controllability = pbhTest(mat);
        switch (controllability) {
            case 'completely uncontrollable':
                result.cu++;
                break;

            case 'conditionally controllable':
                result.cc++;
                break;
            case 'essentially controllable':
                result.ec++;
                break;
        }
    }
    console.log(result);
}
// test();

function pbhTest(matrix) {
    const n = matrix.length;
    const [ eigenValues, eigenVectors ] = getEigenState(matrix);
    const controlSet = getControlSet(n);
    let zeroCount = 0;

    const eigenValuesUnique = [...new Set(eigenValues)];
    if (eigenValues.length != eigenValuesUnique.length) {
        return 'completely uncontrollable';
    }    
 
    for (const controlVector of controlSet) {
        for (const eigenVector of eigenVectors) {
            const innerProduct = zeroFloatCorrection(math.dot(controlVector, eigenVector));
            if (innerProduct == 0) {
                zeroCount += 1;
            }
        }
    }
    if (zeroCount == math.pow(2, n) - 2) {
        return 'completely uncontrollable';
    } else if (zeroCount == 0) {
        return 'essentially controllable';
    } else {
        return 'conditionally controllable';
    }
}

const mat = generateLaplacianMatrix(6);
printMatrix(mat);
console.log(pbhTest(mat));

function getEigenState(matrix) {
    let resultVectors = []; 

    const eigenState = math.eigs(matrix);
    const resultValues = eigenState.values.map(zeroFloatCorrection);
    const vectors = eigenState.vectors;
    for (let i = 0; i < vectors.length; i++) {
        resultVectors.push(math.column(vectors, i).flat().map(zeroFloatCorrection));
    }

    return [ resultValues, resultVectors ];
}

function zeroFloatCorrection(x) {
    if (math.abs(x) < 1e-10) {
        return 0;
    } else {
        return x;
    }
}

function getControlSet(n) {
    let binaryString = '';
    for (let i = 1; i < Math.pow(2, n)-1; i++) {
        binaryString += i.toString(2).padStart(n, '0');
    }

    const binaryArray = binaryString.split('').map(Number);
    const controlSet = [];
    while (binaryArray.length) { controlSet.push(binaryArray.splice(0, n)) };


    return controlSet;
}

