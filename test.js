arr = [
    [0, -1, 2],
    [1, -1, 1],
    [-3, -3, -3]
]

function changeMatrixParity(matrix) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i].map(x => -x);
        result.push(row);
    }

    return result;
}

console.log(changeMatrixParity(arr));