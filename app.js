const fileInput = document.getElementById('file-input');
const convertJpgButton = document.getElementById('convert-jpg');
const convertPngButton = document.getElementById('convert-png');
const downloadButton = document.getElementById('download');
const toggleThemeButton = document.getElementById('theme-toggle');
const body = document.querySelector('body');

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

  showMessage();
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

  showMessage();
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

toggleThemeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

function showMessage() {
  const messageContainer = document.getElementById('message-container');
  const message = `Imagem convertida para ${convertedType.toUpperCase()}!`;
  messageContainer.textContent = message;
}
