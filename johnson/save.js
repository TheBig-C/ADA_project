// graph data will be saved in the buffer
function saveInit(d) {
    loadInput(d);
}

// to save input
function storeInputD(input) {
    localStorage.setItem('InputData', input);
}
function storeInput() {
    localStorage.setItem('InputData', $('#GraphData').val());
}
// to load input
function loadInput(d) {
    var input = localStorage.getItem('InputData');
    if (input === null) {
        return;
    }

    // restore the data in Input
    $('#GraphData').val(input);
    tranInputToDrawer(true,d);
}

// according to the index, save the vertex's info
function storeVertex(index, x, y, color) {
    if (x !== null) {
        localStorage.setItem('vertex' + index + 'x', x);
    }

    if (y !== null) {
        localStorage.setItem('vertex' + index + 'y', y);
    }

    if (color !== null) {
        localStorage.setItem('vertex' + index + 'color', color);
    }
}
function storeVertexColor(color,index) {
   
    if (color !== null) {
        localStorage.setItem('vertex' + index + 'color', color);
    }
}
function storeEdgeColor(x, y,color) {
    if (x > y) {
        var z = y;
        y = x;
        x = z;
    }
    if (color !== null) {
        localStorage.setItem('edgeColor' + x + 'to' + y, color);
    }
}
// to store the vertexs' positions
// when load, remember the type of the data need to be transformed
function loadVertex(index) {
    var x, y, color;
    x = parseFloat(localStorage.getItem('vertex' + index + 'x'));
    y = parseFloat(localStorage.getItem('vertex' + index + 'y'));
    color = localStorage.getItem('vertex' + index + 'color');
    if (x === null || y === null || color === null) {
        return;
    }
    canvas.addVertex(x, y, color, index);
}

// save the edge's info
function storeEdge(x, y, color, direction) {
    if (x > y) {
        var z = y;
        y = x;
        x = z;
    }

    if (color !== null) {
        localStorage.setItem('edgeColor' + x + 'to' + y, color);
    }

    if (direction !== null) {
        localStorage.setItem('edgeDirection' + x + 'to' + y, direction);
    }
}

// return the edge's info
function loadEdge(x, y) {
    if (x > y) {
        var z = y;
        y = x;
        x = z;
    }
    return [localStorage.getItem('edgeColor' + x + 'to' + y), localStorage.getItem('edgeDirection' + x + 'to' + y) == "true"];
}
