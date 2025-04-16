

'use strict';

// Acordeon preguntas
    // 1. Seleccionamos elementos clave
    const acordeon = document.querySelector('.Acordeon');
    const acordeonBotones = acordeon.querySelectorAll('.Acordeon-btn');
    const contenedores = acordeon.querySelectorAll('.Acordeon-container');
  
    // 2. Recorremos los botones
    acordeonBotones.forEach((boton, i) => {
      boton.addEventListener('click', () => {
        const contenedorActual = contenedores[i];
        const parrafo = contenedorActual.querySelector('.Acordeon-p');
        const estaAbierto = contenedorActual.classList.contains('activo');
  
        // 3. Cerramos todos los elementos
        contenedores.forEach(contenedor => {
          contenedor.classList.remove('activo');
          contenedor.querySelector('.Acordeon-p').style.height = '0px';
        });
  
        // 4. Si no estaba abierto, lo abrimos
        if (!estaAbierto) {
          contenedorActual.classList.add('activo');
          parrafo.style.height = `${parrafo.scrollHeight}px`;
        }
      })
    })


  // Menu

  const boton = document.querySelector(`.Header-btn`)
  const headerUL = document.querySelector(`.Header-ul`)
  
  console.log({ boton, headerUL })
  
  
      boton.addEventListener(`click`, () =>{
          boton.classList.toggle(`isOpen`)
          headerUL.classList.toggle(`isVisible`);   
  })
      // PopUp
      const trigger = document.getElementById('Popup-trigger');
      const overlay = document.querySelector('.Popup');
      const closeBtn = document.querySelector('.Popup-btn');
      const output = document.querySelector(`.Popup-typewriter`);
        
          const frases = [
            'Acceso no autorizado.',
            'Validando clave X-973A...',
            'Clave aceptada.',
            'Has accedido al archivo confidencial.\n',
            'Bienvenido, Explorador. Este registro no está validado por la Sociedad.',
            'Coordenadas fragmentadas detectadas: 𝚪93⋄⏃↯42° ΔΞ9',
            'Escenario: NO IDENTIFICADO. Requiere validación ocular.\n',
            'Este informe fue ocultado por petición del Cartógrafo Ciego.'
          ];
        
          let currentLine = 0;
          let currentChar = 0;
        
          const escribirLinea = () => {
            if (currentLine >= frases.length) return;
        
            const linea = frases[currentLine];
            if (currentChar < linea.length) {
              output.textContent += linea.charAt(currentChar);
              currentChar++;
              setTimeout(escribirLinea, 30); // velocidad de escritura
            } else {
              output.textContent += '\n';
              currentLine++;
              currentChar = 0;
              setTimeout(escribirLinea, 500); // pausa entre frases
            }
          };
        
          trigger.addEventListener('click', () => {
            output.textContent = ''; // reiniciar contenido
            overlay.style.display = 'flex';
            currentLine = 0;
            currentChar = 0;
            setTimeout(escribirLinea, 500); // iniciar animación
          });
        
          closeBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
          });
        
          overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
              overlay.style.display = 'none';
            }
          });
      
  
    
  //Efecto cursor
  
          const cursor = document.querySelector('.Cursor');
          const botones = document.querySelectorAll('.Header-a, .Footer-up, .Footer-links, .Footer-coordinates--trigger,.Acordeon-btn ');
          
          // Movimiento suave con requestAnimationFrame
          window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
              cursor.style.translate = `${e.clientX}px ${e.clientY}px`;
            });
          });
          
          // Click → animación
          window.addEventListener('mousedown', () => cursor.classList.add('isClicked'));
          window.addEventListener('mouseup', () => cursor.classList.remove('isClicked'));
          
          // Hover sobre botones → cambia forma
          botones.forEach(btn => {
            btn.addEventListener('mouseover', () => cursor.classList.add('isHover'));
            btn.addEventListener('mouseout', () => cursor.classList.remove('isHover'));
          });