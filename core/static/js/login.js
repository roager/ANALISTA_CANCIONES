document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  const API_BASE_URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8000'
    : 'https://analista-de-canciones.onrender.com';

  const response = await fetch(`${API_BASE_URL}/api/usuarios/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    window.location.href = '/inicio';
  } else {
    alert('Error al iniciar sesión: ' + (data.detail || data.message));
  }
});
