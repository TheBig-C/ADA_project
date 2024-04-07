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

        if (supply[i] === 0 && i < supply.length) i++;
        if (demand[j] === 0 && j < demand.length) j++;
    }
    modiMethod(costsMatrix, assignmentMatrix);
    return assignmentMatrix;
}

function modiMethod(costsMatrix, assignmentMatrix) {
    let improvement = true;
    while (improvement) {
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
        let progressMade;
        do {
            progressMade = false; 
            let remainingIndices = [];
            for (let index = 0; index < markedIndices.length; index++) {
                let [i, j] = markedIndices[index];
                if (u[i] !== null && v[j] === null) {
                    v[j] = costsMatrix[i][j] - u[i];
                    progressMade = true;
                } else if (u[i] === null && v[j] !== null) {
                    u[i] = costsMatrix[i][j] - v[j];
                    progressMade = true;
                } else {
                    remainingIndices.push([i, j]);
                }
            }
            markedIndices = remainingIndices;
            if (!progressMade && markedIndices.length > 0) {
                let [i, j] = markedIndices[0];
                if (u[i] === null) {
                    u[i] = 0;
                } else {
                    v[j] = 0;
                }
                progressMade = true;
            }
        } while (progressMade && markedIndices.length > 0); 

        console.log(u);
        console.log(v);

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
        console.log(d);
        var matrix1 = [];
        for (var i = 0; i < assignmentMatrix.length; i++) {
            matrix1[i] = assignmentMatrix[i].slice(); // Copia los elementos de cada fila
        }
        console.log(matrix1);
        if (canImprove) {
            let maxPositive = 0;
            let cellToImprove = null;
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    if (d[i][j] > maxPositive) {
                        maxPositive = d[i][j];
                        cellToImprove = [i, j];
                    }
                }
            }

            
            console.log(cellToImprove);

            if (cellToImprove) {
                let cycle = findCycle(assignmentMatrix, cellToImprove);
                if (cycle) {
                    adjustAssignments(assignmentMatrix, cycle);

                    console.log("Se puede mejorar la solución, se encontro un ciclo");
                } else {
                    console.log("No se puede mejorar, no se encontro un ciclo");
                    improvement = false;
                }
            }
        } else {
            improvement = false;
        }
    }
}

function copiarMatriz(matriz, matrix) {
    for (var i = 0; i < matriz.length; i++) {
        matrix[i] = matriz[i].slice(); // Copia los elementos de cada fila
    }
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