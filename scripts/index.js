// cells
const width = 10;
const height = 10;
const cellCount = width * height;
const grid = document.querySelector('.grid');
const cells = [];

for (let index = 0; index < cellCount; index = index + 1) {
  console.log(index);
  const cell = document.createElement('div');
  grid.appendChild(cell);
  cells.push(cell);
}

// shooter
let shooterPosition = 94;

const addshooter = (index) => cells[index].classList.add('shooter');
const removeshooter = (index) => cells[index].classList.remove('shooter');

const handleKeyPress = (event) => {
  const { key } = event;

  const x = shooterPosition % 10;
  const y = Math.floor(shooterPosition / 10);

  removeshooter(shooterPosition);

  switch (key) {
    case 'ArrowRight':
      if (x < width - 1) {
        shooterPosition++;
      }
      break;
    case 'ArrowLeft':
      if (x > 0) {
        shooterPosition--;
      }

      break;
    default:
      break;
  }
  addshooter(shooterPosition);
};

addshooter(shooterPosition);

window.addEventListener('keyup', handleKeyPress);

// alien

class Alien {
  constructor(initialPosition) {
    this.initialPosition = initialPosition;
  }

  addAlienToBoard() {
    cells[this.initialPosition].classList.add('alien');
  }
}

const initialAlienPositions = [40, 50, 51, 52, 53, 54, 58, 59];

const addalien = (index) => cells[index].classList.add('alien');
const removealien = (index) => cells[index].classList.remove('alien');

const addAliensToBoard = (initialPosition) => {
  const alien = new Alien(initialPosition);
  alien.addAlienToBoard();
};

initialAlienPositions.forEach(addAliensToBoard);

const alicia = new Alien(1);
alicia.addAlienToBoard();

const pedro = new Alien(10);
pedro.addAlienToBoard();
