function deleteInit() {
    // initial delete mode
    $("#delete").click(function () {
        canvas.discardActiveObject();
        canvas.remove(canvas.getObjectByName('lineFocus'));
        startVertex = null;
    });


    // when deleting a vertex, remove the connected edges
    canvas.on('mouse:up', function (e) {
        if (document.getElementById("delete").checked != true || e.target === null) {
            return;
        }
        canvas.removeVertex(e.target);
        removeVertexArrByName(e.target.name);
        for (var i = 0; i < EdgeArr.length;) {
            if (!findArrByName(VertexArr, EdgeArr[i][0]) || !findArrByName(VertexArr, EdgeArr[i][1])) {
                EdgeArr.splice(i, 1);
            } else {
                i++
            }

        }
        canvas.refresh();
        storeInput();
    });
}