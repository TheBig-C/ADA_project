function linkInit() {
    // initial link mode
    $("#link").click(function () {
        canvas.discardActiveObject();

        // set default color
        defaultLine.stroke = '#000000';
        document.querySelector('#colorPicker').jscolor.fromString('000000');
    });

    // the edge is directed or not 
    $("#direct").click(function () {
        isDirect = true;
    });
    $("#undirect").click(function () {
        isDirect = false;
    });

    // when linking two vertexs, and the first one is chosen, activate the FocusLine
    canvas.on('mouse:up', function (e) {
        if (document.getElementById("link").checked != true || e.target === null) {
            return;
        }

        // if the first vertex isn't selected
        if (startVertex === null) {
            startVertex = canvas.getActiveObject();
            createFocusLine();
            canvas.discardActiveObject();
            return;
        }

        // remove lineFocus when the second vertex is chosen
        canvas.remove(canvas.getObjectByName('lineFocus'));

        // Obtain the target (second) vertex and weight
        

        var endVertex = e.target;
        // Convertir el objeto a JSON
var jsonString = JSON.stringify(startVertex);

// Buscar el texto "df" con una expresión regular
var t1 = jsonString.match(/"text":\s*"(.*?)"/);
var jsonString2 = JSON.stringify(endVertex);

// Buscar el texto "df" con una expresión regular
var t2 = jsonString2.match(/"text":\s*"(.*?)"/);
  
var comp=t1[1]+" "+t2[1];

var comp2=$('#GraphData').val().split("\n");
console.log("comp: "+comp);
console.log("comp2: "+comp2);
if(comp2.some(item => item.includes(comp))){
   alert("Conexion invalida");
    return 

}
var weight = prompt("Enter the weight for the edge:", "1"); // You can replace this with your own method of obtaining the weight
        // Ensure weight is not null and convert to integer
        weight = (weight !== null && !isNaN(parseInt(weight))) ? parseInt(weight) : 1;

        // Check if it's a loop (startVertex is the same as endVertex)
        if (startVertex === endVertex) {
            EdgeArr.push([startVertex.name.substring(6), endVertex.name.substring(6), weight]);
            canvas.AddLoop(startVertex, parseInt(weight));
            storeEdge(startVertex.name.substring(6), endVertex.name.substring(6), $('#colorPicker').val(), isDirect, weight);
        } else {
            // Add the line and save
            EdgeArr.push([startVertex.name.substring(6), endVertex.name.substring(6), weight]);
            canvas.AddWeightedLine(startVertex, endVertex, weight);
            storeEdge(startVertex.name.substring(6), endVertex.name.substring(6), $('#colorPicker').val(), isDirect, weight);
        }

        canvas.refresh();
        storeInput();

        // reset the startVertex
        startVertex = null;
    });
}