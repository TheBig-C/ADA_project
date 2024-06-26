function inputInit() {
    // clear the input
    $("#GraphData").val('');

    // when mouse move out of the input area, check if data is valid
    $("#GraphData").mouseleave(function () {
        // to init graph in create mode
        document.getElementById("create").checked = true;
        tranInputToDrawer(false);
    });
}

// delete the old vertexs
function delOldVertex(vertexDel) {
    for (var i = 0; i < vertexDel.length; i++) {
        canvas.removeVertex(canvas.getObjectByName('vertex' + vertexDel[i]));
    }
}

// add the new vertexs
// if needLoad == true, then get vertexs' pos from storage  
function addNewVertex(vertexAdd, needLoad) {
    for (var i = 0; i < vertexAdd.length; i++) {
        if (needLoad) {
            loadVertex(vertexAdd[i]);
        } else {

            var arg = getRandomPosition();
            canvas.addVertex(arg[0], arg[1], VertexColor, vertexAdd[i]);
            storeVertex(vertexAdd[i], arg[0], arg[1], VertexColor);
        }
    }
}

// delete the old edges
function delOldEdge(edgeDel) {
    for (var i = 0; i < edgeDel.length; i++) {
        var line;
        var loop;
        var loopR;
        var unDirectedLoop;
        var unDirectedLoopR;

        // Check if it's a loop or a regular edge
        if (edgeDel[i].length === 2) {
            // For lines
            line = canvas.getObjectByName('edge' + 'vertex' + edgeDel[i][0] + 'vertex' + edgeDel[i][1]);
            if (edgeDel[i][0] === edgeDel[i][1]) {
                unDirectedLoop = canvas.getObjectByName('unDirectedLoop' + 'vertex' + edgeDel[i][0]);
                unDirectedLoopR = canvas.getObjectByName('unDirectedLoopR' + 'vertex' + edgeDel[i][0]);
            }
        } else {
            // For loops
            if (edgeDel[i][0] === edgeDel[i][1]) {
                // It's a loop when the source and destination nodes are the same
                loop = canvas.getObjectByName('loop' + 'vertex' + edgeDel[i][0] + 'weight' + edgeDel[i][2]);
                loopR = canvas.getObjectByName('loopR' + 'vertex' + edgeDel[i][0] + 'weight' + edgeDel[i][2]);
            } else {
                // It's a regular edge
                line = canvas.getObjectByName('edge' + 'vertex' + edgeDel[i][0] + 'vertex' + edgeDel[i][1] + 'weight' + edgeDel[i][2]);
            }
        }



        if (line !== null) {
            canvas.removeLine(line);
            canvas.remove(line);
        }

        if (loop !== null) {
            // Check if it's a loop and not a regular edge
            if (edgeDel[i].length === 3) {
                canvas.removeLine(loop);
                canvas.remove(loop);
            }
        }

        if (loopR !== null) {
            // Check if it's a loopR and not a regular edge
            if (edgeDel[i].length === 3) {
                canvas.removeLine(loopR);
                canvas.remove(loopR);
            }
        }
        if (unDirectedLoop !== null) {
            // Check if it's a loopR and not a regular edge
            if (edgeDel[i].length === 2) {
                canvas.removeLine(unDirectedLoop);
                canvas.remove(unDirectedLoop);
            }
        }
        if (unDirectedLoopR !== null) {
            // Check if it's a loopR and not a regular edge
            if (edgeDel[i].length === 2) {
                canvas.removeLine(unDirectedLoopR);
                canvas.remove(unDirectedLoopR);
            }
        }
    }
}

// add the new edges
// if needLoad == true, then get edges' direction from storage  
function addNewEdge(edgeAdd, needLoad) {
    for (var i = 0; i < edgeAdd.length; i++) {
        var obj1 = canvas.getObjectByName('vertex' + edgeAdd[i][0]);
        var obj2 = canvas.getObjectByName('vertex' + edgeAdd[i][1]);

        var jsonString = JSON.stringify(obj1);

        // Buscar el texto "df" con una expresión regular
        var t1 = jsonString.match(/"text":\s*"(.*?)"/);
        var jsonString2 = JSON.stringify(obj2);

        // Buscar el texto "df" con una expresión regular
        var t2 = jsonString2.match(/"text":\s*"(.*?)"/);

        var comp = t1[1] + " " + t2[1];
        var comp2 = $('#GraphData').val().split("\n");
        var c = 0;
        comp2.forEach(item => {
            if (item.includes(comp)) {
                c++;
            }
        });

        // Check if the source and destination nodes are the same
        if (edgeAdd[i][0] === edgeAdd[i][1]) {
            if (edgeAdd[i].length == 2)
                canvas.AddUndirectedLoop(obj1);
            else
                canvas.AddLoop(obj1, edgeAdd[i][2]);
            continue;  // Skip to the next iteration
        }

        if (needLoad) {
            var args = loadEdge(edgeAdd[i][0], edgeAdd[i][1]);
            if (args[0] !== null) {
                defaultLine.stroke = args[0];
            }
            if (isDirect !== null) {
                isDirect = args[1];
            }
        } else {
            storeEdge(edgeAdd[i][0], edgeAdd[i][1], defaultLine.stroke, isDirect);
        }

        if (edgeAdd[i].length == 2) {
            canvas.AddLine(obj1, obj2);
        } else {
            canvas.AddWeightedLine(obj1, obj2, edgeAdd[i][2]);
        }
    }
    if (needLoad) {
        isDirect = true;
        defaultLine.stroke = '#000000';
        $('#colorPicker').val("#ffffff");
    }
}

