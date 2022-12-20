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

console.log(getControlSet(3));