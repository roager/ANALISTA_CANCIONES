document.getElementById('logout').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = '/';
});

async function cargarCancionesPositivas() {
  const token = localStorage.getItem('access');
  const tabla = document.getElementById('tabla-positivas');

  const response = await fetch('http://localhost:8000/api/songs/historial/', {
    headers: { 'Authorization': 'Bearer ' + token }
  });

  const data = await response.json();

  if (response.ok) {
    const positivas = data
      .filter(c => c.analisis &&
        !isNaN(c.analisis.puntaje_positivo) &&
        !isNaN(c.analisis.puntaje_neutro) &&
        !isNaN(c.analisis.puntaje_negativo)
      )
      .sort((a, b) => {
        // Ordenar por positivo DESC, luego neutro DESC, luego negativo ASC
        if (b.analisis.puntaje_positivo !== a.analisis.puntaje_positivo) {
          return b.analisis.puntaje_positivo - a.analisis.puntaje_positivo;
        }
        if (b.analisis.puntaje_neutro !== a.analisis.puntaje_neutro) {
          return b.analisis.puntaje_neutro - a.analisis.puntaje_neutro;
        }
        return a.analisis.puntaje_negativo - b.analisis.puntaje_negativo;
      });

    positivas.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.artista || '-'}</td>
        <td><a href="#" onclick="verFicha(${item.id})">${item.titulo}</a></td>
        <td>${item.fecha_busqueda || '-'}</td>
        <td>${item.analisis.puntaje_positivo}</td>
        <td>${item.analisis.puntaje_neutro}</td>
        <td>${item.analisis.puntaje_negativo}</td>
        <td>${item.analisis.etiqueta}</td>
        <td>${item.analisis.fecha_analisis || '-'}</td>
      `;
      tabla.appendChild(row);
    });
  } else {
    alert('Error al cargar las canciones positivas');
  }
}

async function verFicha(id) {
  const token = localStorage.getItem('access');
  const res = await fetch(`http://localhost:8000/api/songs/detalle/${id}/`, {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('cancion', JSON.stringify(data));
    window.location.href = '/ficha';
  } else {
    alert('No se pudo cargar ficha.');
  }
}

cargarCancionesPositivas();
