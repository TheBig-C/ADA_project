function asignacion(matriz, opt) {
    var matrix = [], sol = {};
    copiarMatriz(matriz, matrix);
    if (opt) {
        var b = [], b1 = [], comp = [], comp1 = [];
        b = minColumna(matrix);
        b1 = armarMatrizFilas(b);
        comp = comparar(matrix, b1);
        a = minFila(comp);
        a1 = armarMatrizColumnas(a);
        comp1 = comparar(comp, a1);
        console.log(comp1);
        sol = verificarSolucion(comp1,opt);
        console.log("sol1: " + sol);
    } else {
        var b = [], b1 = [], comp = [], comp1 = [];
        b = maxColumna(matrix);
        b1 = armarMatrizFilas(b);
        comp = comparar(matrix, b1);
        a = maxFila(comp);
        a1 = armarMatrizColumnas(a);
        comp1 = comparar(comp, a1);
        console.log("compw"+comp1);
        sol = verificarSolucion(comp1,opt);
        console.log("sol1: " + sol);
    }
    return sol;
}
function veriSolucion(s1) {
    console.log("vef: "+s1);
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
            if (s1[i][valSol[j]] == 0 && verificarFila(i,sol1) ) {
                sol1.push([i, valSol[j]]);
                // Remover el índice usado de valSol
                valSol.splice(j, 1);

            } else if (s1[i][valsol2[j]] == 0 && verificarFila(i,sol1)) {
                sol2.push([i, valsol2[j]]);
                // Remover el índice usado de valsol2
                valsol2.splice(j, 1);

            }
        }
    }
    if(valSol.length>0 && valsol2.length>0){
        console.log("fasdfasdfa");
        valSol=[];
        valsol2=[];
        sol1=[];
        sol2=[];
    
         // Llenar las matrices valSol y valsol2 con los índices correspondientes
         for (let i = 0; i < s1.length; i++) {
            valSol[i] = i;
            valsol2[i] = s1.length - i - 1;
        }
        
       
        
        // Iterar sobre s1 para determinar las soluciones
        for (let i = s1.length-1; i >=0; i--) {
            for (let j =0; j  < s1[0].length-1; j++) {
                if (s1[i][valSol[j]] == 0 && verificarFila(i,sol1)) {
                    sol1.push([i, valSol[j]]);
                    // Remover el índice usado de valSol
                    valSol.splice(j, 1);
                    

                } else if (s1[i][valsol2[j]] == 0 && verificarFila(i,sol1)) {
                    sol2.push([i, valsol2[j]]);
                    // Remover el índice usado de valsol2
                    valsol2.splice(j, 1);

                }
            }
        }
    }
    
   console.log("valSol: "+valSol);
   console.log("valSol2w: "+valsol2);
    // Verificar si se encontraron todas las soluciones
    
    return valSol.length === 0||valsol2.length === 0;
    // Si no se encontraron todas las soluciones, llamar a modificarSol
}
function verificarFila(n,arr){
    for(let i=0;i<arr.length;i++){
        if(arr[i][0]==n){
            return false;
        }
    }
    return true;
}
function verificarSolucion(s1,opt) {
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
            if (s1[i][valSol[j]] == 0 && verificarFila(i,sol1) ) {
                sol1.push([i, valSol[j]]);
                // Remover el índice usado de valSol
                valSol.splice(j, 1);

            } else if (s1[i][valsol2[j]] == 0 && verificarFila(i,sol1)) {
                sol2.push([i, valsol2[j]]);
                // Remover el índice usado de valsol2
                valsol2.splice(j, 1);

            }
        }
    }
    if(valSol.length>0 && valsol2.length>0){
        console.log("fasdfasdfa");
        valSol=[];
        valsol2=[];
        sol1=[];
        sol2=[];
    
         // Llenar las matrices valSol y valsol2 con los índices correspondientes
         for (let i = 0; i < s1.length; i++) {
            valSol[i] = i;
            valsol2[i] = s1.length - i - 1;
        }
        
       
        
        // Iterar sobre s1 para determinar las soluciones
        for (let i = s1.length-1; i >=0; i--) {
            for (let j =0; j  < s1[0].length-1; j++) {
                if (s1[i][valSol[j]] == 0 && verificarFila(i,sol1)) {
                    sol1.push([i, valSol[j]]);
                    // Remover el índice usado de valSol
                    valSol.splice(j, 1);
                    

                } else if (s1[i][valsol2[j]] == 0 && verificarFila(i,sol1)) {
                    sol2.push([i, valsol2[j]]);
                    // Remover el índice usado de valsol2
                    valsol2.splice(j, 1);

                }
            }
        }
    }
    
    
    console.log("k: "+sol1);
    
    // Verificar si se encontraron todas las soluciones
    if (valSol.length === 0) {
        return sol1;
    } else if (valsol2.length === 0) {
        return sol2;
    }
    
    // Si no se encontraron todas las soluciones, llamar a modificarSol
    return modificarSol(s1,opt);
}

