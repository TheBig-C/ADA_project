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

        // add the line and save
        EdgeArr.push([parseInt(startVertex.name.substring(6)), parseInt(e.target.name.substring(6))])
        canvas.AddLine(startVertex, e.target);
        canvas.refresh();
        storeEdge(parseInt(startVertex.name.substring(6)), parseInt(e.target.name.substring(6)), $('#colorPicker').val(), isDirect);
        storeInput();

        // reset the startVertex
        startVertex = null;
    });
}