

'use strict';




// Menu

const boton = document.querySelector(`.Header-btn`)
const headerUL = document.querySelector(`.Header-ul`)

console.log({ boton, headerUL })


    boton.addEventListener(`click`, () =>{
        boton.classList.toggle(`isOpen`)
        headerUL.classList.toggle(`isVisible`);   
})




//Intersection Observer

const elementosAnimados = document.querySelectorAll(`.Intro-p , .Scenario-p, .Scenario-card-wrapper, .Intro-btns, .Scenario-btns`)

console.log( elementosAnimados )

let callback = ( entries ) => {
  entries.forEach( ( entry )=>{
        let { isIntersecting , target } = entry

        if( isIntersecting ){
            target.classList.add(`isVisible`)
        }
    })
}
let options = {
    threshold : [0, 0.1]
}

let observer = new IntersectionObserver( callback , options )

elementosAnimados.forEach( ( eachElemento )=>observer.observe(eachElemento))

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
        const botones = document.querySelectorAll('.Hero-ancla, .Header-a, .Intro-btn, .Intro-ancla, .Scenario-card-btn, .Scenario-btn-scenarios, .Scenario-btn-contact, .Footer-up, .Footer-links, .Footer-coordinates--trigger ');
        
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


   
// //Efecto repelente
// const magnetics = document.querySelectorAll('.Intro-svg');

// window.addEventListener('mousemove', (e) => {
//   magnetics.forEach(el => {
//     const rect = el.getBoundingClientRect();
//     const elCenterX = rect.left + rect.width / 2;
//     const elCenterY = rect.top + rect.height / 2;

//     const deltaX = e.clientX - elCenterX;
//     const deltaY = e.clientY - elCenterY;

//     const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
//     const maxDistance = 200;

//     if (distance < maxDistance) {
//       const moveX = deltaX * 0.2;
//       const moveY = deltaY * 0.2;
//       el.style.transform = `translate(${moveX}px, ${moveY}px)`;
//     } else {
//       el.style.transform = `translate(0, 0)`;
//     }
//   });
// });







