document.getElementById('logout').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = '/';
});

async function cargarHistorial() {
  const token = localStorage.getItem('access');
  const tabla = document.getElementById('tabla-historial');

  const response = await fetch('http://localhost:8000/api/songs/historial/', {
    headers: { 'Authorization': 'Bearer ' + token }
  });

  const data = await response.json();

  if (response.ok) {
    data.forEach((item) => {
      const analisis = item.analisis || {};

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.artista || '-'}</td>
        <td><a href="#" data-id="${item.id}" class="link-ficha">${item.titulo}</a></td>
        <td>${item.fecha_busqueda || '-'}</td>
        <td>${analisis.puntaje_positivo ?? '-'}</td>
        <td>${analisis.puntaje_neutro ?? '-'}</td>
        <td>${analisis.puntaje_negativo ?? '-'}</td>
        <td>${analisis.etiqueta ?? '-'}</td>
        <td>${analisis.fecha_analisis ?? '-'}</td>
      `;
      tabla.appendChild(row);
    });

    document.querySelectorAll('.link-ficha').forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('data-id');
        await verFicha(id);
      });
    });
  } else {
    alert('Error al cargar historial');
  }
}

async function verFicha(id) {
  const token = localStorage.getItem('access');
  const response = await fetch(`http://localhost:8000/api/songs/detalle/${id}/`, {
    headers: { 'Authorization': 'Bearer ' + token }
  });

  const data = await response.json();

  if (response.ok) {
    const payload = {
      busqueda: {
        id: data.id,
        artista: data.artista,
        titulo: data.titulo,
        letra: data.letra,
        fecha_busqueda: data.fecha_busqueda
      },
      analisis: data.analisis ?? null
    };

    localStorage.setItem('cancion', JSON.stringify(payload));
    window.location.href = '/ficha/';
  } else {
    alert('No se pudo cargar ficha.');
  }
}
cargarHistorial();