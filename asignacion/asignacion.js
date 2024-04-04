function asignacion(matriz, opt) {
    var matrix = [], sol = {};
    copiarMatriz(matriz, matrix);
    if (opt) {
        filasAr(matrix);
        columnasAr(matrix);
        sol = verificarSolucion(matrix, opt);
        console.log("sol1: " + sol);
    } else {
        matrizNegativa(matrix);
        prepararMatriz(matrix);
        filasAr(matrix);
        columnasAr(matrix);
        console.log("primero: ");
        for (let i = 0; i < matrix.length; i++) {
            console.log(matrix[i]);
        }

        sol = verificarSolucion(matrix, opt);
        console.log("sol1: " + sol);
    }
    return sol;
}
function veriSolucion(s1) {
    console.log("vef:")

    for (let i = 0; i < s1.length; i++) {
        console.log(s1[i]);
    }
    var valSol = [], valsol2 = [];
    var sol1 = [];
    var sol2 = [];




    // Llenar las matrices valSol y valsol2 con los índices correspondientes
    for (let i = 0; i < s1.length; i++) {
        valSol[i] = i;
        valsol2[i] = s1.length - i - 1;
    }



    // Iterar sobre s1 para determinar las soluciones
    for (let i = 0; i < s1.length; i++) {
        for (let j = 0; j < s1[0].length; j++) {
            if (s1[i][valSol[j]] == 0 && verificarFila(i, sol1)) {
                sol1.push([i, valSol[j]]);
                // Remover el índice usado de valSol
                valSol.splice(j, 1);

            } else if (s1[i][valsol2[j]] == 0 && verificarFila(i, sol1)) {
                sol2.push([i, valsol2[j]]);
                // Remover el índice usado de valsol2
                valsol2.splice(j, 1);

            }
        }
    }
    if (valSol.length > 0 && valsol2.length > 0) {
        console.log("fasdfasdfa");
        valSol = [];
        valsol2 = [];
        sol1 = [];
        sol2 = [];

        // Llenar las matrices valSol y valsol2 con los índices correspondientes
        for (let i = 0; i < s1.length; i++) {
            valSol[i] = i;
            valsol2[i] = s1.length - i - 1;
        }



        // Iterar sobre s1 para determinar las soluciones
        for (let i = s1.length - 1; i >= 0; i--) {
            for (let j = 0; j < s1[0].length - 1; j++) {
                if (s1[i][valSol[j]] == 0 && verificarFila(i, sol1)) {
                    sol1.push([i, valSol[j]]);
                    // Remover el índice usado de valSol
                    valSol.splice(j, 1);


                } else if (s1[i][valsol2[j]] == 0 && verificarFila(i, sol1)) {
                    sol2.push([i, valsol2[j]]);
                    // Remover el índice usado de valsol2
                    valsol2.splice(j, 1);

                }
            }
        }
    }

    console.log("valSol: " + valSol);
    console.log("valSol2w: " + valsol2);
    // Verificar si se encontraron todas las soluciones

    return valSol.length === 0 || valsol2.length === 0;
    // Si no se encontraron todas las soluciones, llamar a modificarSol
}
function verificarFila(n, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == n) {
            return false;
        }
    }
    return true;
}
function verificarSolucion(s1, opt) {
    var valSol = [], valsol2 = [];
    var sol1 = [];
    var sol2 = [];

    // Llenar las matrices valSol y valsol2 con los índices correspondientes
    for (let i = 0; i < s1.length; i++) {
        valSol[i] = i;
        valsol2[i] = s1.length - i - 1;
    }



    // Iterar sobre s1 para determinar las soluciones
    for (let i = 0; i < s1.length; i++) {
        for (let j = 0; j < s1[0].length; j++) {
            if (s1[i][valSol[j]] == 0 && verificarFila(i, sol1)) {
                sol1.push([i, valSol[j]]);
                // Remover el índice usado de valSol
                valSol.splice(j, 1);

            } else if (s1[i][valsol2[j]] == 0 && verificarFila(i, sol1)) {
                sol2.push([i, valsol2[j]]);
                // Remover el índice usado de valsol2
                valsol2.splice(j, 1);

            }
        }
    }
    if (valSol.length > 0 && valsol2.length > 0) {
        console.log("fasdfasdfa");
        valSol = [];
        valsol2 = [];
        sol1 = [];
        sol2 = [];

        // Llenar las matrices valSol y valsol2 con los índices correspondientes
        for (let i = 0; i < s1.length; i++) {
            valSol[i] = i;
            valsol2[i] = s1.length - i - 1;
        }



        // Iterar sobre s1 para determinar las soluciones
        for (let i = s1.length - 1; i >= 0; i--) {
            for (let j = 0; j < s1[0].length - 1; j++) {
                if (s1[i][valSol[j]] == 0 && verificarFila(i, sol1)) {
                    sol1.push([i, valSol[j]]);
                    // Remover el índice usado de valSol
                    valSol.splice(j, 1);


                } else if (s1[i][valsol2[j]] == 0 && verificarFila(i, sol1)) {
                    sol2.push([i, valsol2[j]]);
                    // Remover el índice usado de valsol2
                    valsol2.splice(j, 1);

                }
            }
        }
    }


    console.log("k: " + sol1);

    // Verificar si se encontraron todas las soluciones
    if (valSol.length === 0) {
        return sol1;
    } else if (valsol2.length === 0) {
        return sol2;
    }

    // Si no se encontraron todas las soluciones, llamar a modificarSol
    return modificarSol(s1, opt);
}

