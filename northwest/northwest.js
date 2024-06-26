function northWest() {
  var costsMatrix = getAdjacencyMatrix();
  var numRows = costsMatrix.length;
  var numCols = costsMatrix[0].length;
  var assignmentMatrix = Array.from({ length: numRows - 1 }, () =>
    Array(numCols - 1).fill(0)
  );

  var supply = getSupply(costsMatrix);
  var demand = getDemand(costsMatrix);

  if (!validateSupplyDemand(supply, demand)) {
    alert(
      "Por favor, ingrese valores válidos para la matriz de costos, asegúrese de que la suma de las Demandas sea igual a la Disponibilidad."
    );
    return;
  }

  var i = 0,
    j = 0;

  while (i < supply.length && j < demand.length) {
    var amount = Math.min(supply[i], demand[j]);
    assignmentMatrix[i][j] = amount;

    supply[i] -= amount;
    demand[j] -= amount;

    if (supply[i] === 0 && i < supply.length) i++;
    if (demand[j] === 0 && j < demand.length) j++;
  }

  // Obtener el valor seleccionado en el combobox
  var action = document.getElementById('minMaxSelect').value;
  
  // Ejecutar la función correspondiente basada en la selección
  if (action === 'minimizar') {
    modiMethodMin(costsMatrix, assignmentMatrix);
  } else if (action === 'maximizar') {
    modiMethodMax(costsMatrix, assignmentMatrix);
  }

  return assignmentMatrix;
}

function modiMethodMin(costsMatrix, assignmentMatrix) {
  let improvement = true;
  var ccc = 0;
  while (improvement) {
    ccc++;
    console.log(ccc);
    if(ccc >= 100){
      break;
    }
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
    var ddd = 0;
    do {
      console.log(u);
      console.log(v);
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
      ddd++;
      if(ddd >= 1000){
        break;
      }
    } while (progressMade && markedIndices.length > 0);

    console.log(u);
    console.log(v);

    let d = Array.from({ length: numRows }, () => Array(numCols).fill(0));
    let canImprove = false;
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (assignmentMatrix[i][j] === 0) {
          d[i][j] = u[i] + v[j] - costsMatrix[i][j];
          if (d[i][j] > 0) canImprove = true;
        }
      }
    }
    console.log("matrixd");
    for (let i = 0; i < d.length; i++) {
      console.log(d[i]);
    }
    var matrix1 = [];
    for (var i = 0; i < assignmentMatrix.length; i++) {
      matrix1[i] = assignmentMatrix[i].slice();
    }
    console.log("matrix");
    for (let i = 0; i < matrix1.length; i++) {
      console.log(matrix1[i]);
    }
    if (canImprove) {
      let maxPositive = 0;
      let cellsToImprove = [];
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          if (d[i][j] > maxPositive) {
            maxPositive = d[i][j];
            cellsToImprove = [[i, j]];
          } else if (d[i][j] === maxPositive) {
            cellsToImprove.push([i, j]);
          }
        }
      }

      console.log(cellsToImprove);
      let cycleFound = false;
      for (let cell of cellsToImprove) {
        try {
          let cycle = findCycle(assignmentMatrix, cell);
          if (cycle) {
            adjustAssignmentsMin(assignmentMatrix, cycle);
            console.log(
              "Se puede mejorar la solución, se encontró un ciclo para la celda: ",
              cell
            );
            cycleFound = true;
            break; // Sale del bucle si se encuentra un ciclo válido
          } else {
            improvement = false;
          } // No es necesario un else si el ciclo es null, simplemente continúa
        } catch (error) {
          // Captura específicamente el error de propiedades de null y permite que el bucle continue
          if (
            error instanceof TypeError &&
            error.message.includes("Cannot read properties of null")
          ) {
            console.log(
              "Valor nulo encontrado, continuando con el siguiente elemento."
            );
            continue; // Continúa con el siguiente elemento del bucle
          } else {
            // Para cualquier otro error, podrías decidir qué hacer: imprimir el error, detener el bucle, etc.
            console.log("Error encontrado:", error);
            break; // Decide si quieres detener todo el proceso o solo imprimir el error y continuar
          }
        }
      }

      if (!cycleFound) {
        console.log(
          "No se puede mejorar, no se encontró un ciclo para ninguna celda candidata"
        );
        improvement = false;
      }
    } else {
      improvement = false;
    }
  }
}

