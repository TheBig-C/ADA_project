function northWest() {
    var costsMatrix = getAdjacencyMatrix();
    var numRows = costsMatrix.length;
    var numCols = costsMatrix[0].length;
    var assignmentMatrix = Array.from({ length: numRows - 1 }, () => Array(numCols - 1).fill(0));

    var supply = getSupply(costsMatrix);
    var demand = getDemand(costsMatrix);

    if (!validateSupplyDemand(supply, demand)) {
        alert('Por favor, ingrese valores válidos para la matriz de costos, asegúrese de que la suma de las demandas sea igual a la oferta.');
        return;
    }

    var i = 0, j = 0;

    while (i < supply.length && j < demand.length) {
        var amount = Math.min(supply[i], demand[j]);
        assignmentMatrix[i][j] = amount;

        supply[i] -= amount;
        demand[j] -= amount;

        if (supply[i] === 0) i++;
        if (demand[j] === 0) j++;
    }
    modiMethod(costsMatrix, assignmentMatrix);
    return assignmentMatrix;
}

function modiMethod(costsMatrix, assignmentMatrix) {
    let numRows = costsMatrix.length - 1;
    let numCols = costsMatrix[0].length - 1;
    let u = new Array(numRows).fill(null);
    let v = new Array(numCols).fill(null);
    let markedIndices = [];
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (assignmentMatrix[i][j] > 0) {
                markedIndices.push([i, j]);
            }
        }
    }

    u[0] = 0;
    let markedIndicesCount = markedIndices.length;
    while (markedIndicesCount > 0) {
        for (let index = 0; index < markedIndices.length; index++) {
            let [i, j] = markedIndices[index];
            if (u[i] !== null && v[j] === null) {
                v[j] = costsMatrix[i][j] - u[i];
                markedIndicesCount--;
            } else if (u[i] === null && v[j] !== null) {
                u[i] = costsMatrix[i][j] - v[j];
                markedIndicesCount--;
            }
        }
    }

    let d = Array.from({ length: numRows }, () => Array(numCols).fill(0));
    let canImprove = false;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (assignmentMatrix[i][j] === 0) {
                d[i][j] = (u[i] + v[j]) - costsMatrix[i][j];
                if (d[i][j] > 0) canImprove = true;
            }
        }
    }

    if (canImprove) {
        let maxNegative = 0;
        let cellToImprove = null;
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (d[i][j] > maxNegative) {
                    maxNegative = d[i][j];
                    cellToImprove = [i, j];
                }
            }
        }

        console.log(assignmentMatrix);
        console.log(cellToImprove);

        if (cellToImprove) {
            let cycle = findCycle(assignmentMatrix, cellToImprove);
            //let cycle = [[0, 3], [1, 3], [1, 1], [0,1]];
            if (cycle) {
                adjustAssignments(assignmentMatrix, cycle);

                console.log("Se puede mejorar la solución, se encontro un ciclo");
            } else {
                console.log("No se puede mejorar, no se encontro un ciclo");
            }
        }
    }
}

function findCycle(matrix, startCell, path = [startCell], visited = new Set([startCell.toString()])) {
    // Direcciones a explorar: Arriba, Abajo, Izquierda, Derecha
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    if (path.length > 1 && equals(startCell, path[0])) {
        return path; // Ciclo completado, no consideramos el ciclo trivial (inicio = fin)
    }

    for (const [dx, dy] of directions) {
        const nextCell = [startCell[0] + dx, startCell[1] + dy];
        const nextCellKey = nextCell.toString();

        // Condición para cerrar el ciclo correctamente, evitando el punto de inicio inmediato
        if (path.length > 3 && nextCellKey === path[0].toString()) {
            return [...path, nextCell]; // Ciclo completado
        }

        // Verificar los límites de la matriz, si la siguiente celda ya fue visitada, y si tiene asignación válida
        if (
            nextCell[0] >= 0 && nextCell[0] < matrix.length &&
            nextCell[1] >= 0 && nextCell[1] < matrix[0].length &&
            !visited.has(nextCellKey) && matrix[nextCell[0]][nextCell[1]] !== 0 &&
            (matrix[nextCell[0]][nextCell[1]] > 0 || nextCellKey === path[0].toString()) // Permitimos el retorno al inicio para cerrar el ciclo
        ) {
            visited.add(nextCellKey); // Marcar como visitada

            const newPath = [...path, nextCell];
            console.log("add");
            console.log(visited);
            const result = findCycle(matrix, nextCell, newPath, visited);
            if (result) return result; // Ciclo encontrado

            // No se encontró ciclo, remover de visited y path para backtracking
            visited.delete(nextCellKey);
            console.log("delete");
            console.log(visited);
        }
    }

    return null; // No se encontró un ciclo
}

function equals(cell1, cell2) {
    return cell1[0] === cell2[0] && cell1[1] === cell2[1];
}

function adjustAssignments(assignmentMatrix, cycle) {
    let min = Infinity;

    for (let i = 1; i < cycle.length; i += 2) {
        const [r, c] = cycle[i];
        min = Math.min(min, assignmentMatrix[r][c]);
    }

    for (let i = 0; i < cycle.length; ++i) {
        const [r, c] = cycle[i];
        if (i % 2 === 0) {
            assignmentMatrix[r][c] += min;
        } else {
            assignmentMatrix[r][c] -= min;
        }
    }
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