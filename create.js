// return an random position for a vertex, trying its best to keep away from other vertexs
function getRandomPosition() {
    for (var i = 0; i < 100; i++) {
        var x = Math.random() * (canvasWidth - VertexRadius - 2 * padding);
        var y = Math.random() * (canvasHeight - VertexRadius - 2 * padding);
        var flag = true;
        for (var j = 0; j < VertexArr.length; j++) {
            var obj = canvas.getObjectByName('vertex' + VertexArr[j]);
            if (obj === null) {
                continue;
            }

            if (Math.pow(Math.abs(x - obj.left), 2) + Math.pow(Math.abs(y - obj.top), 2) < 4 * Math.pow(VertexRadius, 2)) {
                flag = false;
                break;
            }
        }

        // if found
        if (flag) {
            return [x, y];
        }
    }
    return [0, 0]
}

function createInit() {
    // initial create mode
    $("#create").click(function () {
        canvas.discardActiveObject();
        canvas.remove(canvas.getObjectByName('lineFocus'));
        startVertex = null;

        // set default color
        document.querySelector('#colorPicker').jscolor.fromString('ffffff');
        VertexColor = '#ffffff';
    });

    // if not click on existing objects, create a new vertex 
    canvas.on('mouse:up', function (e) {
        if (document.getElementById("create").checked !== true || e.target) {
            return;
        }
        var x = e.e.x + document.documentElement.scrollLeft - $("#graph-drawer").offset().left - 30;
        var y = e.e.y + document.documentElement.scrollTop - $("#graph-drawer").offset().top - 90;
        var idx = getVertexArrUnusedIndex();
        insertArr(VertexArr, idx);

        // draw and save
        canvas.addVertex(x, y, VertexColor, idx);
        canvas.refresh();
        storeVertex(idx, x, y, VertexColor);
        storeInput();
    });
}
