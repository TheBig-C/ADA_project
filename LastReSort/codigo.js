const divStop  = document.getElementById("divStop"),
    selectAlg =  document.getElementById("algoritmos"),
    main =       document.getElementById("main-content"),
    divBotones = document.querySelector(".botones"),
    btnsMetodos= document.querySelectorAll(".botones button"),
    reset = document.getElementById("reset"),
    filaVel = document.getElementById("filaVel"),
    minValue = 0, maxValue = 40;
    
let n = 20,latencia = 30,status,quickPendientes;

revolver();
console.log(elementos);
//actualizarBarras(elementos,elementos.length);
inicializar();
actualizarBarras(elementos,elementos.length);
const height = $(window).height();

function revolver(){
    let i = 0;
    elementos = Array.from({length: n},() => ((maxValue / n * ++i) + 1));
    for(i = 0; i < n - 1; i++){
        const aux = elementos[i];
        const rand = getRand(i, n - 1);
        elementos[i] = elementos[rand];
        elementos[rand] = aux;
    }
}

function inicializar(){
    main.setAttribute("class",n<=200? 'pocos':'');
    texto = '';
    for(let i = 0; i < n; i++)
        texto+=`<div style="height: ${elementos[i]}vh;
             width: calc(100% / ${n}); max-width:50px;">
                <span></span>
             </div>`;
    main.innerHTML = texto;
    $(main).children().hover(async function(){
        const text = Math.round((n / maxValue) * ($(this).height() * 100 / height - 1));
        //const text =Math.round($(this).height() * 100) / 100 ;
        $(this).children("span").html(text).show();
    });
}

// Variable para almacenar los valores originales de las barras

document.getElementById("ingresarDatos").addEventListener("click", function() {
    var cantidadElementos = document.getElementById("inputN").value;
    var numerosIngresados = [];
    for (var i = 0; i < cantidadElementos; i++) {
        var numero = prompt("Ingrese el número " + (i + 1) + "/" + cantidadElementos);
        if (numero === null) {
            alert("Ingreso de números cancelado.");
            return;
        }
        numerosIngresados.push(parseInt(numero)); // Convertir a número
        console.log(numero);
    }
    alert("Números ingresados: " + numerosIngresados.join(", "));

    elementos=numerosIngresados.slice();

    console.log("antes1: "+numerosIngresados);
    console.log("antes1a: "+elementos);
    // Actualizar las barras con los nuevos valores ingresados
    actualizarBarras(numerosIngresados, cantidadElementos);
    console.log("despuees1a: "+elementos);
});

async function actualizarBarras(elementos, cantidadElementos) {
    let texto = '';
    const maxValor = Math.max(...elementos);
    
    const escala = 41 / maxValor;

    const windowHeight = $(window).height(); // Altura de la ventana del navegador

    for (let i = 0; i < cantidadElementos; i++) {
        const alturaBarra = elementos[i] * escala;
        texto += `<div class="barra" style="height: ${alturaBarra}vh; width: calc(100% / ${cantidadElementos}); max-width:50px;" data-value="${elementos[i]}">
                <span>${elementos[i]}</span>
             </div>`;
  //           console.log("Despues: "+elementos[i]);
    }

    main.innerHTML = texto;

    // Actualizar las etiquetas span con los valores originales
    $(main).children().hover(async function(){
        const originalValue = $(this).attr("data-value"); // Obtener el valor original del atributo data-value
        $(this).children("span").html(originalValue).show(); // Mostrar el valor original en la etiqueta span
    });
   // console.log("Con la etiqueta actualizada: "+elementos);

}

// Función para restaurar los valores originales de las barras después de cancelar un ordenamiento
function restaurarValoresOriginales() {
    $(".barra").each(function(index) {
        const originalValue = elementosOriginales[index];
        $(this).attr("data-value", originalValue); // Restaurar el valor original
        $(this).children("span").html(originalValue); // Mostrar el valor original
    });
}

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + parseInt(min);
}


