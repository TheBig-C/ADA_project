function edgeInit() {
    fabric.Edge = fabric.util.createClass(
        fabric.Line,
        {
            type: 'Edge',

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

                // rotate
                var xDiff = this.x2 - this.x1;
                var yDiff = this.y2 - this.y1;
                var angle = Math.atan2(yDiff, xDiff);
                ctx.translate(xDiff / 2, yDiff / 2);

                // draw the weight
                ctx.font = "16px Times New Roman";
                ctx.fillText(
                    this.weight,
                    (- this.x2 + this.x1) / 2 + weightPadding * Math.sin(angle),
                    (- this.y2 + this.y1) / 2 - weightPadding * Math.cos(angle),
                )

                // draw the triangle of the arrow
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(-VertexRadius * this.directed - 25 * (1 - this.directed), 0);
                ctx.lineTo(-25, 6);
                ctx.lineTo(-25, -6);
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