function modificarSol(s1,opt){
   
    var ma=[],l1=[],l2=[],c1c=0,c1n=0,c2c=0,c2cd=0,c2n=0,c=0;
    copiarMatriz(s1,ma);



    console.log("or: "+s1);
    var b1,b2,mm;
    if(opt){
        b1=1;
        b2=-1;
        mm=Number.MAX_SAFE_INTEGER;
    }else{
        b1=1;
        b2=-1;
        mm=-Number.MAX_SAFE_INTEGER;
    }
    do{
        var l1=[],l2=[],c1c=0,c1n=0,c2c=0,c2n=0;
        if(opt){
            
            mm=Number.MAX_SAFE_INTEGER;
        }else{
           
            mm=-Number.MAX_SAFE_INTEGER;
        }



        console.log("principio: "+ma)
        for(let i=0;i<ma.length;i++){
            c1c=0,c1n=0,c2c=0,c2n=0,c2cd=0;
            for(let j=0;j<ma[0].length;j++){
                if(ma[i][j]==0){
                    c1c++;
                }else{
                    c1n++;
                    
                }
                
                  
            }
            
            if(c1c>1){
               if(!l1.includes(i)){
                l1.push(i);

               }
                
            }
               
        }
        for(let i=0;i<ma.length;i++){
            c1c=0,c1n=0,c2c=0,c2n=0,c2cd=0;
            for(let j=0;j<ma[0].length;j++){
               
                if(ma[j][i]==0){
                    if(!l1.includes(j)){
                        c2c++;
                        console.log("i: "+j);
                        console.log("j: "+i);
                    }else{
                        c2cd++;
                        
                    }
                }else{
                    c2n++;

                }
                  
            }
            
            if((c2c>=1 && c2cd>1)||(c2c==0 && c2cd>=c2n)){

                if(!l2.includes(i)){
                    l2.push(i);
    
                   }
            }   
        }





        for(let i=0;i<ma.length;i++){
            for(let j=0;j<ma[0].length;j++){
                if(opt){
                    if(ma[i][j]<mm && ma[i][j]!=0){
                        if(!(l2.includes(j)|| l1.includes(i))){

                        mm=ma[i][j];
                        }
                    }
                }else{
                    if(ma[i][j]>mm && ma[i][j]!=0){
                        if(!(l2.includes(j)|| l1.includes(i))){
                            mm=ma[i][j];

                        }
                    }
                }
            }
        }
        
      
        console.log("l1: "+l1);
        console.log("l2: "+l2);
        for(var i =0 ;i<l2.length;i++){
            for(var j=0;j<l1.length;j++){
                ma[l1[j]][l2[i]]=ma[l1[j]][l2[i]]+(mm*b1);
            }
        }
      
      
        
        for(let i=0;i<ma.length;i++){
            for(let j=0;j<ma[0].length;j++){
                
                if(!(l2.includes(j)|| l1.includes(i))){
                    ma[i][j]=ma[i][j]+(mm*b2);;

                }
            }
        }
        if(!veriSolucion(ma)){
            for(let i=0;i<ma.length;i++){
                for(let j=0;j<ma[0].length;j++){
                    if(opt){
                        if(ma[i][j]<0){
                            console.log("ant="+ma[i][j]);
                            console.log(ma);
    
                            arreglar(ma,i,j,l1,l2);
                            console.log("des");
                            console.log(ma);
    
                        }
                    }else{
                        if(ma[i][j]>0){
                            console.log("ant="+ma[i][j]);
                            console.log(ma);
    
                            arreglar(ma,i,j,l1,l2);
                            console.log("des");
                            console.log(ma);
    
                        }
                    }
                    
                }
            }
        }
           
        
       
         console.log("ma: "+ma);
         c++;
    }while(!veriSolucion(ma) );
    copiarMatriz(ma,s1);
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
            if (s1[i][valSol[j]] == 0 && verificarFila(i,sol1) ) {
                sol1.push([i, valSol[j]]);
                // Remover el índice usado de valSol
                valSol.splice(j, 1);

            } else if (s1[i][valsol2[j]] == 0 && verificarFila(i,sol1)) {
                sol2.push([i, valsol2[j]]);
                // Remover el índice usado de valsol2
                valsol2.splice(j, 1);

            }
        }
    }
    if(valSol.length>0 && valsol2.length>0){
        valSol=[];
        valsol2=[];
        sol1=[];
        sol2=[];
    
         // Llenar las matrices valSol y valsol2 con los índices correspondientes
         for (let i = 0; i < s1.length; i++) {
            valSol[i] = i;
            valsol2[i] = s1.length - i - 1;
        }
        
       
        
        // Iterar sobre s1 para determinar las soluciones
        for (let i = s1.length-1; i >=0; i--) {
            for (let j =0; j  < s1[0].length-1; j++) {
                if (s1[i][valSol[j]] == 0 && verificarFila(i,sol1)) {
                    sol1.push([i, valSol[j]]);
                    // Remover el índice usado de valSol
                    valSol.splice(j, 1);
                    

                } else if (s1[i][valsol2[j]] == 0 && verificarFila(i,sol1)) {
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

function arreglar(matriz,f,c,l1,l2){
    var bf=false,bc=false;
    for(let i=0;i<matriz.length;i++){
        if(matriz[i][c]==0){
            bc=true;
        }
        if(matriz[f][i]==0){
            bf=true;
        }
    }
    for(let i=0;i<matriz.length;i++){

            if(bc){
                if(!matriz[i][c]==0){
                    matriz[i][c]=matriz[i][c]+(matriz[f][c]*-1);

                }else if (l1.includes(i) && l2.includes(c)){
                    matriz[i][c]=matriz[i][c]+(matriz[f][c]*-1);

                }
            }
            if(bf){
                if(! matriz[f][i]==0){
                matriz[f][i]=matriz[f][i]+(matriz[f][c]*-1);
            }else if(l1.includes(f) && l2.includes(i)){
                matriz[i][c]=matriz[i][c]+(matriz[f][c]*-1);

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
            if (matriz[j][i] >maximos[j]) {
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