function modiMethodMax(costsMatrix, assignmentMatrix) {
  let improvement = true;
  var ccc = 0;
  while (improvement) {
    ccc++;
    console.log(ccc);
    if(ccc >= 100){
      break;
    }
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
    var ddd = 0;
    do {
      console.log(u);
      console.log(v);
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
      ddd++;
      if(ddd >= 1000){
        break;
      }
    } while (progressMade && markedIndices.length > 0);

    console.log(u);
    console.log(v);

    let d = Array.from({ length: numRows }, () => Array(numCols).fill(0));
    let canImprove = false;
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (assignmentMatrix[i][j] === 0) {
          d[i][j] = u[i] + v[j] - costsMatrix[i][j];
          if (d[i][j] < 0) canImprove = true;
        }
      }
    }
    console.log("matrixd");
    for (let i = 0; i < d.length; i++) {
      console.log(d[i]);
    }
    var matrix1 = [];
    for (var i = 0; i < assignmentMatrix.length; i++) {
      matrix1[i] = assignmentMatrix[i].slice();
    }
    console.log("matrix");
    for (let i = 0; i < matrix1.length; i++) {
      console.log(matrix1[i]);
    }
    if (canImprove) {
      let maxPositive = 0;
      let cellsToImprove = [];
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          if (d[i][j] < maxPositive) {
            maxPositive = d[i][j];
            cellsToImprove = [[i, j]];
          } else if (d[i][j] === maxPositive) {
            cellsToImprove.push([i, j]);
          }
        }
      }

      console.log(cellsToImprove);
      let cycleFound = false;
      for (let cell of cellsToImprove) {
        try {
          let cycle = findCycle(assignmentMatrix, cell);
          if (cycle) {
            adjustAssignmentsMax(assignmentMatrix, cycle);
            console.log(
              "Se puede mejorar la solución, se encontró un ciclo para la celda: ",
              cell
            );
            cycleFound = true;
            break; // Sale del bucle si se encuentra un ciclo válido
          } else {
            improvement = false;
          } // No es necesario un else si el ciclo es null, simplemente continúa
        } catch (error) {
          // Captura específicamente el error de propiedades de null y permite que el bucle continue
          if (
            error instanceof TypeError &&
            error.message.includes("Cannot read properties of null")
          ) {
            console.log(
              "Valor nulo encontrado, continuando con el siguiente elemento."
            );
            continue; // Continúa con el siguiente elemento del bucle
          } else {
            // Para cualquier otro error, podrías decidir qué hacer: imprimir el error, detener el bucle, etc.
            console.log("Error encontrado:", error);
            break; // Decide si quieres detener todo el proceso o solo imprimir el error y continuar
          }
        }
      }

      if (!cycleFound) {
        console.log(
          "No se puede mejorar, no se encontró un ciclo para ninguna celda candidata"
        );
        improvement = false;
      }
    } else {
      improvement = false;
    }
  }
}

