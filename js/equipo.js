
const equipoContainer = document.getElementById('equipo-container')

async function getEquipo() {
  try {

    // Verificar que el contenedor exista
    if (!equipoContainer) return;

    // loader
    if (!equipoContainer) return
    equipoContainer.innerHTML = `
            <div class="loader-container">
                <div class="loader"></div>
                <p class="loader-text">Buscando los miembros del equipo, por favor espera...</p>
            </div>
        `
    // fin loader

    const API_URL = 'https://tp3-g20-webserver.onrender.com';
    const response = await fetch(`${API_URL}/equipo`)
    const data = await response.json()

    equipoContainer.innerHTML = ` ` // Elimina el 'loader'.

    console.log(response)
    console.log(data)

    data.equipo.forEach((miembro) => {
      const div = document.createElement('div')
      div.classList.add('equipo-card')

      div.innerHTML = `
            <div class="equipo-card__info">
                <h3 class="equipo-card__nombre">${miembro.nombre}</h3>
                <p class="equipo-card__rol">${miembro.rol}</p>
                <p class="equipo-card__descripcion">${miembro.descripcion}</p>
            </div>
            <img src="${API_URL}${miembro.img}" alt="miembro-equipo-${miembro.id}" class="equipo-card__foto">
        `

      equipoContainer.append(div)
    })
  } catch (error) {
    console.log(
      `Error, no se puedieron traer los datos del equipo. ${error}`
    )
  }
}

getEquipo()