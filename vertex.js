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

// insert the new index number into arr, to keep it increasing
function insertArr(arr, val) {
    var index = 0;
    for (; index < arr.length; index++) {
        if (val < arr[index]) {
            arr.splice(index, 0, val);
            break;
        }
    }
    if (index === arr.length) {
        arr.push(val);
    }
}

// remove the new index number into VertexArr
function removeVertexArrByName(str) {
    var val = parseInt(str.substring(6));
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