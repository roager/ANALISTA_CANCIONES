const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal
  ? 'http://localhost:8000'
  : 'https://analista-de-canciones.onrender.com';

document.getElementById('logout').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'index.html';
});

document.getElementById('buscar-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const artista = document.getElementById('artista').value.trim();
  const titulo = document.getElementById('titulo').value.trim();
  const token = localStorage.getItem('access');
  console.log("📦 Enviando:", JSON.stringify({ artista, titulo }));
  
  const response = await fetch(`${API_BASE_URL}/api/songs/buscar-letra/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ artista, titulo })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('cancion', JSON.stringify(data));
    window.location.href = '/ficha/';
  } else {
    alert('Error al buscar: ' + (data.detail || JSON.stringify(data)));
  }
});

console.log("🌐 URL:", `${API_BASE_URL}/api/songs/buscar-letra/`);
