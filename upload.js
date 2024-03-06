function decode(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function (e) {
        const img = new Image();
  
        img.onload = function () {
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = img.width;
          tempCanvas.height = img.height;
  
          const tempContext = tempCanvas.getContext('2d');
          tempContext.drawImage(img, 0, 0);
  
          const dataURL = tempCanvas.toDataURL('image/png');
          const decodedText = steg.decode(dataURL);
  
          //console.log(decodedText);
          //document.querySelector('#decoded').innerText = decodedText;
          $('#GraphData').val(decodedText);
        };
  
        img.src = e.target.result;
      };
  
      reader.readAsDataURL(input.files[0]);
    }
  }
  