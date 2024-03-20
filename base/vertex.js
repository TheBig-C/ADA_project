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

// Inserta el nuevo valor en el arreglo para mantenerlo en orden
function insertArr(arr,idx) {
    // Solicita al usuario que ingrese el valor mediante un prompt
    var val=null;
    while(true){
        val = prompt("Ingrese el valor del Nodo", getVertexArrUnusedIndex())||getVertexArrUnusedIndex();

        if(!arr.includes(val)){
           break;
        }
    }

    // Inicializa la variable 'index' en 0
    var index = 0;

    // Recorre el arreglo 'arr' en busca del lugar adecuado para insertar 'val'
    for (; index < arr.length; index++) {
        // Compara 'val' con el elemento actual en el índice 'index'
        
            arr.splice(index, 0, val);
            break;  // Sale del bucle, ya que se ha insertado 'val' correctamente
        
        
          
    }

    // Si 'index' es igual a la longitud del arreglo, 'val' es mayor que todos los elementos existentes
    if (index === arr.length) {
        // En este caso, simplemente agrega 'val' al final del arreglo
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