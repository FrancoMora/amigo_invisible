// Deterministic hash with seed
function seededHash(nombre, seed) {
  const h = fnv1a(nombre)
  const random = Math.sin(h + seed) * 10000;
  return Math.abs(Math.floor(random));

}

function deterministicSeededPairs(arr, seed) {
  if (arr.length < 2) {
    throw new Error("Array must contain at least 2 values.");
  }

  // Sort using the seeded hash
  const sorted = [...arr].sort(
    (a, b) => seededHash(a, seed) - seededHash(b, seed)
  );

  // Build mapping: value → next value in cycle
  const map = {};
  for (let i = 0; i < sorted.length; i++) {
    map[sorted[i]] = sorted[(i + 1) % sorted.length];
  }

  return map;
}

function obtenerNombreSeleccionado(nombre, codigo) {
  // Sorteo
  const selectElement = document.getElementById('presetSelect');
  const familia = Array.from(selectElement.options)
    .map(option => option.value)
    .filter(value => value !== '');
  const amigos = deterministicSeededPairs(familia, 23124124411233)
  // for (const key in amigos) {
  //   console.log(key, amigos[key]);
  // }

  // Check codigo
  const hashed_string = fnv1a(nombre)
  return hashed_string === parseInt(codigo) ? amigos[nombre] : null;
}

// Deterministic hash for code validation
function fnv1a(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash;
}

document.getElementById('showBtn').addEventListener('click', () => {
  const nombre = document.getElementById('presetSelect').value;
  const codigo = document.getElementById('extraInput').value.trim();
  if (!nombre) {
    alert('Por favor selecciona tu nombre.');
    return;
  }
  const resultado = obtenerNombreSeleccionado(nombre, codigo);
  if (!resultado) {
    alert('Código no válido para el usuario seleccionado.');
    return;
  }
  alert(`Hola ${nombre}, tu amigo invisible es: ${resultado}.`);
});

