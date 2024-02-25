function downloadInit() {
    // download the canvas as a png
    $(document).ready(function () {
        $("#download").on("click", function () {
            const dataURL = canvas.toDataURL({
                width: canvas.width,
                height: canvas.height,
                left: 0,
                top: 0,
                format: 'png',
            });

            const link = document.createElement('a');
            link.download = 'canvas.png';
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
}