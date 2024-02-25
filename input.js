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
        if (edgeDel[i].length == 2)
            line = canvas.getObjectByName('edge' + 'vertex' + edgeDel[i][0] + 'vertex' + edgeDel[i][1]);
        else
            line = canvas.getObjectByName('edge' + 'vertex' + edgeDel[i][0] + 'vertex' + edgeDel[i][1] + 'weight' + edgeDel[i][2]);

        if (line !== null) {
            canvas.removeLine(line);
            canvas.remove(line);
        }
    }
}

// add the new edges
// if needLoad == true, then get edges' direction from storage  
function addNewEdge(edgeAdd, needLoad) {
    for (var i = 0; i < edgeAdd.length; i++) {
        var obj1 = canvas.getObjectByName('vertex' + edgeAdd[i][0]);
        var obj2 = canvas.getObjectByName('vertex' + edgeAdd[i][1]);
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
        }
        else {
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
function tranInputToDrawer(needLoad) {
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
        var num = [];
        for (var j = 0; j < t.length; j++) {
            if (t[j] === "") {
                continue;
            }
            tmp.push(t[j]);
        }

        // to check if any chars are not between '0' and '9'
        for (var j = 0; j < tmp.length; j++) {
            if (isNaN(parseInt(tmp[j]))) {
                alert("请检查数据 只支持数字字符");
                return;
            }
            num.push(parseInt(tmp[j]));
        }

        // to check if there are more than three integers in one line
        if (tmp.length > 3) {
            alert("请检查数据 一行不能超过三个");
            return;
        }
        if (tmp.length >= 2) {
            flag = true;
        } else {
            if (flag) {
                alert("请检查数据 点边数据颠倒");
                return;
            }
        }
        arr.push(num);
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
    newVertex.sort(function (a, b) {
        if (a.length == b.length) {
            return a - b;
        }
        return a.length - b.length;
    });
    newEdge.sort(function (a, b) {
        if (a[0] != b[0]) {
            return a[0] - b[0];
        } else if (a[1] != b[1]) {
            return a[1] - b[1];
        } else if (b.length != a.length) {
            return a.length - b.length;
        } else {
            return 0;
        }
    })

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
    storeInput();
}