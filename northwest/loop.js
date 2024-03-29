function loopInit() {
    fabric.Loop = fabric.util.createClass(
        fabric.Line,
        {
            type: 'Loop',

            initialize: function (element, options) {
                options || (options = {});
                this.callSuper('initialize', element, options);
            },

            toObject: function () {
                return fabric.util.object.extend(this.callSuper('toObject'));
            },

            _render: function (ctx) {
                this.callSuper('_render', ctx);

                // do not render if width/height are zeros or object is not visible
                if (this.width === 0 && this.height === 0 || !this.visible) return;

                ctx.save();

                // draw the weight
                ctx.font = "16px Times New Roman";
                ctx.fillText(
                    this.weight,
                    (this.width) / 2 + weightPadding - 50,
                    (- this.height) / 2 - weightPadding + 5,
                );

                // Adjust the control points and endpoints to control the curve
                var controlX2 = this.width - 300 / 2 + 80; // x2, y2 parameters to adjust 
                var controlY2 = this.height / 2 - 10;      // the arrow's curve
                var endX = this.width - 35 / 2;  // end point of the arrow
                var endY = this.height - 10 / 2; // endX, endY width and height

                // draw the curved arrow part of the loop
                ctx.quadraticCurveTo(controlX2, controlY2, this.width - 20, this.height + 15);
                ctx.lineWidth = 2;
                ctx.stroke();

                // draw the arrowhead
                ctx.beginPath();
                ctx.moveTo(this.width - 10 / 2, this.height + 15); //arrowhead position
                ctx.lineTo(endX, endY + 10); // arrow top corner
                ctx.lineTo(endX - 3, endY + 30); // arrow bottom corner
                ctx.closePath();
                ctx.fillStyle = this.stroke;
                ctx.fill();

                ctx.restore();
            },

            clipTo: function (ctx) {
                this._render(ctx);
            }
        });
    fabric.LoopR = fabric.util.createClass(
        fabric.Line,
        {
            type: 'Loop',

            initialize: function (element, options) {
                options || (options = {});
                this.callSuper('initialize', element, options);
            },

            toObject: function () {
                return fabric.util.object.extend(this.callSuper('toObject'));
            },

            _render: function (ctx) {
                this.callSuper('_render', ctx);

                // do not render if width/height are zeros or object is not visible
                if (this.width === 0 && this.height === 0 || !this.visible) return;

                ctx.save();

                // draw the weight
                ctx.font = "16px Times New Roman";
                ctx.fillText(
                    this.weight,
                    (this.width) / 2 + weightPadding + 10,
                    (- this.height) / 2 - weightPadding + 10,
                );

                // Adjust the control points and endpoints to control the curve
                var controlX2 = this.width + 300 / 2 - 80; // x2, y2 parameters to adjust 
                var controlY2 = this.height / 2 + 10;      // the arrow's curve
                var endX = this.width + 35 / 2;  // end point of the arrow
                var endY = this.height - 10 / 2; // endX, endY width and height

                // draw the curved arrow part of the loop
                ctx.quadraticCurveTo(controlX2, controlY2, this.width + 10, this.height + 15);
                ctx.lineWidth = 2;
                ctx.stroke();

                // draw the arrowhead
                ctx.beginPath();
                ctx.moveTo(this.width - 10 / 2, this.height + 15); //arrowhead position
                ctx.lineTo(endX, endY + 15); // arrow top corner
                ctx.lineTo(endX - 3, endY + 30); // arrow bottom corner
                ctx.closePath();
                ctx.fillStyle = this.stroke;
                ctx.fill();

                ctx.restore();
            },

            clipTo: function (ctx) {
                this._render(ctx);
            }
        });

    fabric.unDirectedLoop = fabric.util.createClass(
        fabric.Line,
        {
            type: 'Loop',

            initialize: function (element, options) {
                options || (options = {});
                this.callSuper('initialize', element, options);
            },

            toObject: function () {
                return fabric.util.object.extend(this.callSuper('toObject'));
            },

            _render: function (ctx) {
                this.callSuper('_render', ctx);

                // do not render if width/height are zeros or object is not visible
                if (this.width === 0 && this.height === 0 || !this.visible) return;

                ctx.save();

                // Adjust the control points and endpoints to control the curve
                var controlX2 = this.width - 300 / 2 + 80; // x2, y2 parameters to adjust 
                var controlY2 = this.height / 2 - 10;      // the arrow's curve
                var endX = this.width - 35 / 2;  // end point of the arrow
                var endY = this.height - 10 / 2; // endX, endY width and height

                // draw the curved arrow part of the loop
                ctx.quadraticCurveTo(controlX2, controlY2, this.width - 10, this.height + 15);
                ctx.lineWidth = 2;
                ctx.stroke();


                ctx.restore();
            },

            clipTo: function (ctx) {
                this._render(ctx);
            }
        });
        
    fabric.unDirectedLoopR = fabric.util.createClass(
        fabric.Line,
        {
            type: 'Loop',

            initialize: function (element, options) {
                options || (options = {});
                this.callSuper('initialize', element, options);
            },

            toObject: function () {
                return fabric.util.object.extend(this.callSuper('toObject'));
            },

            _render: function (ctx) {
                this.callSuper('_render', ctx);

                // do not render if width/height are zeros or object is not visible
                if (this.width === 0 && this.height === 0 || !this.visible) return;

                ctx.save();


                // Adjust the control points and endpoints to control the curve
                var controlX2 = this.width + 300 / 2 - 80; // x2, y2 parameters to adjust 
                var controlY2 = this.height / 2 + 10;      // the arrow's curve
                var endX = this.width + 35 / 2;  // end point of the arrow
                var endY = this.height - 10 / 2; // endX, endY width and height

                // draw the curved arrow part of the loop
                ctx.quadraticCurveTo(controlX2, controlY2, this.width, this.height + 15);
                ctx.lineWidth = 2;
                ctx.stroke();


                ctx.restore();
            },

            clipTo: function (ctx) {
                this._render(ctx);
            }
        });
    updateLoop = function (vertex, canvas) {
        // Eliminar bucles anteriores
        vertex.from.forEach(function (e) {
            if (e.type === "Loop") {
                canvas.remove(e);
            }
        });
        vertex.to.forEach(function (e) {
            if (e.type === "Loop") {
                canvas.remove(e);
            }
        });
        var center = vertex.getCenterPoint();
        var loop;

        if (vertex.left <= canvas.width / 2) {
            // El vértice está en el lado izquierdo
            var controlX1 = center.x - 10;
            var controlY1 = center.y - 15;
            var controlX2 = center.x;
            var controlY2 = center.y;

            loop = new fabric.Loop([center.x - 15, center.y - 15, controlX1, controlY1, controlX2, controlY2, center.x, center.y], defaultLine);
        } else {
            // El vértice está en el lado derecho
            var controlX1 = center.x + 10;
            var controlY1 = center.y - 15;
            var controlX2 = center.x;
            var controlY2 = center.y;

            loop = new fabric.LoopR([center.x + 15, center.y - 15, controlX1, controlY1, controlX2, controlY2, center.x, center.y], defaultLine);
        }

        loop.name = "loop" + vertex.name + "weight" + this.weight;
        canvas.add(loop);
        vertex.from.push(loop);
        vertex.to.push(loop);

        canvas.discardActiveObject();
    }
}