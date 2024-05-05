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
        isBothWays = false;
    });
    $("#undirect").click(function () {
        isDirect = false;
        isBothWays = false;
    });
    $("#bothWays").click(function () {
        isBothWays = true;
        isDirect = true;
    });

    // when linking two vertices, and the first one is chosen, activate the FocusLine
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

        // Obtain the target (second) vertex
        

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

if(comp2.some(item => item.includes(comp))){
   alert("Conexion invalida");
    return 

}
if (isBothWays) {
    // Prompt for the weight of the first connection
    var weight1 = prompt("Enter the weight for " + startVertex.name.substring(6) + " to " + endVertex.name.substring(6) +":", "1");

    // Ensure weight1 is not null and convert to integer
    weight1 = (weight1 !== null && !isNaN(parseInt(weight1))) ? parseInt(weight1) : 1;

    // Prompt for the weight of the second connection
    var weight2 = prompt("Enter the weight for " + endVertex.name.substring(6) + " to " + startVertex.name.substring(6) +":", "1");

    // Ensure weight2 is not null and convert to integer
    weight2 = (weight2 !== null && !isNaN(parseInt(weight2))) ? parseInt(weight2) : 1;

    // Add bidirectional lines with respective weights and save
    EdgeArr.push([startVertex.name.substring(6), endVertex.name.substring(6), weight1]);
    EdgeArr.push([endVertex.name.substring(6), startVertex.name.substring(6), weight2]);
    canvas.AddWeightedLine(startVertex, endVertex, weight1);
    canvas.AddWeightedLine(endVertex, startVertex, weight2);
    storeEdge(startVertex.name.substring(6), endVertex.name.substring(6), $('#colorPicker').val(), isDirect, weight1);
    storeEdge(endVertex.name.substring(6), startVertex.name.substring(6), $('#colorPicker').val(), isDirect, weight2);

    isDirect = false;
} else {
    // Check if it's a loop (startVertex is the same as endVertex)
    if (startVertex === endVertex) {
        if (isDirect) {
            var weight = prompt("Enter the weight for the loop connection:", "1");
            // Ensure weight1 is not null and convert to integer
            weight = (weight !== null && !isNaN(parseInt(weight))) ? parseInt(weight) : 1;
            EdgeArr.push([startVertex.name.substring(6), endVertex.name.substring(6), weight]);
            canvas.AddLoop(startVertex, parseInt(weight));
            storeEdge(startVertex.name.substring(6), endVertex.name.substring(6), $('#colorPicker').val(), isDirect, weight);
        } else {
            EdgeArr.push([startVertex.name.substring(6), endVertex.name.substring(6)]);
            canvas.AddUndirectedLoop(startVertex);
            storeEdge(startVertex.name.substring(6), endVertex.name.substring(6), $('#colorPicker').val(), isDirect);
        }
    } else {
        // Add the line and save
        if (isDirect) {
            // Prompt for the weight
            var weight = prompt("Enter the weight for the edge:", "1");

            // Ensure weight is not null and convert to integer
            weight = (weight !== null && !isNaN(parseInt(weight))) ? parseInt(weight) : 1;
            EdgeArr.push([startVertex.name.substring(6), endVertex.name.substring(6), weight]);
            canvas.AddWeightedLine(startVertex, endVertex, weight);
            storeEdge(startVertex.name.substring(6), endVertex.name.substring(6), $('#colorPicker').val(), isDirect, weight);
        } else {
            EdgeArr.push([startVertex.name.substring(6), e.target.name.substring(6)])
            canvas.AddLine(startVertex, e.target);
            storeEdge(startVertex.name.substring(6), e.target.name.substring(6), $('#colorPicker').val(), isDirect);
        }
    }
}

        canvas.refresh();
        storeInput();

        // reset the startVertex
        startVertex = null;
    });
}
