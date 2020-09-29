/**************************************** */
// Grilla
/**************************************** */
const width = 10;
const height = 10;
const cellCount = width * height;
const grid = document.querySelector('.grid');
const cells = [];

// 1. Cuenta de 0 a 100, por cada cuenta hace lo siguiente:
for (let index = 0; index < cellCount; index = index + 1) {
  // 1.1 Crea un elemento nuevo (div)
  const cell = document.createElement('div');
  // 1.2 Lo coloca como hijo del elemento con la clase grid (linea 16 en HTM)
  grid.appendChild(cell);
  // 1.3 Coloca el elemento nuevo dentro de una colección (array) llamada cells
  cells.push(cell);
}

/**************************************** */
// Shooter
/**************************************** */

let shooterPosition = 94;

const addshooter = (index) => cells[index].classList.add('shooter');
const removeshooter = (index) => cells[index].classList.remove('shooter');

// 2.1 Esta función maneja el evento de presion de teclas
const handleKeyPress = (event) => {
  // Haciendo desestructuración coloco en una constante llamada key el valor de la propiedad key
  // del objecto event
  // const key = event.key
  const { key } = event;

  // A partir de la posicion donde esta el shooter calculo las coordenadas en un eje cartesiano
  const x = shooterPosition % 10;
  const y = Math.floor(shooterPosition / 10);

  // Antes de evaluar que tecla presiono el usuario remuevo el shooter de la posicion actual
  // Esto es para crear la ilusion de movimiento del shooter en pantalla

  removeshooter(shooterPosition);

  // Evaluo que tecla toco el usuario
  switch (key) {
    // Si es la flecha derecha
    case 'ArrowRight':
      // compara si la posicion esta en dentro del margen derecho
      if (x < width - 1) {
        // Suma + 1 a la posicion
        // ej: posicion inicial era 55 la nueva sera 56
        shooterPosition++;
      }
      break;
    // Si es la flecha izquierda
    case 'ArrowLeft':
      // compara si la posicion esta en dentro del margen izquierdo
      if (x > 0) {
        // resta - 1 a la posicion
        // ej: posicion inicial era 55 la nueva sera 54
        shooterPosition--;
      }
      break;
    default:
      break;
  }
  // Añade el shooter a la nueva posicion
  addshooter(shooterPosition);
};

// Imprime por primera vez en pantalla la posicion inicial del shooter
addshooter(shooterPosition);

// 2 Escucho un evento en el navegador de presion de teclas,
// cuando eso pasa ejecuto la function handleKeyPress
window.addEventListener('keyup', handleKeyPress);

/**************************************** */
// Alien
/**************************************** */

class Alien {
  constructor(initialPosition) {
    this.initialPosition = initialPosition;
  }

  addToBoard(position) {
    cells[position].classList.add('alien');
  }

  removeToBoard(position) {
    cells[position].classList.remove('alien');
  }

  renderInitialPosition() {
    this.addToBoard(this.initialPosition);
  }
}

const initialAlienPositions = [40, 50, 51, 52, 53, 54, 58, 59];

const addalien = (index) => cells[index].classList.add('alien');
const removealien = (index) => cells[index].classList.remove('alien');

// 3.1 Ejecuta la funcion addAliensToBoard por cada uno de las posiciones dentro
// de la colección(array) initialAlienPositions
const addAliensToBoard = (initialPosition) => {
  // 3.2 Crea un objeto desde la plantilla Alien
  // y lo agrega como valor a  una constante llamada alien
  const alien = new Alien(initialPosition);
  //3.3 Llama al metodo addToBoard del objeto alien
  alien.renderInitialPosition();
};

// 3 Imprimie aliens en pantalla
initialAlienPositions.forEach(addAliensToBoard);
