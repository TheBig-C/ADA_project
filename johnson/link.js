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

        // Check if the startVertex is the same as the endVertex (self-connection)
        if (startVertex === endVertex) {
            alert("En el algoritmo Johnson los nodos no pueden conectarse a sí mismos.");
            return;
        }

        // Check if there's already a connection from startVertex to endVertex
        var startNode = startVertex.name.substring(6);
        var endNode = endVertex.name.substring(6);

        var connectionExists = checkConnectionExists(startNode, endNode);
        var reverseConnectionExists = checkConnectionExists(endNode, startNode);
        
        if (connectionExists || reverseConnectionExists) {
            alert("En el algoritmo Johnson los nodos son monodireccionales. No se puede conectar un nodo que ya está conectado a otro.");
            return;
        }

        // Resto del código para crear las conexiones y almacenarlas
        if (isDirect) {
            var weight = prompt("Enter the weight for " + startNode + " to " + endNode + ":", "1");

            // Ensure weight is not null and convert to integer
            weight = (weight !== null && !isNaN(parseInt(weight))) ? parseInt(weight) : 1;

            EdgeArr.push([startNode, endNode, weight]);
            canvas.AddWeightedLine(startVertex, endVertex, weight);
            storeEdge(startNode, endNode, $('#colorPicker').val(), isDirect, weight);
        } else {
            EdgeArr.push([startNode, endNode]);
            canvas.AddLine(startVertex, endVertex);
            storeEdge(startNode, endNode, $('#colorPicker').val(), isDirect);
        }

        canvas.refresh();
        storeInput();

        // reset the startVertex
        startVertex = null;
    });
}

function checkConnectionExists(startNode, endNode) {
    for (var i = 0; i < EdgeArr.length; i++) {
        if (EdgeArr[i][0] === startNode && EdgeArr[i][1] === endNode) {
            return true; // La conexión ya existe
        }
    }
    return false; // La conexión no existe
}
