function johnson(verArr,edgeArr){
    var c=0;
    while (true) {
        // Assuming VertexArr contains the vertices in the graph
        var adjacencyMatrix = generateAdjacencyMatrix(VertexArr, EdgeArr);
        orden = [];
        nuevoOrden = [];
        var aux = 0;
        for (var i = 0; i < VertexArr.length; i++) {
            aux = 0;
            for (var j = 0; j < VertexArr.length; j++) {
                if (adjacencyMatrix[j][i] > 0) {
                    aux = j + 1;
                }
            }
            orden[i] = aux;
        }

        VertexArr = selectionSort(orden, VertexArr);
        // Display the adjacency matrix in the modal, pass VertexArr as nodeNames

        adjacencyMatrix = generateAdjacencyMatrix(VertexArr, EdgeArr);
        if (isDiagonalSuperior(adjacencyMatrix)) {
            break;
        }
        
    }

    var vm={},edm=[], aux={};
console.log("df: "+verArr);

console.log("dfw: "+edgeArr);
for(let i=0;i<verArr.length;i++){
        aux[verArr[i]]=i;
    }
    
    for (var i = 0; i < edgeArr.length - 1; i++) {
        var minIndex = i;
        for (var j = i + 1; j < edgeArr.length; j++) {
            if (aux[edgeArr[j][0]] < aux[edgeArr[minIndex][0]]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            var temp = edgeArr[i];
            edgeArr[i] = edgeArr[minIndex];
            edgeArr[minIndex] = temp;
        }
    }
    valoresVertices(vm,verArr,edgeArr);
   
    valoresHolguras(edm,vm,edgeArr);
   
    for(let i=0;i<edgeArr.length;i++){
        console.log("fd: "+edm[edgeArr[i][0]+" "+edgeArr[i][1]+" "+edgeArr[i][2]])
      c=c+  addWeightedLineWithAttributesByName(edgeArr[i],edm[edgeArr[i][0]+" "+edgeArr[i][1]+" "+edgeArr[i][2]])
    }
    return c;
}
function isDiagonalSuperior(matriz) {

    // Iterar sobre cada elemento por debajo de la diagonal superior
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < i; j++) {
            if (matriz[i][j] !== 0) {
                return false;
            }
        }
    }

    return true;
}
function selectionSort(arr, arrToSort) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            // Intercambiar los elementos en el array a ordenar
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            // Intercambiar los elementos correspondientes en el otro array
            [arrToSort[i], arrToSort[minIndex]] = [arrToSort[minIndex], arrToSort[i]];


        }
    }
    return arrToSort;
}
function addWeightedLineWithAttributesByName(edge, additionalWeight) {
    // Obtener la línea por su nombre
    var c=0;
    var edgen = canvas.getObjectByName("edgevertex" + edge[0] + "vertex" + edge[1] + "weight" + edge[2]);
    
    if (edgen) {
        // Si el additionalWeight es 0, cambia el color de la línea a verde
        if (additionalWeight === 0) {
            edgen.set({ stroke: 'red' });
            canvas.renderAll(); // Re-renderiza el canvas para aplicar el cambio de color
            c=parseInt(edge[2]);
        }

        // Calcular la posición para el texto del peso adicional.
        var textPositionLeft = edgen.left;
        var textPositionTop = edgen.top + 20; // Asumiendo que esto coloca el texto debajo de la línea

        // Crear el objeto de texto para el peso adicional
        var weightText = new fabric.Text("", {
            left: textPositionLeft,
            top: textPositionTop,
            fontSize: 12,
            fill: additionalWeight==0?'red':'black'
        });
     //   addArrowHeadToMidpoint(edge,additionalWeight);
        // Añadir el texto al canvas
        canvas.add(weightText);
    }
    return c;
}
function addArrowHeadToMidpoint(edge,d) {
    var line = canvas.getObjectByName("edgevertex" + edge[0] + "vertex" + edge[1] + "weight" + edge[2]);
    
    if (line) {
        // Calcular el punto medio de la línea
        var midpointX = (line.x1 + line.x2) / 2;
        var midpointY = (line.y1 + line.y2) / 2;

        // Crear un polígono que represente la punta de la flecha
        // Ajusta los puntos según el tamaño y la orientación deseados de la punta de la flecha
        var arrowHead = new fabric.Polygon([
            {x: -10, y: 5},
            {x: 0, y: 0},
            {x: -10, y: -5}
        ], {
            left: midpointX,
            top: midpointY,
            angle: calculateAngle(line.x1, line.y1, line.x2, line.y2), // Calcula el ángulo de la línea para orientar la punta de la flecha
            fill: d==0?'green': 'black'
        });

        // Añadir la punta de la flecha al canvas
        canvas.add(arrowHead);
    }
}

