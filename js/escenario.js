/** escenario.js - Página de cada escenario
 * ----------------------------------------------------------------------
 * Este archivo controla toda la interactividad dinámica de las páginas individuales 
 * de los escenarios dentro del sitio web "Explorador de Escenarios Olvidados".
 *
 * Se encarga de inicializar y coordinar los siguientes módulos funcionales:
 * - Menú responsive: permite mostrar u ocultar la navegación principal en dispositivos móviles.
 * - Animaciones con Intersection Observer: aplica efectos visuales cuando los elementos entran en el viewport al hacer scroll.
 * - Popup interactivo con efecto máquina de escribir: muestra un mensaje narrativo al hacer clic en un disparador secreto.
 * - Cursor personalizado: sustituye el cursor tradicional por uno visual animado que responde a clics y elementos interactivos.
 * - Activación del sonido ambiental: permite al usuario activar/desactivar la música ambiental desde la interfaz.
 * - Galería de imágenes con Lightbox: permite ampliar las imágenes al hacer clic sobre ellas.
 * - Carrusel de testimonios: carrusel funcional con autoplay, navegación por flechas, botones y teclado.
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
  const elementosAnimados = document.querySelectorAll(`.Scenario-h1, .Scenario-subtitle, .Story-h2, .Story-p, .Galery-h2, .Galery-p, .Galery-li, .Fragment-h2, .Fragment-p, .Carrousel`)

  //Constantes del Popup interactivo
  const overlay = document.querySelector(".Popup")
  const trigger = document.getElementById("Popup-trigger")     // Elemento que activa el popup
  const closeBtn = overlay.querySelector(".Popup-btn")        // Botón de cierre
  const output = overlay.querySelector(".Popup-typewriter")   // Botón de cierre

  //Constantes del Cursor personalizado
  const cursor = document.querySelector('.Cursor')
  const botones = document.querySelectorAll('.Header-a, .Footer-up, .Footer-links, .Footer-coordinates--trigger, .Galery-li, .Lightbox-boton, .Carrousel-btn, .Carrousel-arrow, .Sound-btn ')

  //Constantes del Audio ((botones ON/OFF y elemento <audio>))
  const audio = document.querySelector('.Sound-audio')
  const btnOn = document.querySelector('.Sound-btn--ON')        // Botón para pausar el sonido
  const btnOff = document.querySelector('.Sound-btn--OFF')     // Botón para reproducir el sonido

  // Constantes de la galería
  const imgList = document.querySelectorAll('.Galery-img')           // Todas las imágenes de la galería
  const lightbox = document.querySelector('.Lightbox')               // Contenedor del lightbox
  const lightboxImg = lightbox.querySelector('.Lightbox-img')       // Imagen dentro del lightbox
  const lightboxCerrar = lightbox.querySelector('.Lightbox-boton')  // Botón para cerrar el lightbox

  // Selectores del carrusel
  const carrousel = document.querySelector('.Carrousel')                         // Contenedor del carrusel
  const carrouselWrapper = carrousel.querySelector('.Carrousel-wrapper')        // Track de imágenes
  const carrouselBtns = carrousel.querySelectorAll('.Carrousel-btn')            // Botones de navegación
  const carrouselNext = carrousel.querySelector('.Carrousel-arrow--next')       // Flecha siguiente
  const carrouselPrev = carrousel.querySelector('.Carrousel-arrow--prev')       // Flecha anterior
  const carrouselFrag = carrousel.querySelectorAll('.Carrousel-fragment')       // Fragmentos del carrusel
  const numImgs = carrouselFrag.length       // Total de imágenes

  // Estado del Carrusel
  let contador = 0                           // Imagen actual
  let autoplayInterval                       // Intervalo del autoplay
  let restartTimeout                         // Reinicio del autoplay tras interacción

  // ==========================
  // FUNCIONES
  // ==========================

  // MENÚ RESPONSIVE---------------------
  //Función handler que se ejecuta para alternar la visibilidad en el menú responsive
  const handleMenuToggle = () => {
    boton.classList.toggle("isOpen")
    headerUL.classList.toggle("isVisible")
  }

  //  INTERSECTION OBSERVER---------------------
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

  // POPUP INTERACTIVO CON EFECTO MÁQUINA DE ESCRIBIR---------------------
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

  // CURSOR PERSONALIZADO INTERACTIVO---------------------
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



  //SONIDO AMBIENTAL---------------------
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


  //GALERIA + LIGHTBOX---------------------
  // Muestra el lightbox con la imagen ampliada al hacer click sobre una imagen de la galería
  const openLightboxHandler = i => {
    lightbox.classList.add('isActive')   // Activa el lightbox
    lightboxImg.src = imgList[i].src     // Inserta la imagen seleccionada
  }

// Cierra el lightbox al hacer click en el botón de cerrar
  const closeBtnHandler = () => lightbox.classList.remove('isActive')



  //CARRUSEL DE TESTIMONIOS---------------------
  // Configuración inicial del carrusel: Establece dinámicamente el ancho total del carrusel y sus columnas según el número de imágenes
  carrouselWrapper.style.width = `${100 * numImgs}%`
  carrouselWrapper.style.gridTemplateColumns = `repeat(${numImgs}, 1fr)`

// Desplaza el carrusel a la posición del contador actual
  const carrouselWrapperMove = () => {
    carrouselWrapper.style.translate = `-${(100 / numImgs) * contador}%`
  }

// Cambia el estado visual del botón activo en el carrusel
  const carrouselBtnsChange = () => {
    carrouselBtns.forEach(btn => btn.classList.remove('isActive'))
    carrouselBtns[contador] && carrouselBtns[contador].classList.add('isActive')
  }

 // Inicia el autoplay, haciendo avanzar el carrusel cada 4 segundos
  const startAutoplay = () => {
    autoplayInterval = setInterval(() => carrouselNextHandler(), 4000)
  }

  // Detiene el autoplay actual y limpia cualquier timeout pendiente
  const stopAutoplay = () => {
    clearInterval(autoplayInterval)
    clearTimeout(restartTimeout)
  }

// Reinicia el autoplay después de 5 segundos de inactividad
  const restartAutoplay = () => {
    stopAutoplay()
    restartTimeout = setTimeout(() => startAutoplay(), 5000) // A los 5 segundos sin tocar nada, se restaura el autoplay
  }

// Avanza al siguiente fragmento del carrusel
  const carrouselNextHandler = () => {
    carrouselWrapper.classList.add('hasTransition')
    contador++
     // Si llegamos al final, volvemos al inicio tras una breve pausa
    if (contador >= numImgs - 1) {
      setTimeout(() => {
        contador = 0
        carrouselWrapper.classList.remove('hasTransition')
        carrouselWrapperMove()
        carrouselBtnsChange()
      }, 500)
    }
    carrouselWrapperMove()
    carrouselBtnsChange()
  }

  // Retrocede al fragmento anterior
  const carrouselPrevHandler = () => {
    stopAutoplay()
    restartAutoplay()
    contador--
    if (contador < 0) contador = numImgs - 1
    carrouselWrapperMove()
    carrouselBtnsChange()
  }

// Asigna a cada botón del carrusel la función de desplazamiento directo
  const carrouselBtnsHandler = (_, i) => {
    carrouselBtns[i] && carrouselBtns[i].addEventListener('click', () => {
      stopAutoplay()
      restartAutoplay()
      contador = i
      carrouselWrapperMove()
      carrouselBtnsChange()
    })
  }

// Control del carrusel mediante teclado (flechas izquierda/derecha y números del 1 al número total de imágenes)
  const windowKeydownHandler = ({ key }) => {
    stopAutoplay()
    restartAutoplay()

    key === 'ArrowRight' && carrouselNextHandler()
    key === 'ArrowLeft' && carrouselPrevHandler()

    if (!isNaN(key) && key >= 1 && key <= numImgs) {
      contador = Number(key) - 1
      carrouselWrapperMove()
      carrouselBtnsChange()
    }
  }

  // ==========================
  // EVENT LISTENERS
  // ==========================
  // MENÚ RESPONSIVE-----------
  boton.addEventListener("click", handleMenuToggle)

  // POPUP---------------------
  // Evento click en el disparador
  trigger.addEventListener("click", abrirPopup)
  // Evento click en botón de cerrar
  closeBtn.addEventListener("click", cerrarPopup)
  // Cerrar también si se hace clic fuera del contenido
  overlay.addEventListener("click", (e) => e.target === overlay && cerrarPopup())

  // CURSOR PERSONALIZADO-------
  window.addEventListener("mousemove", handleMouseMove)
  window.addEventListener("mousedown", handleMouseDown)
  window.addEventListener("mouseup", handleMouseUp)

  botones.forEach((btn) => {
    btn.addEventListener("mouseover", handleHoverIn)
    btn.addEventListener("mouseout", handleHoverOut)
  })

  //SONIDO AMBIENTAL---------------------
  // Esperamos a que el DOM esté listo para asegurar que los nodos existen
  document.addEventListener('DOMContentLoaded', () => {
    if (!audio || !btnOn || !btnOff) {
      console.warn('⚠️ Elementos de audio o botones no encontrados')
      return
    }

    btnOff.addEventListener('click', handlePlaySound)
    btnOn.addEventListener('click', handlePauseSound)
  })


  //GALERIA + LIGHTBOX---------------------
 // Recorre todas las imágenes de la galería y les asigna un evento para abrir el lightbox
// Al hacer `pointerdown` (válido tanto para ratón como para móvil/táctil),
// se ejecuta `openLightboxHandler(i)` pasando el índice de la imagen seleccionada
  imgList.forEach((img, i) =>
    img.addEventListener('pointerdown', () => openLightboxHandler(i))
  )

// Cierra el lightbox al hacer click en el botón de cerrar
  lightboxCerrar.addEventListener('pointerdown', closeBtnHandler)

  //CARRUSEL DE TESTIMONIOS---------------------
  // Asigna a cada botón del carrusel (los indicadores debajo del carrusel) su handler personalizado
  carrouselBtns.forEach(carrouselBtnsHandler)

  // Evento click en flecha siguiente:
// Detiene el autoplay actual, lo reinicia después de unos segundos, y avanza al siguiente slide
  carrouselNext.addEventListener('click', () => {
    stopAutoplay()
    restartAutoplay()
    carrouselNextHandler()
  })
// Evento click en flecha anterior:
// Igual que el anterior, pero retrocede al slide anterior
  carrouselPrev.addEventListener('click', () => {
    stopAutoplay()
    restartAutoplay()
    carrouselPrevHandler()
  })
  // Control del carrusel mediante teclado:
  // Flechas izquierda/derecha → navegan entre slides
  // Teclas numéricas (1 a n) → saltan a un slide concreto
  window.addEventListener('keydown', windowKeydownHandler)

// Al cargar la página, inicia el carrusel automático
  startAutoplay()

})();