function modificarSol(s1, opt) {

    var ma = [], l1 = [], l2 = [], c1c = 0, c1n = 0, c2c = 0, c2cd = 0, c2n = 0, c = 0, lv1 = [], lv2 = [];
    copiarMatriz(s1, ma);



    console.log("or: " + s1);
    var b1 = 1, b2 = -1, mm;


    mm = Number.MAX_SAFE_INTEGER;

    do {
        var l1 = [], l2 = [], lv1 = [], lv2 = [], c1c = 0, c1n = 0, c2c = 0, c2n = 0;


        mm = Number.MAX_SAFE_INTEGER;




        console.log("principio:")

        for (let i = 0; i < ma.length; i++) {
            console.log(ma[i]);
        }

        for (let i = 0; i < ma.length; i++) {
            c1c = 0, c1n = 0, c2c = 0, c2n = 0, c2cd = 0;
            for (let j = 0; j < ma[0].length; j++) {
                if (ma[i][j] == 0) {
                    c1c++;
                } else {
                    c1n++;

                }


            }

            if (c1c > 1) {
                if (!l1.includes(i)) {
                    l1.push(i);

                }

            }

        }
        for (let i = 0; i < ma.length; i++) {
            c1c = 0, c1n = 0, c2c = 0, c2n = 0, c2cd = 0;
            for (let j = 0; j < ma[0].length; j++) {

                if (ma[j][i] == 0) {
                    if (!l1.includes(j)) {
                        c2c++;
                        console.log("i: " + j);
                        console.log("j: " + i);
                    } else {
                        c2cd++;

                    }
                } else {
                    c2n++;

                }

            }

            if ((c2c >= 1 && c2cd >= 1) || (c2c == 0 && c2cd >= c2n) || (c2c >= 1 && c2cd == 0) ||(c2cd>=Math.floor(ma.length/2) && ma.length>5)) {

                if (!l2.includes(i)) {
                    l2.push(i);

                }
            }
        }
        let l1Copy = l1.slice();
        console.log("l1 y l2 pre: "+l1+" "+l2)
        for (let h = 0; h < l1Copy.length; h++) {
            let auxl = l1Copy[h];
            let b=true;
            for (let i = 0; i < ma.length; i++) {
                console.log("numero: " + auxl);
                console.log("array: " + ma[auxl]);
                if (!(l2.includes(i))) {
                    if (ma[auxl][i] == 0) {
                        console.log("aj?")
                        b=false;
                        i = ma.length;
                    }
                }
            }
            if(b){
                l1.splice(l1.indexOf(auxl), 1);
                console.log("l1: "+auxl);
                }
        }
        // Crear una copia de l2 para iterar sobre ella sin modificar la original
        let l2Copy = l2.slice();

        for (let h = 0; h < l2Copy.length; h++) {
            let auxl = l2Copy[h];
            let b=true;
            for (let i = 0; i < ma.length; i++) {
                if (!(l1.includes(i))) {
                    if (ma[i][auxl] == 0) {
                        b=false;
                        i = ma.length;
                    }
                }
            }
            if(b){
                l2.splice(l2.indexOf(auxl), 1);
                console.log("l2: "+auxl);
                }
        }


        for (let i = 0; i < ma.length; i++) {
            c1c = 0, c1n = 0, c2c = 0, c2n = 0, c2cd = 0;
            for (let j = 0; j < ma[0].length; j++) {
                if (ma[j][i] == 0) {
                    c1c++;
                } else {
                    c1n++;

                }


            }

            if (c1c > 1) {
                if (!lv1.includes(i)) {
                    lv1.push(i);

                }

            }

        }
        for (let i = 0; i < ma.length; i++) {
            c1c = 0, c1n = 0, c2c = 0, c2n = 0, c2cd = 0;
            for (let j = 0; j < ma[0].length; j++) {

                if (ma[i][j] == 0) {
                    if (!lv1.includes(j)) {
                        c2c++;
                        console.log("i: " + i);
                        console.log("j: " + j);
                    } else {
                        c2cd++;

                    }
                } else {
                    c2n++;

                }

            }

            if ((c2c >= 1 && c2cd >= 1) || (c2c == 0 && c2cd >= c2n) || (c2c >= 1 && c2cd == 0) ||(c2cd>=Math.floor(ma.length/2) && ma.length>5)) {

                if (!lv2.includes(i)) {
                    lv2.push(i);

                }
            }
        }

        // Iteración sobre lv1
        let lv1Copy = lv1.slice();
        console.log("lv1 y lv2 pre: "+lv1+" "+lv2)

        for (let h = 0; h < lv1Copy.length; h++) {
            let auxl = lv1Copy[h];
            let b=true;
            for (let i = 0; i < ma.length; i++) {
                console.log("numero: " + auxl);
                console.log("trust: "+ma[i][auxl]);

                if (!(lv2.includes(i))) {
                    if (ma[i][auxl] == 0) {
                        b=false;
                        i = ma.length;
                    }
                }
            }
            if(b){
            lv1.splice(lv1.indexOf(auxl), 1);
console.log("lv1: "+auxl);
            }
        }

        // Iteración sobre lv2
        let lv2Copy = lv2.slice();
        console.log("lv1 y lv2 pre: "+lv1+" "+lv2)

        for (let h = 0; h < lv2Copy.length; h++) {
            let auxl = lv2Copy[h];
            let b=true;
            
            for (let i = 0; i < ma.length; i++) {
                console.log("numero: " + auxl);
                console.log("array: " + ma[auxl]);
                console.log("trust: "+ma[auxl][i]);

                if (!(lv1.includes(i))) {
                    if (ma[auxl][i] == 0) {
                       b=false;
                       console.log("l");
                        i = ma.length;
                    }
                }
            }
            if(b){
                lv2.splice(lv2.indexOf(auxl), 1);
                console.log("lv2: "+auxl);
                }
        }

        var c1 = 0, c2 = 0;
        for (let i = 0; i < ma.length; i++) {
            for (let j = 0; j < ma[0].length; j++) {
                if (!(l1.includes(i) || l2.includes(j))) {
                    c1++;
                }
                if (!(lv1.includes(j) || lv2.includes(i))) {
                    c2++;
                }
            }

        }
        console.log("l1: " + l1);
        console.log("l2: " + l2);
        console.log("lv1: " + lv1);
        console.log("lv2: " + lv2);
        if (c1 < c2) {
            l1 = lv2;
            l2 = lv1;
        }

        console.log("c1: " + c1);
        console.log("c2: " + c2);

        for (let i = 0; i < ma.length; i++) {
            for (let j = 0; j < ma[0].length; j++) {

                if (ma[i][j] < mm && ma[i][j] != 0) {
                    if (!(l2.includes(j) || l1.includes(i))) {

                        mm = ma[i][j];
                    }
                }

            }
        }



        for (var i = 0; i < l2.length; i++) {
            for (var j = 0; j < l1.length; j++) {
                ma[l1[j]][l2[i]] = ma[l1[j]][l2[i]] + (mm * b1);
            }
        }



        for (let i = 0; i < ma.length; i++) {
            for (let j = 0; j < ma[0].length; j++) {

                if (!(l2.includes(j) || l1.includes(i))) {
                    ma[i][j] = ma[i][j] + (mm * b2);;

                }
            }
        }
        console.log("matriz res: ");

        for (let i = 0; i < ma.length; i++) {
            console.log(ma[i]);
        }




        console.log("ma: " + ma);
        c++;
    } while (!veriSolucion(ma));
    copiarMatriz(ma, s1);
    console.log("ma");
    console.log(ma);
    var valSol = [], valsol2 = [];
    var sol1 = [];
    var sol2 = [];
    // Llenar las matrices valSol y valsol2 con los índices correspondientes
    for (let i = 0; i < s1.length; i++) {
        valSol[i] = i;
        valsol2[i] = s1.length - i - 1;
    }



    // Iterar sobre s1 para determinar las soluciones
    for (let i = 0; i < s1.length; i++) {
        for (let j = 0; j < s1[0].length; j++) {
            if (s1[i][valSol[j]] == 0 && verificarFila(i, sol1)) {
                sol1.push([i, valSol[j]]);
                // Remover el índice usado de valSol
                valSol.splice(j, 1);

            } else if (s1[i][valsol2[j]] == 0 && verificarFila(i, sol1)) {
                sol2.push([i, valsol2[j]]);
                // Remover el índice usado de valsol2
                valsol2.splice(j, 1);

            }
        }
    }
    if (valSol.length > 0 && valsol2.length > 0) {
        valSol = [];
        valsol2 = [];
        sol1 = [];
        sol2 = [];

        // Llenar las matrices valSol y valsol2 con los índices correspondientes
        for (let i = 0; i < s1.length; i++) {
            valSol[i] = i;
            valsol2[i] = s1.length - i - 1;
        }



        // Iterar sobre s1 para determinar las soluciones
        for (let i = s1.length - 1; i >= 0; i--) {
            for (let j = 0; j < s1[0].length - 1; j++) {
                if (s1[i][valSol[j]] == 0 && verificarFila(i, sol1)) {
                    sol1.push([i, valSol[j]]);
                    // Remover el índice usado de valSol
                    valSol.splice(j, 1);


                } else if (s1[i][valsol2[j]] == 0 && verificarFila(i, sol1)) {
                    sol2.push([i, valsol2[j]]);
                    // Remover el índice usado de valsol2
                    valsol2.splice(j, 1);

                }
            }
        }
        sol1.reverse();

        sol2.reverse();
    }


    // Verificar si se encontraron todas las soluciones
    if (valSol.length === 0) {
        return sol1;
    } else if (valsol2.length === 0) {
        return sol2;
    }

}

