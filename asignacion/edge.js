function edgeInit() {

    fabric.Edge = fabric.util.createClass(
        fabric.Line,
        {
            type: 'Edge',
    
            initialize: function (element, options) {
                options || (options = {});
                options.selectable = typeof options.selectable !== 'undefined' ? options.selectable : true;
                options.objectCaching = false;
    
                this.callSuper('initialize', element, options);
    
                var r = Math.floor(Math.random() * 256);
                var g = Math.floor(Math.random() * 256);
                var b = Math.floor(Math.random() * 256);
                this.color = 'rgb(' + r + ',' + g + ',' + b + ')';
                this.set({ stroke: this.color });
            },
    
            toObject: function () {
                return fabric.util.object.extend(this.callSuper('toObject'));
            },
    
            _render: function (ctx) {
                this.callSuper('_render', ctx);
    
                if (this.width === 0 && this.height === 0 || !this.visible) return;
    
                ctx.save();
    
                var xDiff = this.x2 - this.x1;
                var yDiff = this.y2 - this.y1;
                var angle = Math.atan2(yDiff, xDiff);
    
                ctx.translate(xDiff / 2, yDiff / 2);
    
                // draw the weight
                ctx.font = "16px Times New Roman";
                ctx.fillStyle = this.color;
    
                ctx.fillText(
                    this.weight,
                    (- this.x2 + this.x1) / 2 + weightPadding * Math.sin(angle),
                    (- this.y2 + this.y1) / 2 - weightPadding * Math.cos(angle) + 6,
                );
    
                // draw the triangle of the arrow
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(-VertexRadius * this.directed - 25 * (1 - this.directed), 0);
                ctx.lineTo(-25, 6);
                ctx.lineTo(-25, -6);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            },
    
            clipTo: function (ctx) {
                this._render(ctx);
            }
        }
    );
    

// Variable para almacenar el estado del botón de selección para las flechas
var isSelectArrowMode = false;

// Evento que se dispara cuando cambia el estado del botón de selección para las flechas
document.getElementById('select').addEventListener('change', function () {
    isSelectArrowMode = this.checked;
    // Deselecciona todas las flechas si se desactiva el modo de selección
    if (!isSelectArrowMode) {
        canvas.discardActiveObject();
        canvas.renderAll();
    }
});
canvas.on('mouse:up', function (options) {
    if (!isSelectArrowMode) return;

    var target = options.target;

    // Verifica si el objeto seleccionado es una flecha (Edge con la propiedad type: 'Edge')
    if (target && target.type === 'Edge') {
        // Verifica si la flecha ya estaba seleccionada
        if (target.isSelected) {
            // Deselecciona la flecha (restaura el color del borde)
            target.set({
                stroke: defaultLine.stroke,
                strokeWidth: defaultLine.strokeWidth
            });

            // Deshabilita la interactividad temporalmente para evitar movimientos no deseados
            target.evented = false;
            canvas.discardActiveObject();

            // Vuelve a habilitar la interactividad después de descartar el objeto activo
            setTimeout(function () {
                target.evented = true;
            }, 0);

            // Actualiza el estado de selección en la flecha
            target.isSelected = false;
        } else {
            // Cambia el color de la flecha al seleccionarla
            target.set({
                stroke: 'blue',
                strokeWidth: 2
            });

            // Actualiza el estado de selección en la flecha
            target.isSelected = true;
        }

        // Redibuja el lienzo para aplicar los cambios visuales
        canvas.renderAll();
    }
});

canvas.on('selection:created', function (options) {
    if (!isSelectArrowMode) return; // No realiza acciones si el modo de selección de flechas no está activado

    var selectedObject = options.target;

    // Verifica si el objeto seleccionado es una flecha (Edge con la propiedad type: 'Edge')
    if (selectedObject.type === 'Edge') {
        // Actualiza los valores de los inputs con los datos de la flecha seleccionada
        document.getElementById('colorPicker').value = selectedObject.stroke;
        document.getElementById('valuePicker').value = selectedObject.weight;

        // Agrega un evento al botón para aplicar los cambios
        document.getElementById('applyChangesBtn').addEventListener('click', function () {
            var newColor = document.getElementById('colorPicker').value;
            var newWeight = document.getElementById('valuePicker').value;
     
            // Aplica los cambios a la flecha seleccionada
           applyArrowChanges(selectedObject);
        });
    }
});

// También puedes agregar eventos específicos para resaltar las flechas al interactuar con ellas, según tus necesidades.
function applyArrowChanges(selectedObject) {

    let restoTexto = selectedObject.name.substring(10);
                // Convertir el resto del texto en un array de caracteres
                let resultado = restoTexto.split("vertex");
            var val1=resultado[0];
            var val2=resultado[1].split("weight");
        var buscar = val1+" "+val2[0];


    // No realiza acciones si el modo de selección no está activado
    var str=$('#GraphData').val();
    var newColor = document.getElementById('colorPicker').value;
            var newWeight = document.getElementById('valuePicker').value;
            
for(i=0;i<EdgeArr.length;i++){
    if(EdgeArr[i][0]==val1 && EdgeArr[i][1]==val2[0]){
            EdgeArr[i][2]=newWeight;
    }
}
    //selectedObject.getObjects()[0].set({ fill: newColor });
    //selectedObject.name="vertex"+newValue;
   // Expresión regular para buscar la línea que contiene "d g"
   let regex = new RegExp(`^${buscar} (\\d+)$`, 'm');
   // Buscar la coincidencia en el texto

   // Si hay coincidencia, cambiar el valor numérico
   
       texto = str.replace(regex, `${buscar} ${newWeight}`);
        $('#GraphData').val(texto);
       // console.log(newColor);
       tranInputToDrawer(false,true);
storeEdgeColor(val1,val2[0],newColor);
}

}
