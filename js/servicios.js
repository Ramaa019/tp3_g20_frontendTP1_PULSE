
const serviciosContainer = document.getElementById('servicios-container')

async function getServicios() {
  try {

    // Verificar que el contenedor exista
    if (!serviciosContainer) return;

    // loader
    if (!serviciosContainer) return
    serviciosContainer.innerHTML = `
            <div class="loader-container">
                <div class="loader"></div>
                <p class="loader-text">Buscando los servicios, por favor espera...</p>
            </div>
        `
    // fin loader

    const API_URL = 'https://tp3-g20-webserver.onrender.com';
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
            <a href="../pages/pedido.html" class="servicios-card__boton">Empieza a entrenar</a>
        `

      serviciosContainer.append(article)
    })
  } catch (error) {
    console.log(
      `Error, no se puedieron traer los datos de los servicios. ${error}`
    )
  }
}

getServicios()