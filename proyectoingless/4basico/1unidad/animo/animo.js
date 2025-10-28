const draggablesContainer = document.querySelector('.words');
const imagesContainer = document.querySelector('.images');
const result = document.getElementById('result');

let correctCount = 0;
let roundCount = 0;

const states = [
  { word: 'hungry', img: '../imagenes/hambriento.webp' },
  { word: 'tired', img: '../imagenes/cansado.jpg' },
  { word: 'sick', img: '../imagenes/enfermo.webp' },
];

// Cargar ronda nueva
function loadRound() {
  // Seleccionar 3 estados al azar
  const selected = shuffle(states).slice(0, 3);

  // Limpiar zonas anteriores
  imagesContainer.innerHTML = '';
  draggablesContainer.innerHTML = '';
  result.textContent = '';

  selected.forEach(state => {
    // Crear zona de imagen (dropzone)
    const dropzone = document.createElement('div');
    dropzone.classList.add('dropzone');
    dropzone.dataset.word = state.word;

    const img = document.createElement('img');
    img.src = state.img;
    img.alt = state.word;

    dropzone.appendChild(img);
    imagesContainer.appendChild(dropzone);

    // Evento para permitir soltar
    dropzone.addEventListener('dragover', e => e.preventDefault());

    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      const draggedWord = e.dataTransfer.getData('text/plain');

      if (draggedWord === state.word && !dropzone.classList.contains('matched')) {
        const matched = document.createElement('div');
        matched.classList.add('matched');
        matched.textContent = draggedWord;
        dropzone.appendChild(matched);

        dropzone.classList.add('matched');
        result.textContent = "✅ Correct!";
        result.style.color = "green";

        correctCount++;

        if (correctCount % 3 === 0) {
          roundCount++;
          setTimeout(() => {
            if (roundCount === 3) {
              showSecretMessage();
            } else {
              loadRound(); // cargar nueva ronda
            }
          }, 1000);
        }
      } else {
        result.textContent = "❌ Try again!";
        result.style.color = "red";
      }
    });

    // Crear palabra (draggable)
    const wordDiv = document.createElement('div');
    wordDiv.classList.add('draggable');
    wordDiv.draggable = true;
    wordDiv.dataset.word = state.word;
    wordDiv.textContent = state.word.charAt(0).toUpperCase() + state.word.slice(1);

    wordDiv.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', state.word);
    });

    draggablesContainer.appendChild(wordDiv);
  });
}

// Mezclador aleatorio
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Mensaje final secreto
function showSecretMessage() {
  const messages = ["🎉 Good job!", "👏 Well done!"];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  result.textContent = randomMessage;
  result.style.color = "blue";
}

// Iniciar primera ronda
loadRound();