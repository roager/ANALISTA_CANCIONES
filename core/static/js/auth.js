// auth.js
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('access');
  if (!token) {
    window.location.href = '/';  // Redirige al login si no hay token
  }
});
