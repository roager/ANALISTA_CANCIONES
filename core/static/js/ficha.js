document.getElementById('logout').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = '/';
});

function analisisEsValido(a) {
  return a &&
    typeof a.etiqueta === 'string' &&
    !isNaN(a.puntaje_positivo) &&
    !isNaN(a.puntaje_neutro) &&
    !isNaN(a.puntaje_negativo);
}

let data = JSON.parse(localStorage.getItem('cancion'));
const div = document.getElementById('ficha-cancion');

if (data && !data.busqueda) {
  data = { busqueda: data };
}

if (data && data.busqueda) {
  const b = data.busqueda;
  const a = data.analisis;

  const artista = document.createElement('p');
  artista.innerHTML = `<strong>Artista:</strong> ${b.artista || 'Desconocido'}`;
  div.appendChild(artista);

  const titulo = document.createElement('p');
  titulo.innerHTML = `<strong>Título:</strong> ${b.titulo}`;
  div.appendChild(titulo);

  if (analisisEsValido(a)) {
    const analisisDiv = document.createElement('div');
    analisisDiv.className = 'analisis-box';
    analisisDiv.innerHTML = `
      <h3>Análisis de Sentimientos</h3>
      <p>Positivo: ${a.puntaje_positivo}</p>
      <p>Neutro: ${a.puntaje_neutro}</p>
      <p>Negativo: ${a.puntaje_negativo}</p>
      <p>Etiqueta: ${a.etiqueta}</p>
      <p>Fecha: ${a.fecha_analisis}</p>
    `;
    div.appendChild(analisisDiv);
  } else {
    const btn = document.createElement('button');
    btn.textContent = 'Analizar Sentimientos';
    btn.style.margin = '10px 0';
    btn.style.width = '100%';
    btn.onclick = async () => {
      const token = localStorage.getItem('access');
      const res = await fetch('http://localhost:8000/api/sentimientos/analizar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ busqueda_id: b.id })
      });

      const rdata = await res.json();
      if (res.ok && rdata.etiqueta) {
        localStorage.setItem('cancion', JSON.stringify({ busqueda: b, analisis: rdata }));
        location.reload();
      } else {
        alert('Error al analizar.');
      }
    };
    div.appendChild(btn);
  }

  const letraTitulo = document.createElement('h3');
  letraTitulo.textContent = 'Letra de la Canción';
  div.appendChild(letraTitulo);

  const letra = document.createElement('pre');
  letra.textContent = b.letra;
  div.appendChild(letra);
} else {
  div.textContent = 'No hay información para mostrar.';
}
