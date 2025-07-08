const API_BASE_URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:8000'
  : 'https://analista-de-canciones.onrender.com';

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  const response = await fetch('${API_BASE_URL}/api/usuarios/registro/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    alert('Registro exitoso. Inicia sesión.');
    window.location.href = 'index.html';
  } else {
    const data = await response.json();
    alert('Error al registrar: ' + JSON.stringify(data));
  }
});
