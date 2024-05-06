// in create mode, return the biggest index number unused
function getVertexArrUnusedIndex() {
    var x = 0;
    for (var i = 0; i < VertexArr.length; i++) {
        if (x == VertexArr[i]) {
            x++;
        }
        else {
            break;
        }
    }
    return x;
}

// Insert the new value into the array while maintaining order
function insertArr(arr, idx) {
    // Request user input for node value using a prompt
    var val = null;
    while(true){
        let x = prompt("Ingrese el valor de X para el Nodo", "");
        let y = prompt("Ingrese el valor de Y para el Nodo", "");
        val = x + "_" + y; // Combine x and y into the requested format

        if (!arr.includes(val)) {
            break; // Ensure the value does not already exist in the array
        } else {
            alert("Este valor ya existe, por favor ingrese un valor único.");
        }
    }

    var index = 0;
    // Find the correct position to insert 'val'
    for (; index < arr.length; index++) {
        if (val < arr[index]) {
            arr.splice(index, 0, val);
            return val; // Exit after insertion
        }
    }

    // If 'val' is larger than all existing entries, add it at the end
    if (index === arr.length) {
        arr.push(val);
    }
    return val;
}
// remove the new index number into VertexArr
function removeVertexArrByName(str) {
    var val = str.substring(6);
    for (var i = 0; i < VertexArr.length; i++) {
        if (VertexArr[i] == val) {
            VertexArr.splice(i, 1);
            return;
        }
    }
}

// check if val exists in the arr
function findArrByName(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return true;
        }
    }
    return false;
}

// get a copy of an array
function copyArr(arr) {
    let ret = []
    arr.forEach((item) => {
        ret.push(item)
    });
    return ret
}