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

let alienPosition = 54;

const addalien = (index) => cells[index].classList.add('alien');
const removealien = (index) => cells[index].classList.remove('alien');

const x = alienPosition % 10;
const y = Math.floor(alienPosition / 10);

addalien(alienPosition);

//drawing alien

// const alien = [];
const alien = [new Alien()];

class Alien {
  constructor(Alien) {
    this.alien = new Alien();
  }
}

for (let row = 0; row < 5; roww++) {
  for (let col = 0; col < 11; col++) {
    const alien = new Alien({
      x: col * 60 + 50,
      y: row * 60 + 50,
    });
    alien.push(Alien);
  }
}

// alien.forEach(alien);
// cells[currentalienIndex + alien].classList.add('alien');

// AudioSource audio;

// void Start();{
//   audio = GetComponet<AudioSource>();
// };

// void Update();
// {
//   if (Input.GetKeyDown(KeyCode.M))
//     if (audio.mute)
//       audio.mute = false;
//     else
//       audio.mute = true;
// }