for(let i = 0; i < btnsMetodos.length; i++){
    btnsMetodos[i].addEventListener("click",function(){
        ordenar(this.getAttribute("metodo"));
    });
}

async function ordenar(metodo){

    console.log(elementos);
    nota1 = new (window.AudioContext || window.webkitAudioContext)();
    //nota2 = new (window.AudioContext || window.webkitAudioContext)();
    //ocultarControles();
    status = "running";
    iniciarTemporizador();
    switch(metodo){
        case "seleccion":   await seleccion();
                            $(".barra").each(function(index) {
                                const originalValue = elementos[index];
                                $(this).attr("data-value", originalValue); // Restaurar el valor original
                                $(this).children("span").html(originalValue); // Mostrar el valor original
                            });
                            actualizarBarras(elementos, elementos.length); 
                            break;

        case "insercion":   console.log("Antes de INSERCION:"+elementos);
                            await insercion();
                            //await elementos.sort((a, b) => a - b);
                            $(".barra").each(function(index) {
                                const originalValue = elementos[index];
                                $(this).attr("data-value", originalValue); // Restaurar el valor original
                                $(this).children("span").html(originalValue); // Mostrar el valor original
                            });
                            actualizarBarras(elementos, elementos.length); 
                            break;

        case "shell":       console.log("Antes de SHELL:"+elementos);
                            await shell();
                            $(".barra").each(function(index) {
                                const originalValue = elementos[index];
                                $(this).attr("data-value", originalValue); // Restaurar el valor original
                                $(this).children("span").html(originalValue); // Mostrar el valor original
                            });
                            actualizarBarras(elementos, elementos.length); 
                            break;

        case "merge":       console.log("Antes de MERGE:"+elementos);
                            await mergeSort(0,elementos.length-1);  
                            $(".barra").each(function(index) {
                                const originalValue = elementos[index];
                                $(this).attr("data-value", originalValue); // Restaurar el valor original
                                $(this).children("span").html(originalValue); // Mostrar el valor original
                            });
                            actualizarBarras(elementos, elementos.length);
                            console.log("Despues de MERGE:"+elementos);
                            mostrarControles();
                       break;
    }
    detenerTemporizador();
}

document.getElementById("seleccionar").addEventListener("click", function() {
    const metodoSeleccionado = document.getElementById("metodoSeleccionado").value;
    ordenar(metodoSeleccionado);
});


function iniciarTemporizador() {
    tiempoInicio = Date.now(); // Guarda el tiempo de inicio
    temporizadorInterval = setInterval(actualizarTemporizador, 1000); // Inicia el intervalo del temporizador
}

function detenerTemporizador() {
    clearInterval(temporizadorInterval); // Detiene el intervalo del temporizador
}

function actualizarTemporizador() {
    const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000); // Calcula el tiempo transcurrido en segundos
    const minutos = Math.floor(tiempoTranscurrido / 60); // Calcula los minutos
    const segundos = tiempoTranscurrido % 60; // Calcula los segundos
    document.getElementById("temporizador").innerText = `Tiempo transcurrido: ${minutos} minutos ${segundos} segundos`; // Actualiza el elemento HTML con el tiempo transcurrido
}


async function seleccion(){
    for(let i = 0; i < n - 1; i++){
        let min = i;
        
        if(latencia == 0 && i % 10 == 0) await sleep(0);
        pintar(i,"azul");
        for(let j = i + 1; j < n; j++){
            pintar(j,"azul");
            if(latencia > 0) await sleep(latencia);
            if(elementos[min] > elementos[j]){
                if(min != i)
                    pintar(min,"#000000");
                min = j;
                pintar(j,"rojo");
                if(latencia > 0) await sleep(latencia);
            }else pintar(j,"#000000");
            if(status=="stop")return;
        }
        if(min != i){
            let aux = elementos[i];
            elementos[i] = elementos[min];
            elementos[min] = aux;  
            swap(i,min);
            pintar(min,"#000000");
        }pintar(i,"verde");
    }
    pintar(n - 1,"verde");
   mostrarControles();
}

