
const API_URL = 'https://tp3-g20-webserver.onrender.com';  


function crearModalServicio(id) {
  const modalContainer = document.createElement('div')
  modalContainer.classList.add('modal-overlay');

  // html del modal
  modalContainer.innerHTML = `
      <div class="modal-container">
          <button class="modal-close" id="btn-cerrar-modal">&times;</button>
          <div id="modal-detalle"></div>
      </div>
  `;
  
  // Agregar el modal al body
  document.body.appendChild(modalContainer);
  
  // Agregar funcionalidad al botón de cerrar
  const btnCerrar = document.getElementById('btn-cerrar-modal');
  btnCerrar.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.removeChild(modalContainer);
  });

  // Traer los detalles del servicio
  getServiciosById(id);
}

async function getServiciosById(id) {
  try {
    
    const modalContainer = document.getElementById('modal-detalle')
    if (!modalContainer) return;

    // loader
    modalContainer.innerHTML = `
            <div class="loader-container">
                <div class="loader"></div>
                <p class="loader-text">Buscando los servicios, por favor espera...</p>
            </div>
        `
    // fin loader


    const response = await fetch(`${API_URL}/servicios/${id}`)
    const servicio = await response.json()

    modalContainer.innerHTML = ` ` // Elimina el 'loader'.

    console.log(response)
    console.log(servicio)

    const article = document.createElement('article')
    article.classList.add('servicios-card')

      article.innerHTML = `
            <img class="servicios-card__icon" src="${API_URL}${servicio.icon}" alt="Icono ${servicio.nombre}">
            <h3 class="servicios-card__titulo">${servicio.nombre}</h3>
            <p class="servicios-card__descripcion">${servicio.descripcion}</p>
            <a href="../pages/pedido.html" class="servicios-card__boton">Empieza a entrenar</a>
        `

    modalContainer.append(article)
  
  } catch (error) {
    console.log(
      `Error, no se puedieron traer los datos del servicio. ${error}`
    )
  }
}


async function getServicios() {
  try {
    
    const serviciosContainer = document.getElementById('servicios-container')
    if (!serviciosContainer) return;

    // loader
    serviciosContainer.innerHTML = `
            <div class="loader-container">
                <div class="loader"></div>
                <p class="loader-text">Buscando los servicios, por favor espera...</p>
            </div>
        `
    // fin loader


    const response = await fetch(`${API_URL}/servicios`)
    const data = await response.json()

    serviciosContainer.innerHTML = ` ` // Elimina el 'loader'.

    console.log(response)
    console.log(data)

    data.servicios.forEach((servicio) => {
      const article = document.createElement('article')
      article.classList.add('servicios-card')

      article.innerHTML = `
            <img class="servicios-card__icon" src="${API_URL}${servicio.icon}" alt="Icono ${servicio.nombre}">
            <h3 class="servicios-card__titulo">${servicio.nombre}</h3>
            <p class="servicios-card__descripcion">${servicio.descripcion}</p>
            <button class="servicios-card__boton-detalle">+</button>
        `

      serviciosContainer.append(article)

      // Evento para el botón de cada servicio
      const boton = article.querySelector('.servicios-card__boton-detalle')
      boton.addEventListener('click', () => {
        crearModalServicio(servicio.id)
      })
    })
  } catch (error) {
    console.log(
      `Error, no se puedieron traer los datos de los servicios. ${error}`
    )
  }
}


getServicios()