function calculateAngle(x1, y1, x2, y2) {
    var angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    return angle;
}


function agregar(vertexName, rightText, leftText){
    // Encuentra el objeto (vértice) por nombre
    var vertex = canvas.getObjectByName("vertex"+vertexName);
    if (!vertex) {
        console.log('Vértice no encontrado');
        return;
    }

    // Calcula el radio del vértice basado en el tamaño del texto y el círculo
    var vertexRadius = Math.max(30, vertex.getBoundingRect().width / 2);
    vertex.item(0).set({ radius: vertexRadius });

    // Posición original del nombre del vértice
    var vertexNamePosition = {
        x: 0, // Centro del círculo
        y: -vertexRadius / 2 // Desplazado hacia arriba dentro del círculo
    };

    // Actualiza la posición del texto del nombre del vértice
    vertex.item(1).set({ 
        left: vertexNamePosition.x, 
        top: vertexNamePosition.y, 
        originX: 'center', 
        originY: 'center'
    });

    // Recalcula las posiciones de los textos adicionales dentro del vértice
    var boundingRect = vertex.getBoundingRect();
     var leftTextPosition = {
        x: -vertexRadius/2, // Alineado a la izquierda dentro del círculo
        y: vertexRadius / 4 // Posicionado verticalmente en la mitad inferior del círculo
    };
    var rightTextPosition = {
        x: vertexRadius/2, // Alineado a la derecha dentro del círculo
        y: vertexRadius / 4 // Posicionado verticalmente en la mitad inferior del círculo
    };

    // Asegúrate de que los textos sean de tamaño adecuado
    var fontSize = 14; // Ajusta esto según sea necesario
    if ((rightText.length > 5 || leftText.length > 5) && fontSize > 12) {
        fontSize = 10; // Reduce el tamaño si el texto es demasiado largo
    }

    // Crea los objetos de texto con las nuevas posiciones
    var LeftText = new fabric.Text(leftText.toString(), {
        fontSize: fontSize,
        left: leftTextPosition.x,
        top: leftTextPosition.y,
        originX: 'center',
        originY: 'center',
        fill:'#800080',
    });

    var RightText = new fabric.Text(rightText.toString(), {
        fontSize: fontSize,
        left: rightTextPosition.x,
        top: rightTextPosition.y,
        originX: 'center',
        originY: 'center',
        fill:'#800080',
    });

    // Elimina textos anteriores si existen
    // Esta parte depende de cómo estén indexados tus items dentro del grupo
    if(vertex.size() > 2) {
        vertex.remove(vertex.item(2)); // Elimina el texto izquierdo anterior
        vertex.remove(vertex.item(2)); // Elimina el texto derecho anterior
    }

    // Agrega los nuevos textos al grupo del vértice
    vertex.add(LeftText);
    vertex.add(RightText);

    // Asegúrate de volver a renderizar el canvas para ver los cambios
    canvas.renderAll();
}

function  valoresHolguras(edm,vm,edgeArr){
    for(let i=0;i<edgeArr.length;i++){
        edm[edgeArr[i][0]+" "+edgeArr[i][1]+" "+edgeArr[i][2]]=parseInt(vm[edgeArr[i][1]][1])-parseInt(vm[edgeArr[i][0]][0])-parseInt(edgeArr[i][2]);
    }
    
  
}
function valoresVertices(vm,verArr,edgeArr){
    console.log("df: "+verArr);

    console.log("dfw: "+edgeArr);
    for(let i=0;i<verArr.length;i++){
        vm[verArr[i]]=[0,0];
    }
    for(let i = 0; i < edgeArr.length; i++){
        let sourceVertex = edgeArr[i][0];
        let destinationVertex = edgeArr[i][1];
        let weight = edgeArr[i][2];
        let total=parseInt(vm[sourceVertex][0]) + parseInt(weight);
        if(total>vm[destinationVertex][0]){
            vm[destinationVertex][0] =  total;

        }
    }
   var d=edgeArr[edgeArr.length-1][1];
  
    vm[d][1]= vm[d][0]
    for(let i = edgeArr.length-1; i >=0; i--){
        let sourceVertex = edgeArr[i][1];
        let destinationVertex = edgeArr[i][0];
        let weight = edgeArr[i][2];
        let total=parseInt(vm[sourceVertex][1]) - parseInt(weight);
        if((total<vm[destinationVertex][1]&&vm[destinationVertex][1]!=0)||(total>vm[destinationVertex][1]&&vm[destinationVertex][1]==0)){
            vm[destinationVertex][1] =  total;

        }
    }
    console.log(vm);


}