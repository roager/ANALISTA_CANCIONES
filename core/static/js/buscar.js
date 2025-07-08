const API_BASE_URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:8000'
  : 'https://analista-de-canciones.onrender.com';

document.getElementById('logout').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'index.html';
});

document.getElementById('buscar-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const artista = e.target.artista.value;
  const titulo = e.target.titulo.value;
  const token = localStorage.getItem('access');

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
