function northWest() {
    // Obtener la matriz de costos y las demandas de la tabla
    var adjacencyMatrix = getAdjacencyMatrix();

    console.log(adjacencyMatrix);

    // Obtener las dimensiones de la matriz de asignación
    var numRows = adjacencyMatrix.length;
    console.log(numRows);
    var numCols = adjacencyMatrix[0].length - 1; // Excluimos la columna de oferta

    // Inicializar la matriz de asignación óptima con ceros
    var assignmentMatrix = Array.from({ length: numRows - 1 }, () => Array(numCols).fill(0));

    // Bucle principal: Algoritmo de North-West
    for (var i = 0; i < numRows - 1; i++) {
        var supply = adjacencyMatrix[i][numCols]; // Obtener la oferta de la fila
        for (var j = 0; j < numCols; j++) {
            var demand = adjacencyMatrix[numRows - 1][j]; // Obtener la demanda de la columna
            if (supply > 0 && demand > 0) {
                // Asignar la cantidad mínima entre la oferta y la demanda restante
                var amount = Math.min(supply, demand);
                assignmentMatrix[i][j] = amount;
                // Actualizar la oferta y la demanda restante
                adjacencyMatrix[i][numCols] -= amount; // Restar la cantidad asignada a la oferta
                adjacencyMatrix[numRows - 1][j] -= amount; // Restar la cantidad asignada a la demanda
                // Continuar asignando oferta restante si queda
                supply -= amount;
            }
        }
    }

    // Método de mejora por diferencias
    var improved = true;
    while (true) {
        console.log("mejorando");
        improved = false; // Reiniciamos improved a false al inicio de cada iteración
        // Calcular la matriz de diferencias
        var differenceMatrix = [];
        for (var i = 0; i < numRows - 1; i++) {
            differenceMatrix.push([]);
            for (var j = 0; j < numCols; j++) {
                differenceMatrix[i][j] = adjacencyMatrix[i][j] - assignmentMatrix[i][j];
            }
        }
        console.log(differenceMatrix);

        // Encontrar la celda con la mayor diferencia positiva
        var maxPositiveDifference = { difference: -Infinity, row: -1, col: -1 };
        for (var i = 0; i < numRows - 1; i++) {
            for (var j = 0; j < numCols; j++) {
                if (differenceMatrix[i][j] > maxPositiveDifference.difference) {
                    maxPositiveDifference.difference = differenceMatrix[i][j];
                    maxPositiveDifference.row = i;
                    maxPositiveDifference.col = j;
                    console.log("hola");
                }
            }
        }

        // Si se encontró una diferencia positiva, mejorar la asignación
        if (maxPositiveDifference.difference > 0) {
            var amount = Math.min(adjacencyMatrix[maxPositiveDifference.row][numCols], adjacencyMatrix[numRows - 1][maxPositiveDifference.col]);
            console.log("hola1");
            if (amount > 0) {
                console.log("hola2");
                assignmentMatrix[maxPositiveDifference.row][maxPositiveDifference.col] += amount;
                adjacencyMatrix[maxPositiveDifference.row][numCols] -= amount; // Restar la cantidad asignada a la oferta
                adjacencyMatrix[numRows - 1][maxPositiveDifference.col] -= amount; // Restar la cantidad asignada a la demanda
                improved = true; // Si hay una mejora, continuamos el bucle
            }
        }
        //console.log(assignmentMatrix);
    }


    return assignmentMatrix;
}

// Función para verificar que la suma de las demandas sea igual a la oferta
function validateSupplyDemand(supply, demand) {
    var totalSupply = supply.reduce((acc, val) => acc + val, 0);
    var totalDemand = demand.reduce((acc, val) => acc + val, 0);
    return totalSupply === totalDemand;
}

// Función para obtener la oferta desde la última columna de la matriz
function getSupply(adjacencyMatrix) {
    var supply = [];
    // Verificar que la matriz no esté vacía
    if (adjacencyMatrix.length === 0) {
        return supply;
    }
    // Obtener el número de columnas (suponiendo que todas las filas tienen la misma longitud)
    var numCols = adjacencyMatrix[0].length;
    // Recorrer la matriz y obtener los elementos de la última columna
    for (var i = 0; i < adjacencyMatrix.length - 1; i++) {
        supply.push(adjacencyMatrix[i][numCols - 1]);
    }
    return supply;
}

