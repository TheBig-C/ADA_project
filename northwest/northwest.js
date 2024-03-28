function northWest() {
    // Obtener la matriz de costos y las demandas de la tabla
    var adjacencyMatrix = getAdjacencyMatrix();
    var demand = getDemand();
    var supply = getSupply(adjacencyMatrix);

    // Verificar si los datos son válidos
    if (!adjacencyMatrix || !demand || !supply || !validateSupplyDemand(supply, demand)) {
        alert('Por favor, ingrese valores válidos para la matriz de costos, asegúrese de que la suma de las demandas sea igual a la oferta.');
        return;
    }

    // Obtener las dimensiones de la matriz de asignación
    var numRows = adjacencyMatrix.length;
    var numCols = demand.length;

    // Inicializar la matriz de asignación óptima con ceros
    var assignmentMatrix = Array.from({ length: numRows }, () => Array(numCols).fill(0));

    // Variables para controlar la demanda restante en cada columna
    var remainingDemand = demand.slice(); // Copia de la demanda original

    // Variables para controlar la oferta restante en cada fila
    var remainingSupply = supply.slice(); // Copia de la oferta original

    // Recorrer la matriz de costos y asignar según el algoritmo de North-West
    while (true) {
        // Encontrar la celda con el menor costo disponible
        var minCostCell = { cost: Infinity, row: -1, col: -1 };
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numCols; j++) {
                // Si hay oferta y demanda restantes y el costo es menor que el mínimo actual
                if (remainingSupply[i] > 0 && remainingDemand[j] > 0 && adjacencyMatrix[i][j] < minCostCell.cost) {
                    // Actualizar la celda con el nuevo costo mínimo
                    minCostCell.cost = adjacencyMatrix[i][j];
                    minCostCell.row = i;
                    minCostCell.col = j;
                }
            }
        }

        // Si no se encuentra ninguna celda con costo finito, salir del bucle
        if (minCostCell.cost === Infinity) {
            break;
        }

        // Asignar la cantidad mínima entre la oferta y la demanda restante
        var amount = Math.min(remainingSupply[minCostCell.row], remainingDemand[minCostCell.col]);
        assignmentMatrix[minCostCell.row][minCostCell.col] = amount;

        // Restar la cantidad asignada a la demanda restante en la columna
        remainingDemand[minCostCell.col] -= amount;

        // Restar la cantidad asignada a la oferta restante en la fila
        remainingSupply[minCostCell.row] -= amount;
    }

    // Calcular el costo total de la asignación
    var totalCost = calculateTotalCost(adjacencyMatrix, assignmentMatrix);

    // Mostrar la matriz de asignación óptima y el costo total
    displayAssignmentMatrix(assignmentMatrix, totalCost);
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

// Función para obtener la demanda desde la tabla
function getDemand() {
    var demand = [];
    $('#adjacencyMatrixTable tbody tr:last td:not(:last)').each(function () {
        demand.push(parseInt($(this).text()) || 0);
    });
    return demand;
}

// Función para calcular el costo total de la asignación
function calculateTotalCost(adjacencyMatrix, assignmentMatrix) {
    var totalCost = 0;
    for (var i = 0; i < adjacencyMatrix.length; i++) {
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
function displayAssignmentMatrix(assignmentMatrix, totalCost) {
    var assignmentMatrixContent = "<h4 class='title is-4'>Matriz de asignación óptima</h4><table class='table'>";
    for (var i = 0; i < assignmentMatrix.length - 1; i++) {
        assignmentMatrixContent += "<tr>";
        for (var j = 0; j < assignmentMatrix[i].length; j++) {
            assignmentMatrixContent += "<td>" + assignmentMatrix[i][j] + "</td>";
        }
        assignmentMatrixContent += "</tr>";
    }
    assignmentMatrixContent += "</table>";
    assignmentMatrixContent += "<p>Costo total de asignación: " + totalCost + "</p>";
    $("#assignmentMatrixBox").html(assignmentMatrixContent);
    $("#assignmentMatrixBox").show();
}