async function insercion(){
    for(let i = 1; i < n; i++){
        let j = i;
        pintar(j,"verde");
        pintar(j - 1,"azul");
        if(latencia == 0 && i % 10 == 0) await sleep(0);
        if(latencia > 0) await sleep(latencia);
        while(elementos[j] < elementos[j - 1]){
            let aux = elementos[j];
            elementos[j] = elementos[j - 1];
            elementos[j - 1] = aux;  

            item1 = main.childNodes[j];
            item2 = main.childNodes[j - 1];
            if(j!= i) pintar(j,"azul");
            pintar(j - 1,"azul");
            if(latencia > 0) await sleep(latencia);
            swap(j,j - 1);
            if(latencia > 0) await sleep(latencia);
            if(j!=i) pintar(j,"#000000");
            pintar(j - 1,"#000000");
            if(j-- == 0) break;
            if(status=="#000000")return;
        }
        pintar(i,"#000000");
        pintar(i - 1,"#000000");

    }
    for(let i = 0; i < n; i++){
        if(latencia > 0) await sleep(latencia / 2);
        pintar(i,"verde");

    }
   mostrarControles();
}

function shellSimplificado(){
    let k = Math.floor( n / 2);
    while(k >= 1){
        for(let i = 0; i < n - k; i++){
            let j = i;
            let aux = elementos[j + k];
            while(elementos[j] > aux){
                elementos[j + k] = elementos[j];
                j -= k;
                if(j < 0) break;
            }
            elementos[j + k] = aux;
        }
        k = Math.floor(k / 2);
    }
}

async function shell(){
    let k = Math.floor( n / 2); 
    while(k >= 1){
        if(latencia == 0) await sleep(10);
        for(let i = 0; i < n - k; i++){ 
            let j = i;
            let aux = elementos[j + k];
            pintar(j,"azul");
            pintar(j + k,"azul");
            if(latencia > 0)await sleep(latencia);
            while(elementos[j] > aux){
                // pintar(j,"rojo");
                // pintar(j + k,"rojo");
                
                elementos[j + k] = elementos[j];
                setValue(j + k, getValue(j));
                if(latencia > 0)await sleep(latencia/2);
                pintar(j,"#000000");
                pintar(j + k,"#000000");
                j -= k;
                if(j < 0) break;
                pintar(j,"azul");
                pintar(j + k,"azul");
                if(latencia > 0) await sleep(latencia);

            }
            elementos[j + k] = aux;
            setValue(j + k, aux+"vh");
            if(j < 0) j += k;
            pintar(j,"#000000");
            pintar(j + k,"#000000");
            if(status=="stop")return;
        }
        k = Math.floor( k / 2);
    }
    for(let i = 0; i < n; i++){
        if(latencia > 0) await sleep(latencia / 2);
        pintar(i,"verde");
    }
   mostrarControles();
    
}

function mergeSimplificado(){
    let mitad = 1, k = 2;
    while(mitad < n){
        let array = [];
        for(let i = 0; i < n; i += k){
            const arrayA = elementos.slice(i, i + mitad);
            const arrayB = elementos.slice(i + mitad,  i + k);
            array = array.concat(getMerge(arrayA,arrayB));
        }
        elementos = array;
        mitad = k;
        k *= 2;
    }
}
function getMerge(arregloA,arregloB){
    let tamA = arregloA.length, tamB = arregloB.length,
        arregloC = [],  a = 0, b = 0;
    while(a < tamA && b < tamB){
        if(arregloA[a] <= arregloB[b])
            arregloC.push(arregloA[a++]);
        else  arregloC.push(arregloB[b++]);
    }
    while(a < tamA) arregloC.push(arregloA[a++]);
    while(b < tamB) arregloC.push(arregloB[b++]);
    
    return arregloC;
}