// Función para obtener la demanda desde la última fila de la matriz
function getDemand(adjacencyMatrix) {
    var demand = [];
    // Verificar que la matriz no esté vacía
    if (adjacencyMatrix.length === 0) {
        return demand;
    }
    // Obtener el número de filas (suponiendo que todas las columnas tienen la misma longitud)
    var numRows = adjacencyMatrix.length;
    // Obtener la última fila de la matriz
    var lastRow = adjacencyMatrix[numRows - 1];
    // Recorrer la última fila de la matriz y obtener los elementos, excepto el último elemento que representa la oferta
    for (var j = 0; j < lastRow.length - 1; j++) {
        demand.push(lastRow[j]);
    }
    return demand;
}

// Función para obtener la matriz de costos desde la tabla
function getAdjacencyMatrix() {
    var adjacencyMatrix = [];
    $('#adjacencyMatrixTable tbody tr').each(function () {
        var row = [];
        $(this).find('td').each(function () {
            row.push(parseInt($(this).text()) || 0);
        });
        adjacencyMatrix.push(row);
    });
    return adjacencyMatrix;
}

// Función para calcular el costo total de la asignación
function calculateTotalCost(adjacencyMatrix, assignmentMatrix) {
    var totalCost = 0;
    for (var i = 0; i < adjacencyMatrix.length - 1; i++) {
        for (var j = 0; j < adjacencyMatrix[i].length; j++) {
            // Verificar si la asignación en la celda actual es un número válido
            if (!isNaN(assignmentMatrix[i][j])) {
                // Multiplicar el costo en la celda actual por la asignación y sumarlo al costo total
                totalCost += adjacencyMatrix[i][j] * assignmentMatrix[i][j];
            } else {
                console.log("Asignación inválida en la celda [" + i + "," + j + "]");
            }
        }
    }
    return totalCost;
}

// Función para mostrar la matriz de asignación y el costo total
function displayMatrixAsTablenw(assignmentMatrix, vertices, vertexIndexMapD, vertexIndexMapO) {
    var adjacencyMatrix = getAdjacencyMatrix();
    var supply = getSupply(adjacencyMatrix);
    var demand = getDemand(adjacencyMatrix);
    var totalCost = calculateTotalCost(adjacencyMatrix, assignmentMatrix);
    var assignmentMatrixContent = "<h4 class='title is-4'>Matriz de asignación óptima</h4><table class='table'>";
    assignmentMatrixContent += "<thead><tr><th></th>";

    // Create table headers using node names
    for (var i = 0; i < vertexIndexMapD.length; i++) {
        assignmentMatrixContent += "<th>" + vertexIndexMapD[i] + "</th>";
    }
    assignmentMatrixContent += "<th>Oferta</th></tr></thead><tbody>";

    // Create table rows
    for (var i = 0; i < vertexIndexMapO.length; i++) {
        assignmentMatrixContent += "<tr><th>" + vertexIndexMapO[i] + "</th>";
        var rowSum = 0; // Suma de los valores de la fila
        for (var j = 0; j < vertexIndexMapD.length; j++) {
            // Access matrix elements properly
            var value = assignmentMatrix[i][j] || 0;
            assignmentMatrixContent += "<td>" + value + "</td>";
            rowSum += value; // Agregar el valor actual a la suma de la fila
        }
        // Add the availability column (offer)
        assignmentMatrixContent += "<td>" + supply[i] + "</td>";
        assignmentMatrixContent += "</tr>";
    }

    // Add the demand row
    assignmentMatrixContent += "<tr><th>Demanda</th>";
    var totalDemand = 0; // Suma de la demanda
    for (var j = 0; j < vertexIndexMapD.length; j++) {
        // Add cells with demand values
        var demandValue = demand[j];
        assignmentMatrixContent += "<td>" + demandValue + "</td>";
        totalDemand += demandValue; // Agregar el valor actual a la suma de la demanda
    }
    // Add the sum of demand to the last cell
    assignmentMatrixContent += "<td>" + totalDemand + "</td>";
    assignmentMatrixContent += "</tr>";

    assignmentMatrixContent += "</tbody></table>";
    assignmentMatrixContent += "<p>Costo total de asignación: " + totalCost + "</p>";
    $("#assignmentMatrixBox").html(assignmentMatrixContent);
    $("#assignmentMatrixBox").show();
}