/** sobre-nosotros.js - La Sociedad del Viento
 * ----------------------------------------------------------------------
 * Este archivo gestiona la interactividad de la página sobre la Sociedad del Viento, incluyendo:
 * - Menú responsive: permite mostrar u ocultar la navegación principal en dispositivos móviles.
 * - Animaciones con Intersection Observer: aplica efectos visuales cuando los elementos entran en el viewport al hacer scroll.
 * - Popup interactivo con efecto máquina de escribir: muestra un mensaje narrativo al hacer clic en un disparador secreto.
 * - Cursor personalizado: sustituye el cursor tradicional por uno visual animado que responde a clics y elementos interactivos.
 * - Activación del sonido ambiental: permite al usuario activar/desactivar la música ambiental desde la interfaz.
 */

"use strict";

// IIFE → Encapsula todo el script en una función IIFE
(() => {
  // ==========================
  // VARIABLES Y SELECTORES
  // ==========================

  // Constantes del  Menú responsive
  const boton = document.querySelector(".Header-btn")     // Botón que abre/cierra el menú
  const headerUL = document.querySelector(".Header-ul")   // Lista de enlaces de navegación

  //Constantes del Intersection Observer
  const elementosAnimados = document.querySelectorAll(`.About-h1, .About-p, .About-members-h2, .About-members-p, .Members-card, .About-quote`)

  //Constantes del Popup interactivo
  const overlay = document.querySelector(".Popup")
  const trigger = document.getElementById("Popup-trigger")     // Elemento que activa el popup
  const closeBtn = overlay.querySelector(".Popup-btn")        // Botón de cierre
  const output = overlay.querySelector(".Popup-typewriter")   // Botón de cierre

  //Constantes del Cursor personalizado
  const cursor = document.querySelector('.Cursor')
  const botones = document.querySelectorAll('.Header-a, .Footer-up, .Footer-links, .Footer-coordinates--trigger, .Sound-btn ')

  //Constantes del Audio ((botones ON/OFF y elemento <audio>))
  const audio = document.querySelector('.Sound-audio')
  const btnOn = document.querySelector('.Sound-btn--ON')        // Botón para pausar el sonido
  const btnOff = document.querySelector('.Sound-btn--OFF')     // Botón para reproducir el sonido

  // ==========================
  // FUNCIONES
  // ==========================

  // MENÚ RESPONSIVE
    //Función handler que se ejecuta para alternar la visibilidad en el menú responsive
  const handleMenuToggle = () => {
    boton.classList.toggle("isOpen")
    headerUL.classList.toggle("isVisible")
  }

  //  INTERSECTION OBSERVER
    //  Aplica animaciones al hacer scroll cuando los elementos entran en el viewport.

   // Opciones del observer
  const observerOptions = {
    threshold: [0, 0.1],             // Se activa cuando se ve al menos un 10% del elemento
    rootMargin: "0px 0px -20px 0px", // Ajusta el área del viewport para activar antes
  }

    // Callback del observer (función que se ejecuta al observar un elemento)
  const handleIntersection = (entries) => {
    entries.forEach(
      ({ isIntersecting, target }) =>
        isIntersecting && target.classList.add("isVisible") // Añade la clase si entra en pantall
    )
  }

  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  )
  elementosAnimados.forEach((el) => observer.observe(el))

  // POPUP INTERACTIVO CON EFECTO MÁQUINA DE ESCRIBIR
    // Muestra un mensaje secreto frase por frase simulando el efecto de una máquina de escribir.
    // (Este bloque fue desarrollado con ayuda de ChatGPT para mejorar la experiencia inmersiva).
    // Frases que se mostrarán dentro del popup
  const frases = [
    "Acceso no autorizado.",
    "Validando clave X-973A...",
    "Clave aceptada.",
    "Has accedido al archivo confidencial.\n",
    "Bienvenido, Explorador. Este registro no está validado por la Sociedad.",
    "Coordenadas fragmentadas detectadas: 𝚪93⋄⏃↯42° ΔΞ9",
    "Escenario: NO IDENTIFICADO. Requiere validación ocular.\n",
    "Este informe fue ocultado por petición del Cartógrafo Ciego.",
  ]

    // Variables para controlar el progreso de la animación
  let currentLine = 0
  let currentChar = 0

    // Función recursiva que escribe letra por letra la frase actual.
    // cuando termina una frase, pasa a la siguiente tras una pausa.
  const escribirLinea = () => {
    const linea = frases[currentLine]
    if (currentChar < linea.length) {
      output.textContent += linea.charAt(currentChar++)
      setTimeout(escribirLinea, 30) // Velocidad de escritura (ms)
    } else {
      output.textContent += "\n"
      currentLine++
      currentChar = 0
      if (currentLine < frases.length) {
        setTimeout(escribirLinea, 500) // Pausa entre frases
      }
    }
  }
    // Mostrar popup y comenzar animación
  const abrirPopup = () => {
    output.textContent = ""
    overlay.style.display = "flex"
    currentLine = 0
    currentChar = 0
    setTimeout(escribirLinea, 500)
  }
    // Cerrar popup
  const cerrarPopup = () => {
    overlay.style.display = "none"
  }

  // CURSOR PERSONALIZADO INTERACTIVO
    // Reemplaza el cursor estándar por un círculo blanco animado.
    // Se desplaza suavemente y cambia de forma al pasar sobre elementos interactivos.
  const handleMouseMove = ({ clientX, clientY }) => {
    requestAnimationFrame(() => {
      cursor.style.translate = `${clientX}px ${clientY}px`
    })
  }

  const handleMouseDown = () => cursor.classList.add("isClicked")
  const handleMouseUp = () => cursor.classList.remove("isClicked")
  const handleHoverIn = () => cursor.classList.add("isHover")
  const handleHoverOut = () => cursor.classList.remove("isHover")



//SONIDO AMBIENTAL
  // Activa el sonido: reproduce el audio y actualiza los botones
  const handlePlaySound = () => {
    audio.volume = 0.3
    audio.play().catch(err =>
      console.warn('Error al reproducir el audio:', err)
    )
    btnOff.classList.add('isHidden')
    btnOn.classList.remove('isHidden')
  }

  // Pausa el sonido y actualiza los botones
  const handlePauseSound = () => {
    audio.pause()
    btnOn.classList.add('isHidden')
    btnOff.classList.remove('isHidden')
  }


  // ==========================
  // EVENT LISTENERS
  // ==========================
  // MENÚ RESPONSIVE
  boton.addEventListener("click", handleMenuToggle)

  // POPUP
    // Evento click en el disparador
    trigger.addEventListener("click", abrirPopup)
    // Evento click en botón de cerrar
    closeBtn.addEventListener("click", cerrarPopup)
   // Cerrar también si se hace clic fuera del contenido
    overlay.addEventListener("click", (e) => e.target === overlay && cerrarPopup())

  // CURSOR PERSONALIZADO
  window.addEventListener("mousemove", handleMouseMove)
  window.addEventListener("mousedown", handleMouseDown)
  window.addEventListener("mouseup", handleMouseUp)

  botones.forEach((btn) => {
    btn.addEventListener("mouseover", handleHoverIn)
    btn.addEventListener("mouseout", handleHoverOut)
  })

  //SONIDO AMBIENTAL
    // Esperamos a que el DOM esté listo para asegurar que los nodos existen
  document.addEventListener('DOMContentLoaded', () => {
    if (!audio || !btnOn || !btnOff) {
      console.warn('⚠️ Elementos de audio o botones no encontrados')
      return
    }

    btnOff.addEventListener('click', handlePlaySound)
    btnOn.addEventListener('click', handlePauseSound)
  })


})();
