/**************************************** */
// Grid
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
  // 1.2 Lo coloca como hijo del elemento con la clase grid (linea 16 en HTML)
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

// 2.1 Esta función maneja el evento de presión de teclas
const handleKeyPress = (event) => {
  // Haciendo desestructuración coloco en una constante llamada key el valor de la propiedad key
  // del objecto event
  // const key = event.key
  const { key } = event;

  // A partir de la posicion donde esta el shooter calculo las coordenadas en un eje cartesiano
  const x = shooterPosition % 10;
  const y = Math.floor(shooterPosition / 10);

  // Antes de evaluar que tecla presionó el usuario remuevo el shooter de la posicion actual
  // Esto es para crear la ilusion de movimiento del shooter en pantalla

  removeshooter(shooterPosition);

  // Evaluo que tecla tocó el usuario
  switch (key) {
    // Si es la flecha derecha
    case 'ArrowRight':
      // compara si la posición esta en dentro del margen derecho
      if (x < width - 1) {
        // Suma + 1 a la posición
        // ej: posición inicial era 55 la nueva será 56
        shooterPosition++;
      }
      break;
    // Si es la flecha izquierda
    case 'ArrowLeft':
      // compara si la posición esta en dentro del margen izquierdo
      if (x > 0) {
        // resta - 1 a la posición
        // ej: posición inicial era 55 la nueva sera 54
        shooterPosition--;
      }
      break;
    default:
      break;
  }
  // Añade el shooter a la nueva posición
  addshooter(shooterPosition);
};

// Imprime por primera vez en pantalla la posicion inicial del shooter
addshooter(shooterPosition);

// 2 Escucho un evento en el navegador de presión de teclas,
// cuando eso pasa ejecuto la function handleKeyPress
window.addEventListener('keyup', handleKeyPress);

/**************************************** */
// Alien
/**************************************** */

class Alien {
  constructor(position) {
    this.position = position;
  }

  addToBoard(position) {
    cells[position].classList.add('alien');
  }

  removeFromBoard(position) {
    cells[position].classList.remove('alien');
  }

  renderposition() {
    this.addToBoard(this.position);
  }
}

let alienPositions = [
  12,
  13,
  14,
  15,
  16,
  17,
  22,
  23,
  24,
  25,
  26,
  27,
  32,
  33,
  34,
  35,
  36,
  37,
  42,
  43,
  44,
  45,
  46,
  47,
  52,
  53,
  54,
  55,
  56,
  57,
];

const addalien = (index) => cells[index].classList.add('alien');
const removealien = (index) => cells[index].classList.remove('alien');

let aliens = [];

// 3.1 Ejecuta la función addAliensToBoard por cada una de las posiciones dentro
// de la colección(array) alienPositions
const addAliensToBoard = (initialPosition) => {
  // 3.2 Crea un objeto desde la plantilla Alien
  // y lo agrega como valor a  una constante llamada alien
  const alien = new Alien(initialPosition);
  //3.3 Llama al metodo addToBoard del objeto alien
  alien.renderposition();

  aliens.push(alien);
};

// 3 Imprime aliens en pantalla
alienPositions.forEach(addAliensToBoard);

/**************************************** */
// Mover aliens en conjunto
/**************************************** */

// 4. Para tener el efecto de que los aliens se mueven debo:
const moveToRight = () => {
  // 4.1 Crear un un nuevo array con las nuevas posiciones,
  // para luego sustituir el valor de las posiciones iniciales que vienen del array alienPositions con nuevas posiciones
  const newAlienPositions = [];
  // como me muevo a la derecha, debo saber cual es el valor de la posición más alta
  const rightPosition = aliens[aliens.length - 1].position;
  // para evaluar si la posición esta al margen uso las mismas condiciones que hice para handleKey function (línea 50)
  const x = rightPosition % 10;
  if (x < width - 1) {
    // Si estoy dentro del margen derecho
    aliens.forEach((alien) => {
      // Remuevo todos los aliens anteriores
      alien.removeFromBoard(alien.position);
      // asigno valores de nuevas posiciones al array newAlienPositions
      newAlienPositions.push(alien.position + 1);
    });
    // Reseteo aliens
    aliens = [];
    // Agrego nuevos aliens al tablero y los incorporo al array alien (línea 117)
    newAlienPositions.forEach(addAliensToBoard);
  }
};

// Igual que moveToRight, solo cambia los valores del margen y de la nueva posicion
const moveToLeft = () => {
  const newAlienPositions = [];
  const leftPosition = aliens[0].position;
  const x = leftPosition % 10;

  if (x > 0) {
    aliens.forEach((alien) => {
      alien.removeFromBoard(alien.position);
      newAlienPositions.push(alien.position - 1);
    });

    aliens = [];

    newAlienPositions.forEach(addAliensToBoard);
  }
};

// Crea un numero aleatorio entre 1 y 10
const getRandomNumber = () => Math.floor(Math.random() * (10 - 1 + 1) + 1);

// Evalue si el numero es par
const isEven = (number) => (number % 2 ? true : false);

const randomMovement = () => {
  // Genera un numero aleatorio
  const randomNumber = getRandomNumber();

  // Evalua si es par
  if (isEven(randomNumber)) {
    // Si es par mueve a la derecha
    moveToRight();
  } else {
    // Si es impar mueve a la izquierda
    moveToLeft();
  }
};

// Ejecuta la función randomMovement cada ciertos milisegundos
setInterval(randomMovement, 400);

/**************************************** */
// Laser
/**************************************** */

// function shoot() {
//   let laserId;
//   let currentLaser = currentShooterIndex;
//   let lasertiming = 300;
// }
// function moveLaser() {
//   cells[currentLaser].classList.remove('laser');
//   currentLaser -= width;
//   cells[currentLaser].classList.add('laser');
//   if (cells[currentLaser].classList.contains('invader')) {
//     cells[currentLaser].classList.remove('laser');
//     cells[currentLaser].classList.remove('invader');
//     // cells[currentLaser].classList.add('boom')

//     const alienTakenDown = Alien.indexOf(currentLaser);
//     alienTakenDown.push(alienTakenDown);
//     result++;
//     resultDisplay.textContent = result;
//   }

//   if (currentLaser < width) {
//     clearInterval(laserId);
//     setTimeout(() => cells[currentLaser].classList.remove('laser'), 100);
//   }
// }

//   switch (key) {
//     case 'SpaceBar':
//       setInterval(() => {
//         removelaser(laserPosition);
//         laserPosition = width;
//         addlaser(laserPosition);
//         clearInterval();

// console.log('laser');

var laserPosition = 'laser';
laserPosition; // arr

let lasertiming = 300;

function laser(event) {
  let laserPosition = alienPositions;
  const { key } = event;

  switch (key) {
    case 'SpaceBar':
      setInterval(() => {
        removelaser(laserPosition);
        laserPosition -= width;
        addlaser(laserPosition);
        clearInterval();

        if (laserPosition === alienPositions)
          () => {
            laserPosition === [removelaser];
            cells[index].classList.remove(laserPosition)('laser');
            () => cells[laserPosition].classList.remove('laser');
          };
      }, 150);
      break;
  }
}

console.log('laser');

const addlaser = (index) => cells[index].classList.add('laser');

// TODO:

// Desaparecer aliens cuando sean disparados
// Score

{
}

// // ...
// var scoreText;
// var score = 0;
// function create() scoreText = game.add.text(5, 5, 'Points: 0', { font: '18px Arial', fill: '#0095DD' });