function arreglar(matriz, f, c, l1, l2) {
    var bf = false, bc = false;
    for (let i = 0; i < matriz.length; i++) {
        if (matriz[i][c] == 0) {
            bc = true;
        }
        if (matriz[f][i] == 0) {
            bf = true;
        }
    }
    for (let i = 0; i < matriz.length; i++) {

        if (bc) {
            if (!matriz[i][c] == 0) {
                matriz[i][c] = matriz[i][c] + (matriz[f][c] * -1);

            } else if (l1.includes(i) && l2.includes(c)) {
                matriz[i][c] = matriz[i][c] + (matriz[f][c] * -1);

            }
        }
        if (bf) {
            if (!matriz[f][i] == 0) {
                matriz[f][i] = matriz[f][i] + (matriz[f][c] * -1);
            } else if (l1.includes(f) && l2.includes(i)) {
                matriz[i][c] = matriz[i][c] + (matriz[f][c] * -1);

            }
        }

    }

}
function matrizVacia(m1) {
    let matriz = [];
    for (let i = 0; i < m1.length; i++) {
        matriz[i] = [];
        for (let j = 0; j < m1[0].length; j++) {
            matriz[i][j] = 0;
        }
    }
    return matriz;
}

function comparar(m1, m2) {
    var comp = matrizVacia(m1);
    for (var i = 0; i < m1.length; i++) {
        for (var j = 0; j < m1[i].length; j++) {
            comp[i][j] = m1[i][j] - m2[i][j];
        }
    }
    return comp;
}

