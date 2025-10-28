const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');
const message = document.getElementById('message');

draggables.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

dropzones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', drop);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
  e.preventDefault(); // Necesario para permitir el drop
}

function drop(e) {
  e.preventDefault();
  const draggedId = e.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(draggedId);
  const targetColor = e.currentTarget.getAttribute('data-color');

  if (draggedId === targetColor) {
    e.currentTarget.appendChild(draggedElement);
    draggedElement.setAttribute('draggable', false);
    draggedElement.style.backgroundColor = '#edd4d4ff';
    checkWin();
  } else {
    alert("¡Intenta de nuevo! / Try again!");
  }
}

function checkWin() {
  const allPlaced = Array.from(draggables).every(item => !item.draggable);
  if (allPlaced) {
    message.textContent = "¡Muy bien! Todos los colores están correctos. / Great job!";
  }
}
