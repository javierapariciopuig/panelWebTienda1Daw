// ── ELEMENTOS ──
const inputNombre    = document.getElementById('inputNombre');
const inputCategoria = document.getElementById('inputCategoria');
const inputDesc      = document.getElementById('inputDesc');
const inputPrecio    = document.getElementById('inputPrecio');
const inputImgUrl    = document.getElementById('inputImgUrl');
const imgPreviewBox  = document.getElementById('imgPreviewBox');
const fileInput      = document.getElementById('fileInput');
const btnGuardar     = document.getElementById('btnGuardar');
const btnCancelar    = document.getElementById('btnCancelar');
const modalClose     = document.getElementById('modalClose');

// ── LIVE PREVIEW ──
inputNombre.addEventListener('input', () => {
  document.getElementById('pvNombre').textContent =
    inputNombre.value.trim() || 'Nombre del producto';
});

inputDesc.addEventListener('input', () => {
  document.getElementById('pvDesc').textContent =
    inputDesc.value.trim() || 'Descripción del producto';
});

inputPrecio.addEventListener('input', () => {
  const v = parseFloat(inputPrecio.value);
  document.getElementById('pvPrecio').textContent =
    isNaN(v) ? '0.00€' : v.toFixed(2) + '€';
});

inputCategoria.addEventListener('change', () => {
  document.getElementById('pvCat').textContent = inputCategoria.value;
});

inputImgUrl.addEventListener('input', () => {
  const url = inputImgUrl.value.trim();
  imgPreviewBox.innerHTML = url
    ? `<img src="${url}" onerror="this.parentElement.innerHTML='<span class=img-placeholder-icon>🖼️</span>'" />`
    : '<span class="img-placeholder-icon">🖼️</span>';
});

// ── SUBIR IMAGEN DESDE ARCHIVO ──
document.getElementById('btnSubirImagen').addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const url = e.target.result;
    inputImgUrl.value = url;
    imgPreviewBox.innerHTML = `<img src="${url}" />`;
  };
  reader.readAsDataURL(file);
});

// ── LIMPIAR FORMULARIO ──
function resetForm() {
  [inputNombre, inputDesc, inputPrecio, inputImgUrl].forEach(i => i.value = '');
  inputCategoria.value = 'ALIMENTACIÓN';
  imgPreviewBox.innerHTML = '<span class="img-placeholder-icon">🖼️</span>';
  document.getElementById('pvNombre').textContent  = 'Nombre del producto';
  document.getElementById('pvDesc').textContent    = 'Descripción del producto';
  document.getElementById('pvPrecio').textContent  = '0.00€';
  document.getElementById('pvCat').textContent     = 'ALIMENTACIÓN';
  btnGuardar.disabled  = false;
  btnGuardar.innerHTML = '💾 Guardar Producto';
}

// ── CANCELAR / CERRAR ──
btnCancelar.addEventListener('click', resetForm);
modalClose.addEventListener('click', resetForm);

// ── GUARDAR ──
btnGuardar.addEventListener('click', () => {
  const nombre = inputNombre.value.trim();
  const precio = parseFloat(inputPrecio.value);

  if (!nombre) {
    alert('⚠️ El nombre del producto es obligatorio.');
    return;
  }
  if (isNaN(precio) || precio < 0) {
    alert('⚠️ Introduce un precio válido.');
    return;
  }

  // Aquí puedes recoger el objeto con los datos del formulario
  const producto = {
    nombre,
    categoria:   inputCategoria.value,
    descripcion: inputDesc.value.trim(),
    precio,
    imagen:      inputImgUrl.value.trim(),
  };

  console.log('Producto listo para guardar:', producto);

  // TODO: conectar con tu base de datos aquí
  // Ejemplo con Firebase:
  // await addDoc(collection(db, 'productos'), producto);

  alert(`✅ Producto "${nombre}" guardado correctamente.`);
  resetForm();
});