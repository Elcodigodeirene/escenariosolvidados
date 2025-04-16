

'use strict';
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
        const botones = document.querySelectorAll('.Header-a, .Footer-up, .Footer-links, .Footer-coordinates--trigger ');
        
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


        

//Intersection Observer

const elementosAnimados = document.querySelectorAll(`.About-h1, .About-p, .About-members-h2, .About-members-p, .Members-card, .About-quote`)

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



//Sonido

const audio = document.querySelector('.Sound-audio');
const btnOn = document.querySelector('.Sound-btn--ON');
const btnOff = document.querySelector('.Sound-btn--OFF');
document.addEventListener('DOMContentLoaded', () => {


  if (!audio || !btnOn || !btnOff) {
    console.warn('Faltan elementos de audio o botones');
    return;
  }

  btnOff.addEventListener('click', () => {
    audio.volume = 0.2;
    audio.play().catch(err => console.warn('Error al reproducir audio:', err));
    btnOff.classList.add('isHidden');
    btnOn.classList.remove('isHidden');
  });

  btnOn.addEventListener('click', () => {
    audio.pause();
    btnOn.classList.add('isHidden');
    btnOff.classList.remove('isHidden');
  });
});