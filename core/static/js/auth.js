// auth.js
function redirigirSiNoAutenticado() {
  const token = localStorage.getItem('access');
  if (!token) {
    window.location.replace('/');  // Redirección limpia a la raíz
  }
}

// Puedes llamarla en cualquier JS protegido así:
redirigirSiNoAutenticado();
