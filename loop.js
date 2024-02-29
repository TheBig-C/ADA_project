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
}