// figure out what lines are edited -- the vertexs deleted, the vertexs added, the edges deleted, and the edges added
function renewArr(newVertex, newEdge, needLoad) {
    var vertexDel = [];
    var vertexAdd = [];
    var edgeDel = [];
    var edgeAdd = [];

    // since increasing order, we use two pointers to figure out what has changed
    var i = 0;
    var j = 0;

    // check vertexs
    for (; i < VertexArr.length && j < newVertex.length;) {
        if (VertexArr[i] == newVertex[j]) {
            i++;
            j++;
        } else if (VertexArr[i] < newVertex[j]) {
            vertexDel.push(VertexArr[i]);
            i++;
        } else {
            vertexAdd.push(newVertex[j]);
            j++;
        }
    }
    vertexDel = vertexDel.concat(VertexArr.slice(i));
    vertexAdd = vertexAdd.concat(newVertex.slice(j));

    // check edges
    i = j = 0;
    function cmp(a, b) {
        if (a.length != b.length) {
            return a.length - b.length;
        }
        for (var i = 0; i < a.length; i++) {
            if (a[i] > b[i]) return 1;
            if (a[i] < b[i]) return -1;
        }
        return 0;
    }
    for (; i < EdgeArr.length && j < newEdge.length;) {
        if (cmp(EdgeArr[i], newEdge[j]) === 0) {
            i++;
            j++;
        } else if (cmp(EdgeArr[i], newEdge[j]) === -1) {
            edgeDel.push(EdgeArr[i]);
            i++;
        } else {
            edgeAdd.push(newEdge[j]);
            j++;
        }
    }
    edgeDel = edgeDel.concat(EdgeArr.slice(i));
    edgeAdd = edgeAdd.concat(newEdge.slice(j));

    // renew the VertexArr and EdgeArr
    VertexArr = newVertex;
    EdgeArr = newEdge;

    // update modification on the canvas
    delOldVertex(vertexDel);
    addNewVertex(vertexAdd, needLoad);
    delOldEdge(edgeDel);
    addNewEdge(edgeAdd, needLoad);
}

// sync the data in Input with Graph Drawer
// if needLoad == true, then get vertexs' pos from storage  
function tranInputToDrawer(needLoad, fl) {
    var str = $('#GraphData').val();
    var arrStr = str.split('\n');
    var arr = [];
    var flag = false; // if meet the first line of the edges, turn it into true

    for (var i = 0; i < arrStr.length; i++) {
        if (arrStr[i] == '') {
            continue;
        }

        // ingore useless space
        var t = arrStr[i].split(' ');
        var tmp = [];
        var name = [];
        for (var j = 0; j < t.length; j++) {
            if (t[j] === "") {
                continue;
            }
            tmp.push(t[j]);
        }

        // Use string names for vertices
        for (var j = 0; j < tmp.length; j++) {
            name.push(tmp[j]);
        }

        // Check if there are more than three strings in one line
        if (tmp.length > 3) {
            alert("Se debe introducir la conexion entre nodos de la siguiente forma A B 2");
            return;
        }
        if (tmp.length >= 2) {
            flag = true;
        } else {
            if (flag) {
                alert("Por favor, compruebe los datos. Los datos del borde punteado están al revés.");
                return;
            }
        }
        arr.push(name);
    }

    // the new vertexs and edges in the input
    var newVertex = [];
    var newEdge = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length == 1) {
            newVertex.push(arr[i][0]);
        } else {
            newEdge.push(arr[i]);
        }
    }

    // make the array in increasing order
    newVertex.sort();

    // if some vertexs are not declared, auto-fix it  
    for (var i = 0; i < newEdge.length; i++) {
        for (var j = 0; j < 2; j++) {
            var x = newEdge[i][j];
            if (!findArrByName(newVertex, x)) {
                insertArr(newVertex, x);
            }
        }
    }
    // renew the grapgh and the input
    renewArr(newVertex, newEdge, needLoad);
    canvas.refresh();
    if (fl) {
        location.reload();

    }

    storeInput();
}