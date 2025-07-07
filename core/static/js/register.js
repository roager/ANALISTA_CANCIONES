document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  const response = await fetch('http://localhost:8000/api/usuarios/registro/', {
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
