const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal
  ? 'http://localhost:8000'
  : 'https://analista-de-canciones.onrender.com';

const num1 = Math.floor(Math.random() * 10);
const num2 = Math.floor(Math.random() * 10);
const resultado = num1 + num2;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('captcha-label').textContent = `¿Cuánto es ${num1} + ${num2}?`;
});

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;
  const captcha = e.target['captcha-input'].value;

  if (parseInt(captcha) !== resultado) {
    alert('Captcha incorrecto. Intenta de nuevo.');
    return;
  }

  const response = await fetch(`${API_BASE_URL}/api/usuarios/registro/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    alert('Registro exitoso. Inicia sesión.');
    window.location.href = '/';
  } else {
    const data = await response.json();
    alert('Error al registrar: ' + JSON.stringify(data));
  }
});