function armarMatrizFilas(b) {
    var matrix = [];
    for (var i = 0; i < b.length; i++) {
        matrix[i] = b.slice(); // Copia los elementos de cada fila
    }
    return matrix;

}
function minColumna(matriz) {
    var minimos = [];

    // Inicializar el array de mínimos con el primer elemento de cada columna
    for (var j = 0; j < matriz[0].length; j++) {
        minimos[j] = matriz[0][j];
    }

    // Iterar sobre las columnas y filas para encontrar el mínimo en cada columna
    for (var j = 0; j < matriz[0].length; j++) {
        for (var i = 1; i < matriz.length; i++) {
            if (matriz[i][j] < minimos[j]) {
                minimos[j] = matriz[i][j];
            }
        }
    }

    return minimos;
}
function maxColumna(matriz) {
    var maximos = [];

    // Inicializar el array de mínimos con el primer elemento de cada columna
    for (var j = 0; j < matriz[0].length; j++) {
        maximos[j] = matriz[0][j];
    }

    // Iterar sobre las columnas y filas para encontrar el mínimo en cada columna
    for (var j = 0; j < matriz[0].length; j++) {
        for (var i = 1; i < matriz.length; i++) {
            if (matriz[i][j] > maximos[j]) {
                maximos[j] = matriz[i][j];
            }
        }
    }

    return maximos;
}
function copiarMatriz(matriz, matrix) {
    for (var i = 0; i < matriz.length; i++) {
        matrix[i] = matriz[i].slice(); // Copia los elementos de cada fila
    }
}


