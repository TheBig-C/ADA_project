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
    // Variable para almacenar el estado del botón de selección
    var isSelectMode = false;

    // Evento que se dispara cuando cambia el estado del botón de selección
    document.getElementById('select').addEventListener('change', function () {
        isSelectMode = this.checked;

        // Deselecciona todos los objetos si se desactiva el modo de selección
        if (!isSelectMode) {
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    });

    // Agrega un evento de selección a los objetos circulares (vértices)
    canvas.on('selection:created', function (options) {
        if (!isSelectMode) return; // No realiza acciones si el modo de selección no está activado

        var selectedObject = options.target;

        // Verifica si el objeto seleccionado es un vértice (grupo con la propiedad isVertex)
        if (selectedObject.isVertex) {
            // Cambia el color del borde del círculo al seleccionarlo
            selectedObject.getObjects()[0].set({
                stroke: 'red',  // Puedes cambiar el color al que desees
                strokeWidth: 2  // Puedes ajustar el grosor del borde
            });

            // Redibuja el lienzo para aplicar los cambios visuales
            canvas.renderAll();
        }
    });

    // Agrega un evento para restablecer el color del borde cuando se deselecciona el objeto
    canvas.on('mouse:up', function (options) {
        if (!isSelectMode) return; // No realiza acciones si el modo de selección no está activado

        var target = options.target;

        // Verifica si el objeto seleccionado es un vértice (grupo con la propiedad isVertex)
        if (target && target.isVertex) {
            // Verifica si el vértice ya estaba seleccionado
            if (target.isSelected) {
                // Deselecciona el vértice (restaura el color del borde)
                target.getObjects()[0].set({
                    stroke: defaultVertex.stroke,
                    strokeWidth: defaultVertex.strokeWidth
                });

                // Actualiza el estado de selección en el vértice
                target.isSelected = false;
            } else {
                // Cambia el color del borde del círculo al seleccionarlo
                target.getObjects()[0].set({
                    stroke: 'red',  // Puedes cambiar el color al que desees
                    strokeWidth: 2  // Puedes ajustar el grosor del borde
                });

                // Actualiza el estado de selección en el vértice
                target.isSelected = true;
            }

            // Redibuja el lienzo para aplicar los cambios visuales
            canvas.renderAll();
        }
    });


    // Agrega un evento de selección a los objetos circulares (vértices)






    canvas.on('selection:created', function (options) {
        if (!isSelectMode) return; // No realiza acciones si el modo de selección no está activado
        var selectedObject = options.target;
        // Verifica si el objeto seleccionado es un vértice (grupo con la propiedad isVertex)
        if (selectedObject.isVertex) {

            // Actualiza los valores de los inputs con los datos del vértice seleccionado
            document.getElementById('colorPicker').value = selectedObject.getObjects()[0].get('fill');
            document.getElementById('valuePicker').value = selectedObject.name.substring(6);
            // Agrega un evento al botón para aplicar los cambios
            document.getElementById('applyChangesBtn').addEventListener('click', function () {

                var newValue = document.getElementById('valuePicker').value;
                if (!VertexArr.includes(newValue) || newValue == selectedObject.name.substring(6)) {
                    applyChanges(selectedObject);

                } else {
                    alert("Ingrese otro valor para el nodo");
                }


            });
        }
    });

    // Agrega un evento de deselección para quitar el evento del botón


    // Función para aplicar los cambios al vértice
    function applyChanges(selectedObject) {
        // No realiza acciones si el modo de selección no está activado
        var str = $('#GraphData').val();
        var newColor = document.getElementById('colorPicker').value;
        var newValue = document.getElementById('valuePicker').value;
        var x = selectedObject.getObjects()[0].get('x');
        var y = selectedObject.getObjects()[0].get('y');
        VertexArr.forEach(function (v) {
            if (v == selectedObject.name.substring(6)) {
                v = newValue;
            }
        });
        //selectedObject.getObjects()[0].set({ fill: newColor });
        //selectedObject.name="vertex"+newValue;
        var nuevoTexto = str.replace(new RegExp(selectedObject.name.substring(6), 'gi'), newValue);
        canvas.remove(selectedObject);
        $('#GraphData').val(nuevoTexto);
        // console.log(newColor);
        canvas.addVertex(x, y, newColor, newValue);
        tranInputToDrawer(false, true);
        storeVertexColor(newColor, newValue);

    }









    // Función para actualizar el vértice al cambiar los valores en los inputs

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
            // Agrega la propiedad 'selectable' al objeto defaultLine
            defaultLine.selectable = true;
            defaultLine.objectCaching = false;

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

        // Create unique identifiers for both directions
        var connectionIdAB = fromObject.name + "_" + toObject.name;
        var connectionIdBA = toObject.name + "_" + fromObject.name;

        // Check if there is already a connection in either direction
        var existingConnectionAB = connections.find(conn => conn === connectionIdAB);
        var existingConnectionBA = connections.find(conn => conn === connectionIdBA);

        if (existingConnectionAB || existingConnectionBA) {
            defaultLine.weight = "" + weight;
            defaultLine.directed = isDirect;
            var angle = Math.atan2(to.y - from.y, to.x - from.x);
            var perpendicularAngle = angle + Math.PI / 2;
            var separationDistance = -5;
            // Agrega la propiedad 'selectable' al objeto defaultLine
            defaultLine.objectCaching = false;

            defaultLine.selectable = true;

            var line = new fabric.Edge([
                from.x + separationDistance * Math.cos(perpendicularAngle),
                from.y + separationDistance * Math.sin(perpendicularAngle),
                to.x + separationDistance * Math.cos(perpendicularAngle),
                to.y + separationDistance * Math.sin(perpendicularAngle)
            ], defaultLine);

            line.name = "edge" + fromObject.name + toObject.name + "weight" + weight; // Use one of the connection IDs
            canvas.add(line);
            fromObject.from.push(line);
            toObject.to.push(line);

            // sendToBack() is used to get an object to the bottom
            line.sendToBack();
        } else {
            // Draw the new connection as usual
            defaultLine.weight = "" + weight;
            defaultLine.directed = isDirect;
            var line = new fabric.Edge([from.x, from.y, to.x, to.y], defaultLine);
            line.name = "edge" + fromObject.name + toObject.name + "weight" + weight; // Use one of the connection IDs
            canvas.add(line);
            fromObject.from.push(line);
            toObject.to.push(line);

            // Add both connection IDs to the array
            connections.push(connectionIdAB, connectionIdBA);

            // sendToBack() is used to get an object to the bottom
            line.sendToBack();
        }

        canvas.discardActiveObject();
    }

    // add two lines, bidirected from fromObject to toObject with weight
    fabric.Canvas.prototype.AddWeightedBidireccionalLines = function (fromObject, toObject, weight1, weight2) {
        var from = fromObject.getCenterPoint();
        var to = toObject.getCenterPoint();

        if (from.x != to.x || from.y != to.y) {
            defaultLine.directed = isDirect;

            // Distancia entre las dos líneas paralelas
            //var separationDistance = 10;

            var angle = Math.atan2(to.y - from.y, to.x - from.x);

            // Ángulo perpendicular
            var perpendicularAngle = angle + Math.PI / 2;

            // Bidireccional
            var line1 = new fabric.Edge([
                from.x, from.y,
                to.x, to.y
            ], defaultLine);

            var line2 = new fabric.Edge([
                //to.x + separationDistance * Math.cos(perpendicularAngle), to.y + separationDistance * Math.sin(perpendicularAngle),
                //from.x + separationDistance * Math.cos(perpendicularAngle), from.y + separationDistance * Math.sin(perpendicularAngle)
                to.x, to.y,
                from.x, from.y,
            ], defaultLine);

            // Asignar pesos a las líneas
            line1.set('weight', weight1);
            line2.set('weight', weight2);

            line1.name = "edge" + fromObject.name + toObject.name + "weight" + weight1;
            line2.name = "edge" + toObject.name + fromObject.name + "weight" + weight2 + "second";

            canvas.add(line1, line2);
            fromObject.from.push(line1);
            toObject.to.push(line1);
            toObject.from.push(line2);
            fromObject.to.push(line2);

            // sendToBack() is used to get an object to the bottom
            line1.sendToBack();
            line2.sendToBack();
        }

        canvas.discardActiveObject();
    }

    // add the loop arrow fromObject to itself
    fabric.Canvas.prototype.AddLoop = function (vertex, weight) {
        var center = vertex.getCenterPoint();
        defaultLine.weight = "" + weight;
        defaultLine.directed = isDirect;
        // Agrega la propiedad 'selectable' al objeto defaultLine
        defaultLine.selectable = true;
        defaultLine.objectCaching = false;
        if (vertex.left <= canvas.width / 2) {
            // Ajustar los puntos de control para la curva
            var controlX1 = center.x - 10; //mueve el empiezo de la curva en x
            var controlY1 = center.y - 15; //mueve el empiezo de la curva en y
            var controlX2 = center.x;
            var controlY2 = center.y;

            var loop = new fabric.Loop([center.x - 15, center.y - 15, controlX1, controlY1, controlX2, controlY2, center.x, center.y], defaultLine);
            loop.name = "loop" + vertex.name + "weight" + weight;
            canvas.add(loop);
            vertex.from.push(loop);
            vertex.to.push(loop);
        } else {
            // El vértice está en el lado derecho
            // Ajustar los puntos de control para la curva
            var controlX1 = center.x + 10; //mueve el empiezo de la curva en x
            var controlY1 = center.y - 15; //mueve el empiezo de la curva en y
            var controlX2 = center.x;
            var controlY2 = center.y;

            var loop = new fabric.LoopR([center.x + 15, center.y - 15, controlX1, controlY1, controlX2, controlY2, center.x, center.y], defaultLine);
            loop.name = "loopR" + vertex.name + "weight" + weight;
            canvas.add(loop);
            vertex.from.push(loop);
            vertex.to.push(loop);
        }

        canvas.discardActiveObject();
    };

    fabric.Canvas.prototype.AddUndirectedLoop = function (vertex) {
        var center = vertex.getCenterPoint();
        //defaultLine.directed = isDirect;
        // Verificar la posición del vértice y realizar acciones específicas
        if (vertex.left <= canvas.width / 2) {
            // El vértice está en el lado izquierdo
            var controlX1 = center.x - 10; // Mueve el inicio de la curva en x
            var controlY1 = center.y - 15; // Mueve el inicio de la curva en y
            var controlX2 = center.x;
            var controlY2 = center.y;

            var loop = new fabric.unDirectedLoop([center.x - 15, center.y - 15, controlX1, controlY1, controlX2, controlY2, center.x, center.y], defaultLine);
            loop.name = "unDirectedLoop" + vertex.name;
            canvas.add(loop);
            vertex.from.push(loop);
            vertex.to.push(loop);
        } else {
            // El vértice está en el lado derecho
            // Ajustar los puntos de control para la curva
            var controlX1 = center.x + 10; //mueve el empiezo de la curva en x
            var controlY1 = center.y - 15; //mueve el empiezo de la curva en y
            var controlX2 = center.x;
            var controlY2 = center.y;

            var loop = new fabric.unDirectedLoopR([center.x + 15, center.y - 15, controlX1, controlY1, controlX2, controlY2, center.x, center.y], defaultLine);
            loop.name = "unDirectedLoopR" + vertex.name;
            canvas.add(loop);
            vertex.from.push(loop);
            vertex.to.push(loop);
        }

        canvas.discardActiveObject();
    };

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

    // function to remove all objects from the canvas
    fabric.Canvas.prototype.removeAll = function () {
        var objects = this.getObjects();
        objects.forEach(function (object) {
            if (object.isVertex) {
                // remove vertex-related references
                object.to.forEach(function (item) {
                    canvas.removeLine(item);
                });
                object.from.forEach(function (item) {
                    canvas.removeLine(item);
                });
            }
            canvas.remove(object);
        });
        $("#GraphData").val('');
        canvas.renderAll();
        tranInputToDrawer(true);
        drawSplitScreen(canvas);
    };

    // Función para dividir la pantalla en dos y mostrar etiquetas de "demandas" y "utilidades"
    function drawSplitScreen(canvas) {
        var screenWidth = canvas.getWidth();
        var screenHeight = canvas.getHeight();

        // Dibujar la línea divisoria en el medio de la pantalla
        var line = new fabric.Line([screenWidth / 2, 0, screenWidth / 2, screenHeight], {
            stroke: 'black',
            strokeWidth: 2,
            selectable: false
        });
        canvas.add(line);

        // Agregar texto "demandas" en el lado izquierdo
        var demandText = new fabric.Text('Origen', {
            left: screenWidth / 6,
            top: 10,
            fontSize: 25,
            selectable: false
        });
        canvas.add(demandText);

        // Agregar texto "utilidades" en el lado derecho
        var utilityText = new fabric.Text('Destino', {
            left: 3 * screenWidth / 5,
            top: 10,
            fontSize: 25,
            selectable: false
        });
        canvas.add(utilityText);
    }
    drawSplitScreen(canvas);

}