async function mergeAsync(mitad){
    let k = mitad * 2;
    let array = [];
    let fullArray = [];
    let pendientes = 0;
    if(latencia == 0) await sleep(10);

    for(let i = 0; i < n; i += k){
        pendientes++;
        if(status=="stop")return;
        getMergeAsync(i,k,mitad).then(function(res) {
            array[i / k] = res;
            pendientes--;
            if(pendientes == 0){
                for(j = 0; j < array.length; j++)
                    fullArray = fullArray.concat(array[j]);
                elementos = fullArray;
                if(k < n) mergeAsync(k);
            }
        });        
    }
}



async function getMergeAsync(i,k,mitad){
    const maxValor = Math.max(...elementos);
    
    // Calcular el factor de escala para que el valor máximo se corresponda con 41vh
    const escala = 41 / maxValor;

    let ultima = k >= n;
    const arregloA = elementos.slice(i, i + mitad);
    const arregloB = elementos.slice(i + mitad,  i + k);

    const tamA = arregloA.length, tamB = arregloB.length;
    let arregloC = [],  a = 0, b = 0, c = i;

    while(a < tamA || b < tamB){
        
        pintar(c, ultima? "verde":"azul");
        if(c + mitad < n)pintar(c + mitad,"azul");
        if(latencia > 0)await sleep(latencia);
        if(!ultima) pintar(c,"#000000");
        if(c + mitad < n)pintar(c + mitad,"#000000");
        if(a == tamA){
            setValue(c++,(arregloB[b]*escala)+"vh");
            arregloC.push(arregloB[b++]);
            continue;
        }
        if(b == tamB){
            setValue(c++,(arregloA[a]*escala)+"vh");
            arregloC.push(arregloA[a++]);
            continue;
        }
        if(arregloA[a] <= arregloB[b]){
            setValue(c++,(arregloA[a]*escala)+"vh");
            arregloC.push(arregloA[a++]);
        }
        else{
            setValue(c++,(arregloB[b]*escala)+"vh");
            arregloC.push(arregloB[b++]);               
        }        
    }
    if(ultima)mostrarControles();
    return arregloC;
}

function partitionSimple(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], 
        i = left, j = right; 
    while (i <= j) {
        while (items[i] < pivot)  i++; 
        while (items[j] > pivot)  j--;
        if (i <= j) {
            var temp = items[i];
            items[i] = items[j];
            items[j] = temp;
            i++; j--;
        }
    }
    return i;
}

async function mergeSort(inicio, fin) {
    if (inicio < fin) {
        const medio = Math.floor((inicio + fin) / 2);
        await mergeSort(inicio, medio);
        await mergeSort(medio + 1, fin);
        await merge(inicio, medio, fin);
    }
}

async function merge(inicio, medio, fin) {
    const n1 = medio - inicio + 1;
    const n2 = fin - medio;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++)
        L[i] = elementos[inicio + i];
    for (let j = 0; j < n2; j++)
        R[j] = elementos[medio + 1 + j];

    let i = 0;
    let j = 0;
    let k = inicio;

    while (i < n1 && j < n2) {
        pintar(k, "azul");
        if (L[i] <= R[j]) {
            elementos[k] = L[i];
            i++;
        } else {
            elementos[k] = R[j];
            j++;
        }
        if (latencia > 0) await sleep(latencia);
        pintar(k, "#000000");
        k++;
    }

    while (i < n1) {
        pintar(k, "azul");
        elementos[k] = L[i];
        i++;
        if (latencia > 0) await sleep(latencia);
        pintar(k, "#000000");
        k++;
    }

    while (j < n2) {
        pintar(k, "azul");
        elementos[k] = R[j];
        j++;
        if (latencia > 0) await sleep(latencia);
        pintar(k, "#000000");
        k++;
    }

    for (let p = inicio; p <= fin; p++) {
        await swap2(p, p);
        pintar(p, "verde");
    }

    for (let p = inicio; p <= fin; p++) {
        pintar(p, "verde");
    }

    // Actualizar las etiquetas después de la ordenación
    actualizarBarras(elementos, n);
}


