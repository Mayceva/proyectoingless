

  fetch("./partials/menu.html")
  .then(res => {
    if (!res.ok) throw new Error("No se pudo cargar el menú");
    return res.text();
  })
  .then(data => {
    console.log('Contenido recibido del menú:', data);
    const container = document.getElementById('menu-container');
    if (container) {
      container.innerHTML = data;
    }
  })
  .catch(err => {
    console.error('Error al cargar el menú:', err);
  });
