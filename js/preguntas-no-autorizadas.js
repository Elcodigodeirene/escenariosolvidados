/** preguntas-no-autorizadas.js - Página de preguntas frecuentes o no autorizadas
 * ----------------------------------------------------------------------
 * Este archivo gestiona la interactividad de la página de preguntas frecuentes o no autorizadas, incluyendo:
 * - Menú responsive: permite mostrar u ocultar la navegación principal en dispositivos móviles.
 * - Popup interactivo con efecto máquina de escribir: muestra un mensaje narrativo al hacer clic en un disparador secreto.
 * - Cursor personalizado: sustituye el cursor tradicional por uno visual animado que responde a clics y elementos interactivos.
 * - Acordeón a medida: sistema interactivo que muestra y oculta respuestas expandibles al hacer clic, adaptado para funcionar de forma fluida y responsive.
 */

"use strict";

// IIFE → Encapsula todo el script en una función IIFE
(() => {
  // ==========================
  // VARIABLES Y SELECTORES
  // ==========================

  // Constantes del  Menú responsive
  const boton = document.querySelector(".Header-btn")         // Botón que abre/cierra el menú
  const headerUL = document.querySelector(".Header-ul")       // Lista de enlaces de navegación

  //Constantes del Popup interactivo
  const overlay = document.querySelector(".Popup")
  const trigger = document.getElementById("Popup-trigger")    // Elemento que activa el popup
  const closeBtn = overlay.querySelector(".Popup-btn")        // Botón de cierre
  const output = overlay.querySelector(".Popup-typewriter")   // Botón de cierre

  //Constantes del Cursor personalizado
  const cursor = document.querySelector('.Cursor')
  const botones = document.querySelectorAll('.Header-a, .Footer-up, .Footer-links, .Footer-coordinates--trigger,.Acordeon-btn ')

  //Constantes del Acordeón
  const acordeon = document.querySelector('.Acordeon')                            // Contenedor principal del acordeón
  const acordeonBotones = acordeon.querySelectorAll('.Acordeon-btn')             // Botones que activan cada sección
  const contenedores = acordeon.querySelectorAll('.Acordeon-container')          // Contenedores que encierran cada pregunta/respuesta

  // ==========================
  // FUNCIONES
  // ==========================

  // MENÚ RESPONSIVE
    //Función handler que se ejecuta para alternar la visibilidad en el menú responsive
  const handleMenuToggle = () => {
    boton.classList.toggle("isOpen")
    headerUL.classList.toggle("isVisible")
  }


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


  // ACORDEÓN A MEDIDA
    // Este bloque gestiona el funcionamiento del acordeón en la sección de preguntas no autorizadas.
    // Cada botón abre su sección correspondiente y cierra las demás automáticament.

    // El acordeón fue inicialmente desarrollado por mí, y con ayuda de ChatGPT se mejoró para:
    // - Ser responsive
    // - Ajustar la altura del contenido dinámicamente según su tamaño real (scrollHeight)
    // - Ofrecer una transición suave al abrir/cerrar sin depender de valores fijos
    
    // Al hacer clic en un botón:
    // 1. Se cierra cualquier contenedor que estuviera abierto.
    // 2. Si el contenedor clicado no estaba activo, se abre ajustando su altura.
acordeonBotones.forEach((boton, i) => {
  boton.addEventListener('click', () => {
    const contenedorActual = contenedores[i]                              // Contenedor correspondiente al botón actual
    const parrafo = contenedorActual.querySelector('.Acordeon-p')         // Elemento p que se expande
    const isOpen = contenedorActual.classList.contains('activo')          // Verifica si ya está abierto

    // Cierra todos los contenedores (reset general)
    contenedores.forEach(contenedor => {
      contenedor.classList.remove('activo')
      contenedor.querySelector('.Acordeon-p').style.height = '0px'
    })

    // Si no estaba abierto, lo abre y ajusta la altura del <p>
    if (!isOpen) {
      contenedorActual.classList.add('activo')
      parrafo.style.height = `${parrafo.scrollHeight}px`
    }
  })
})



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
})();






