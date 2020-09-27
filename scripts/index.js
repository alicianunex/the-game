const width = 10;
const height = 10;
const cellCount = width * height;
console.log(cellCount);
const grid = document.querySelector('.grid');
for (let index = 0; index < cellCount; index = index + 1) {
  console.log(index);
  const cell = document.createElement('div');
  cell.innerText = index;
  grid.appendChild(cell);
}


console.log('Hola');