function adjustAssignmentsMin(assignmentMatrix, cycle) {
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

function adjustAssignmentsMax(assignmentMatrix, cycle) {
  let min = 0;
  for (let i = 1; i < cycle.length; i += 2) {
    const [r, c] = cycle[i];
    min = Math.max(min, assignmentMatrix[r][c]);
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

function findCycle(matrix, startCell) {
  var cantB = true,
    c = 0;
  var d = [],
    matriz = [],
    valor1 = [],
    valo2 = [],
    anterior,
    va = "primero";
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const dire1 = [
    [-1, 0],
    [1, 0],
  ];
  const dire2 = [
    [0, -1],
    [0, 1],
  ];
  var contador = 0;
  copiarMatriz(matrix, matriz);
  do {
    console.log("va: " + va);

    if (contador == 0) {
      (cantB = false), (c = 0);
      var auxi = startCell[0],
        auxj = startCell[1];
      if (auxi + 1 < matrix.length) {
        if (matrix[auxi + 1][auxj] > 0) c++;
      }
      if (auxi - 1 >= 0) {
        if (matrix[auxi - 1][auxj] > 0) c++;
      }
      if (auxj + 1 < matrix[0].length) {
        if (matrix[auxi][auxj + 1] > 0) c++;
      }
      if (auxj - 1 >= 0) {
        if (matrix[auxi][auxj - 1] > 0) c++;
      }
      cantB = c >= 3;
      d = directions;
      i = startCell[0];
      j = startCell[1];
      // matriz[i][j] = min;
      siguiente = [i, j];
    } else if (va == "h") {
      cantB = true;
      d = dire2;
    } else {
      cantB = true;

      d = dire1;
    }

    if (contador == 0) {
      valor1.push(siguiente);
    } else if (contador % 2 == 0) {
      valor1.push(siguiente[0]);
    } else {
      valo2.push(siguiente[0]);
    }
    contador++;
    console.log(
      "c_ad " +
        contador +
        " siguie: " +
        siguiente +
        "i: " +
        i +
        "j " +
        j +
        "star: " +
        startCell +
        "d" +
        d +
        "va: " +
        va
    );

    siguiente = camino(matriz, va, d, i, j, startCell, contador, cantB);
    va = siguiente[1];
    console.log("va: " + va);

    if (siguiente == null) {
      return null;
    }

    if (equals(siguiente[0], ["o", "k"])) {
      break;
    }
    i = siguiente[0][0];
    j = siguiente[0][1];
    console.log(
      "c_ " +
        contador +
        " siguie: " +
        siguiente +
        "i: " +
        i +
        "j " +
        j +
        "star: " +
        startCell
    );
    console.log(siguiente != startCell);
  } while (siguiente[0] != startCell);
  let arrayCombinado = [];
  for (let d = 0; d < Math.max(valor1.length, valo2.length); d++) {
    if (d < valor1.length) {
      arrayCombinado.push(valor1[d]);
    }
    if (d < valo2.length) {
      arrayCombinado.push(valo2[d]);
    }
  }
  console.log("arr: " + arrayCombinado);
  return arrayCombinado;
  //return null; // No se encontró un ciclo
}

function camino(matriz, va, d, xi, xj, startCell, contador, cantB) {
  var res = null;
  for (let i = 0; i < d.length; i++) {
    var str = d[i][0] + ", " + d[i][1];
    console.log("str: " + str + "cant: " + cantB);
    switch (str) {
      case "-1, 0":
        console.log("add");
        if (xi - 1 >= 0) {
          res = arriba(matriz, xi, xj, startCell, cantB);
          va = "h";
        }
        break;
      case "1, 0":
        if (xi + 1 < matriz.length) {
          res = abajo(matriz, xi, xj, startCell, cantB);
          va = "h";
        }
        break;
      case "0, -1":
        if (xj - 1 >= 0) {
          res = izq(matriz, xi, xj, startCell, cantB);
          va = "v";
          console.log("iz: " + res);
        }
        break;
      case "0, 1":
        if (xj + 1 < matriz[0].length) {
          res = der(matriz, xi, xj, startCell, cantB);
          va = "v";
          console.log("dec: " + res);
        }
        break;
    }
    if (res != null) {
      console.log("resL " + res);
      break;
    }
  }
  console.log("contador: " + contador + "cant " + cantB);
  if (res == null && contador % 2 == 0) {
    for (let i = 0; i < d.length; i++) {
      var str = d[i][0] + ", " + d[i][1];
      console.log("str: " + str);
      switch (str) {
        case "-1, 0":
          if (xi - 1 >= 0) {
            res = arriba1(matriz, xi, xj, startCell, cantB);
            va = "h";
          }
          break;
        case "1, 0":
          if (xi + 1 < matriz.length) {
            res = abajo1(matriz, xi, xj, startCell, cantB);
            va = "h";
          }
          break;
        case "0, -1":
          if (xj - 1 >= 0) {
            res = izq1(matriz, xi, xj, startCell, cantB);
            va = "v";
            console.log("iz: " + res);
          }
          break;
        case "0, 1":
          if (xj + 1 < matriz[0].length) {
            res = der1(matriz, xi, xj, startCell, cantB);
            va = "v";
            console.log("dec: " + res);
          }
          break;
      }
      if (res != null) {
        console.log("resL " + res);
        break;
      }
    }
  }
  console.log("cam: " + res);
  console.log("canva: " + va);
  return [res, va];
}
function fila(i, j, ma, startCell, v) {
  var ja = j + 1;
  while (ja < ma[0].length) {
    if (ma[i][ja] > 0 || equals([i, ja], startCell)) {
      if (v) {
        if (!column(i, ja, ma, startCell, false)) {
          if (ja + 1 < ma[0].length) {
            ja++;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
    ja++;
  }
  ja = j - 1;
  while (ja >= 0) {
    if (ma[i][ja] > 0 || equals([i, ja], startCell)) {
      if (v) {
        if (!column(i, ja, ma, startCell, false)) {
          if (ja - 1 >= 0) {
            ja--;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
    ja--;
  }
  return false;
}
function column(i, j, ma, startCell, v) {
  var ia = i + 1;
  while (ia < ma.length) {
    if (ma[ia][j] > 0 || equals([ia, j], startCell)) {
      if (v) {
        if (!fila(ia, j, ma, startCell, false)) {
          if (ia + 1 < ma.length) {
            ia++;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
    ia++;
  }
  ia = i - 1;
  while (ia >= 0) {
    if (ma[ia][j] > 0 || equals([ia, j], startCell)) {
      if (v) {
        if (!fila(ia, j, ma, startCell, false)) {
          if (ia - 1 >= 0) {
            ia--;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
    ia--;
  }
  return false;
}

function izq1(matriz, xi, xj, startCell, cantB) {
  var i = xi,
    j = xj - 1;
  var r = null;
  while (j >= 0) {
    if (equals([i, j], startCell)) {
      return "ok";
    }

    j--;
  }
  (i = xi), (j = xj - 1);
  while (j >= 0) {
    if (column(i, j, matriz, startCell, cantB)) {
      r = [i, j];
      break;
    } else {
      j--;
    }
  }
  return r;
}
function der1(matriz, xi, xj, startCell, cantB) {
  var i = xi,
    j = xj + 1;
  var r = null;
  while (j < matriz[0].length) {
    if (equals([i, j], startCell)) {
      return "ok";
    }
    j++;
  }
  (i = xi), (j = xj + 1);
  while (j < matriz[0].length) {
    if (column(i, j, matriz, startCell, cantB)) {
      r = [i, j];
      break;
    } else {
      j++;
    }
  }
  return r;
}
function abajo1(matriz, xi, xj, startCell, cantB) {
  var i = xi + 1,
    j = xj;
  var r = null;
  while (i < matriz.length) {
    console.log("matris: " + matriz[i][j]);

    if (equals([i, j], startCell)) {
      return "ok";
    }
    i++;
  }
  (i = xi + 1), (j = xj);
  while (i < matriz.length) {
    if (fila(i, j, matriz, startCell, cantB)) {
      r = [i, j];
      break;
    } else {
      i++;
    }
  }
  console.log("dfd: " + r);
  return r;
}
function arriba1(matriz, xi, xj, startCell, cantB) {
  var i = xi - 1,
    j = xj;
  var r = null;
  while (i >= 0) {
    if (equals([i, j], startCell)) {
      return "ok";
    }
    i--;
  }
  (i = xi - 1), (j = xj);
  while (i >= 0) {
    if (fila(i, j, matriz, startCell, cantB)) {
      r = [i, j];
      break;
    } else {
      i--;
    }
  }
  return r;
}

function izq(matriz, xi, xj, startCell, cantB) {
  var i = xi,
    j = xj - 1;
  var r = null;
  while (j >= 0) {
    if (equals([i, j], startCell)) {
      return "ok";
    }
    j--;
  }
  (i = xi), (j = xj - 1);
  while (j >= 0) {
    if (matriz[i][j] > 0) {
      if (column(i, j, matriz, startCell, cantB)) {
        r = [i, j];
        break;
      } else {
        j--;
      }
    } else {
      j--;
    }
  }
  return r;
}
function der(matriz, xi, xj, startCell, cantB) {
  var i = xi,
    j = xj + 1;
  var r = null;
  while (j < matriz[0].length) {
    if (equals([i, j], startCell)) {
      return "ok";
    }
    j++;
  }
  (i = xi), (j = xj + 1);
  while (j < matriz[0].length) {
    if (equals([i, j], startCell)) {
      return "ok";
    }
    if (matriz[i][j] > 0) {
      if (column(i, j, matriz, startCell, cantB)) {
        r = [i, j];
        break;
      } else {
        j++;
      }
    } else {
      j++;
    }
  }
  return r;
}
function abajo(matriz, xi, xj, startCell, cantB) {
  var i = xi + 1,
    j = xj;
  var r = null;
  while (i < matriz.length) {
    console.log("matris: " + matriz[i][j]);

    if (equals([i, j], startCell)) {
      return "ok";
    }
    i++;
  }
  (i = xi + 1), (j = xj);
  while (i < matriz.length) {
    console.log("matris: " + matriz[i][j]);

    if (equals([i, j], startCell)) {
      return "ok";
    }
    if (matriz[i][j] > 0) {
      if (fila(i, j, matriz, startCell, cantB)) {
        r = [i, j];
        break;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }
  console.log("dfd: " + r);
  return r;
}
function arriba(matriz, xi, xj, startCell, cantB) {
  var i = xi - 1,
    j = xj;
  var r = null;
  while (i >= 0) {
    if (equals([i, j], startCell)) {
      return "ok";
    }
    i--;
  }
  (i = xi - 1), (j = xj);
  while (i >= 0) {
    if (equals([i, j], startCell)) {
      return "ok";
    }
    if (matriz[i][j] > 0) {
      if (fila(i, j, matriz, startCell, cantB)) {
        r = [i, j];
        break;
      } else {
        i--;
      }
    } else {
      i--;
    }
  }
  return r;
}

function equals(cell1, cell2) {
  return cell1[0] === cell2[0] && cell1[1] === cell2[1];
}
function copiarMatriz(matriz, matrix) {
  for (var i = 0; i < matriz.length; i++) {
    matrix[i] = matriz[i].slice(); // Copia los elementos de cada fila
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
  $("#adjacencyMatrixTable tbody tr").each(function () {
    var row = [];
    $(this)
      .find("td")
      .each(function () {
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
function displayMatrixAsTablenw(
  assignmentMatrix,
  vertices,
  vertexIndexMapD,
  vertexIndexMapO
) {
  var adjacencyMatrix = getAdjacencyMatrix();
  var supply = getSupply(adjacencyMatrix);
  var demand = getDemand(adjacencyMatrix);
  var totalCost = calculateTotalCost(adjacencyMatrix, assignmentMatrix);
  var assignmentMatrixContent =
    "<h4 class='title is-4'>Matriz de asignación óptima</h4><table class='table'>";
  assignmentMatrixContent += "<thead><tr><th></th>";

  // Create table headers using node names
  for (var i = 0; i < vertexIndexMapD.length; i++) {
    assignmentMatrixContent += "<th>" + vertexIndexMapD[i] + "</th>";
  }
  assignmentMatrixContent += "<th>Disponibilidad</th></tr></thead><tbody>";

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
  assignmentMatrixContent +=
    "<p>Costo total de asignación: " + totalCost + "</p>";
  $("#assignmentMatrixBox").html(assignmentMatrixContent);
  $("#assignmentMatrixBox").show();
}
