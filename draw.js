function fabricInit() {
    // get the object from canvas by name
    fabric.Canvas.prototype.getObjectByName = function (name) {
        var object = null,
            objects = this.getObjects();

        for (var i = 0, len = this.size(); i < len; i++) {
            if (objects[i].name && objects[i].name === name) {
                object = objects[i];
                break;
            }
        }
        return object;
    };

    // to remove a vertex
    fabric.Canvas.prototype.removeVertex = function (target) {
        if (target === null) {
            return
        }

        var toArr = copyArr(target.to);
        var fromArr = copyArr(target.from);

        // remove the edge records saved in each vertex
        toArr.forEach((item) => {
            canvas.removeLine(item);
        })
        fromArr.forEach((item) => {
            canvas.removeLine(item);
        })

        // remove relevant objects on the canvas
        toArr.forEach((item) => {
            canvas.remove(item);
        })
        fromArr.forEach((item) => {
            canvas.remove(item);
        })

        canvas.remove(target);
        canvas.renderAll();
    }


    // to remove line references when the line gets removed
    fabric.Canvas.prototype.removeLine = function (line) {
        var objects = this.getObjects();
        objects.forEach((vertex) => {
            if (vertex.isVertex === true) {
                vertex.to.forEach((item, idx) => {
                    if (item === line) {
                        vertex.to.splice(idx, 1);
                    }
                })
                vertex.from.forEach((item, idx) => {
                    if (item === line) {
                        vertex.from.splice(idx, 1);
                    }
                })
            }
        });
    }

    // create a new vertex
    fabric.Canvas.prototype.addVertex = function (x, y, color, idx) {
        if (idx === null) return;

        // create a vertex
        var Vertex = new fabric.Circle(defaultVertex);
        Vertex.setColor(color);

        // create the related context
        var Content = new fabric.Text('' + idx, defaultContext);

        // group them
        var group = new fabric.Group([Vertex, Content], {
            left: x,
            top: y,
            hasControls: false,
            hasBorders: false
        });

        // to save edges
        group.from = [];
        group.to = [];
        group.name = "vertex" + idx;
        group.isVertex = true;

        canvas.add(group);
        canvas.renderAll();
    }

    // add the line, directed from fromObject to toObject
    fabric.Canvas.prototype.AddLine = function (fromObject, toObject) {
        var from = fromObject.getCenterPoint();
        var to = toObject.getCenterPoint();

        if (from.x != to.x || from.y != to.y) {
            defaultLine.weight = "";
            defaultLine.directed = isDirect;
            var line = new fabric.Edge([from.x, from.y, to.x, to.y], defaultLine);
            line.name = "edge" + fromObject.name + toObject.name;
            canvas.add(line);
            fromObject.from.push(line);
            toObject.to.push(line);

            // sendToBack() is used to get an object to the bottom
            line.sendToBack();
        }
        canvas.discardActiveObject();
    }

    // add the line, directed from fromObject to toObject with weight
    fabric.Canvas.prototype.AddWeightedLine = function (fromObject, toObject, weight) {
        var from = fromObject.getCenterPoint();
        var to = toObject.getCenterPoint();

        if (from.x != to.x || from.y != to.y) {
            defaultLine.weight = "" + weight;
            defaultLine.directed = isDirect;
            var line = new fabric.Edge([from.x, from.y, to.x, to.y], defaultLine);
            line.name = "edge" + fromObject.name + toObject.name + "weight" + weight;
            canvas.add(line);
            fromObject.from.push(line);
            toObject.to.push(line);

            // sendToBack() is used to get an object to the bottom
            line.sendToBack();
        }
        canvas.discardActiveObject();
    }

    // refresh the data saved in graph (the VertexArr and the EdgeArr) into the input
    fabric.Canvas.prototype.refresh = function () {
        var str = '';
        for (var i = 0; i < VertexArr.length; i++) {
            str += VertexArr[i] + '\n';
        }
        for (var i = 0; i < EdgeArr.length; i++) {
            if (EdgeArr[i].length == 2)
                str += EdgeArr[i][0] + ' ' + EdgeArr[i][1] + '\n';
            else
                str += EdgeArr[i][0] + ' ' + EdgeArr[i][1] + ' ' + EdgeArr[i][2] + '\n';
        }
        $("#GraphData").val(str);
    }

}