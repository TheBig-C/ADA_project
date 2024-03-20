function downloadInit() {
    $(document).ready(function () {
      $("#download").on("click", function () {
        // Verificar si el canvas tiene un tamaño válido
        if (canvas.width === 0 || canvas.height === 0) {
          console.error("Canvas size is invalid");
          return;
        }
  
        // Crear una nueva imagen para asegurar que esté completamente cargada
        const img = new Image();
        img.onload = function () {
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = img.width;
          tempCanvas.height = img.height;
  
          const tempContext = tempCanvas.getContext('2d');
          tempContext.drawImage(img, 0, 0);
  
          const dataURL = tempCanvas.toDataURL('image/png');
  
          const link = document.createElement('a');
          link.download = 'canvas.png';
  
          // Verificar si el canvas tiene contenido antes de aplicar la esteganografía
          if ($('#GraphData').val() && dataURL) {
            const encodedDataURL = steg.encode($('#GraphData').val(), dataURL);
            link.href = encodedDataURL;
          } else {
            console.error("Text or canvas content is empty");
            return;
          }
  
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
  
          // Luego de descargar, ocultar texto en la imagen
        };
  
        img.src = 'data:image/png;base64,' + canvas.toDataURL().split(',')[1];
      });
    });
  }