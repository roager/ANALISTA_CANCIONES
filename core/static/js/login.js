const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const API_BASE_URL = isLocal
  ? 'http://localhost:8000'
  : 'https://analista-de-canciones.onrender.com';

console.log("🌐 API_BASE_URL usada:", API_BASE_URL);


document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  console.log("🔗 API_BASE_URL usada:", API_BASE_URL);  // <-- línea para verificar

  const response = await fetch(`${API_BASE_URL}/api/usuarios/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
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