function minFila(matriz) {
    var minimos = [];

    // Inicializar el array de mínimos con el primer elemento de cada columna
    for (var j = 0; j < matriz[0].length; j++) {
        minimos[j] = matriz[j][0];
    }

    // Iterar sobre las columnas y filas para encontrar el mínimo en cada columna
    for (var j = 0; j < matriz[0].length; j++) {
        for (var i = 1; i < matriz.length; i++) {
            if (matriz[j][i] < minimos[j]) {
                minimos[j] = matriz[j][i];
            }
        }
    }

    return minimos;
}
function maxFila(matriz) {
    var maximos = [];

    // Inicializar el array de mínimos con el primer elemento de cada columna
    for (var j = 0; j < matriz[0].length; j++) {
        maximos[j] = matriz[j][0];
    }

    // Iterar sobre las columnas y filas para encontrar el mínimo en cada columna
    for (var j = 0; j < matriz[0].length; j++) {
        for (var i = 1; i < matriz.length; i++) {
            if (matriz[j][i] > maximos[j]) {
                maximos[j] = matriz[j][i];
            }
        }
    }

    return maximos;
}
function armarMatrizColumnas(a) {

    var nuevaMatriz = [];
    for (var i = 0; i < a.length; i++) {
        // Crear una fila con el mínimo de la fila correspondiente
        var fila = Array(a.length).fill(a[i]);
        nuevaMatriz.push(fila);
    }

    // Devolver la nueva matriz con los mínimos por fila
    return nuevaMatriz;
}


function filasAr(matrix) {
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < matrix.length; i++) {
        min = Number.MAX_SAFE_INTEGER;
        for (let j = 0; j < matrix[0].length; j++) {
            if (min > matrix[i][j]) {
                min = matrix[i][j];

            }
        }
        console.log("minfila: " + min);
        for (let j = 0; j < matrix[0].length; j++) {
            matrix[i][j] = matrix[i][j] - min;
        }
    }
}
function columnasAr(matrix) {
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < matrix.length; i++) {
        min = Number.MAX_SAFE_INTEGER;
        for (let j = 0; j < matrix[0].length; j++) {
            if (min > matrix[j][i]) {
                min = matrix[j][i];

            }
        }
        console.log("mincol: " + min);

        for (let j = 0; j < matrix[0].length; j++) {
            matrix[j][i] = matrix[j][i] - min;
        }
    }
}
function matrizNegativa(matrix) {
    console.log("matriz negativa: ");

    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i]);
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            matrix[j][i] = matrix[j][i] * (-1);
        }
    }
    console.log("matriz negativa:2 ");

    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i]);
    }
}
function prepararMatriz(matrix) {
    console.log("preparar:")

    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i]);
    }
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (min > matrix[i][j]) {
                min = matrix[i][j];

            }
        }
    }
    console.log("min: " + min);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {

            matrix[i][j] = matrix[i][j] - min;


        }
    }
    console.log("preparar2:")

    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i]);
    }
}