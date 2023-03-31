const fileInput = document.getElementById('file-input');
const convertJpgButton = document.getElementById('convert-jpg');
const convertPngButton = document.getElementById('convert-png');
const downloadButton = document.getElementById('download');

let img = null;
let convertedImg = null;
let convertedType = null;

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    img = new Image();
    img.src = reader.result;
    img.onload = () => {
      convertJpgButton.disabled = false;
      convertPngButton.disabled = false;
    }
  }

  reader.readAsDataURL(file);
});

convertJpgButton.addEventListener('click', () => {
  if (!img) {
    alert('Por favor, selecione um arquivo.');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const dataURL = canvas.toDataURL('image/jpeg');
  convertedImg = new Image();
  convertedImg.src = dataURL;
  convertedType = 'jpeg';

  // Adiciona um aviso de conversão bem sucedida
  const message = document.createElement('div');
  message.innerText = 'A imagem foi convertida para JPEG.';
  message.style.color = 'green';
  message.style.marginTop = '10px';
  downloadButton.parentNode.insertBefore(message, downloadButton);
});

convertPngButton.addEventListener('click', () => {
  if (!img) {
    alert('Por favor, selecione um arquivo.');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const dataURL = canvas.toDataURL('image/png');
  convertedImg = new Image();
  convertedImg.src = dataURL;
  convertedType = 'png';

  // Adiciona um aviso de conversão bem sucedida
  const message = document.createElement('div');
  message.innerText = 'A imagem foi convertida para PNG.';
  message.style.color = 'green';
  message.style.marginTop = '10px';
  downloadButton.parentNode.insertBefore(message, downloadButton);
});

downloadButton.addEventListener('click', () => {
  if (!convertedImg) {
    alert('Por favor, selecione um arquivo e converta-o.');
    return;
  }

  const a = document.createElement('a');
  document.body.appendChild(a);
  a.download = `image.${convertedType}`;
  a.href = convertedImg.src;
  a.click();
  document.body.removeChild(a);
});