async function swap2(i, j) {
    const temp = elementos[i];
    elementos[i] = elementos[j];
    elementos[j] = temp;
    await sleep(0);
    actualizarBarras(elementos, n);
}



function swap(div1, div2) {
    let aux = getValue(div1);
    setValue(div1, getValue(div2));
    setValue(div2, aux);
}
function getValue(i){
    return main.childNodes[i].style.height;
}
function setValue(i,value){
    main.childNodes[i].style.height = value;
}
function pintar(i,color){
    let hex = "";
    switch(color){
        case "verde": 
            Sonido(i);
            hex = "#53a653"; break;
        case "blanco": hex = "#eee"; break;
        case "azul":   hex = "#0041C2"; 
            Sonido(i);
            break;
        case "rojo":   hex = "#ff0000"; break;
    }
    main.childNodes[i].style.backgroundColor = hex;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms - 1));
}


divStop.addEventListener("click",function(){
    status="stop";
   mostrarControles();
    for(let i = 0; i < n; i++)
        pintar(i,"#000000");
});

$("#inputN").on("change",function(){
    n = $(this).val();
    $("#spanN").html(n);
    revolver();
    inicializar();
    reset.style.display ="none";
});
    
$("#inputTime").on("change",function(){
    latencia = $(this).val(); // Invierte el valor para aumentar la velocidad
    $("#spanTime").html(latencia);
});


function ocultarControles(){
    divStop.style.display = "block";
    divBotones.style.display = "none";
    reset.style.display ="none";
    filaVel.style.marginTop = "80px";
 }
function mostrarControles(){
    divBotones.style.display = "grid";
    divStop.style.display = "none";
    reset.style.display = "block";
    filaVel.style.marginTop = "0px";
    
}
reset.style.display ="none";
reset.addEventListener("click",function(){
    revolver();
    inicializar();
    actualizarBarras(elementos,elementos.length);
    reset.style.display ="none";
    reiniciarTemporizador();
});

function reiniciarTemporizador() {
    document.getElementById("temporizador").innerText = "Tiempo transcurrido: 0 minutos 0 segundos";
}

var nota1, nota2; 
var Sonidos= [261,277,293,311,329,349,369,392,415,440,466,493];
let notasActivas = 0;
function Sonido(valor){
    if(notasActivas > 2 || latencia < 10) return;
    valor = elementos[valor] * 10;
    //creamos oscilador
   const osc = nota1.createOscillator();

   gain = nota1.createGain();
// establece el valor inicial del volumen
gain.gain.value = .01;
   // admite: sine, square, sawtooth, triangle
   osc.type = 'square'; 
//    console.log("n: " + n);
//    console.log("x: " + valor);
//    valor = Math.round((valor -20) / (maxValue / n)) - 1;
//     valor = Math.floor(valor * 12 / n);
    // console.log("valor: "+valor);
  // osc.frequency.value=Sonidos[valor];
 // console.log(250 + ((valor / n) * 250));
  //osc.frequency.value=250 + ((valor / n) * 250);
  osc.frequency.value=250 + ((valor / 2));
   //asignamos el destino para el sonido
   osc.connect(gain);
   gain.connect(nota1.destination);
   //iniciamos la valor
 
   osc.start();
   ++notasActivas;
   const stopNote =(latencia / 1000) - .001;
   //detenemos la valor medio segundo despues
   osc.stop(nota1.currentTime + stopNote);
   setTimeout( () => --notasActivas, stopNote);
//osc.stop(context.currentTime + .01);
}