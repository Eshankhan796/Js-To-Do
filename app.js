const taskInput = document.getElementById('taskInput');
const form = document.getElementById('inputForm');
const notePad = document.getElementById('notePad');
const noteList = document.getElementById('noteList');
const nothingToDo = document.getElementById('nothingToDo');
const dropdowns = document.querySelectorAll('.a5');




function todoAdd(event) {
  event.preventDefault();
  taskInputValue = taskInput.value.trim();

  if (taskInputValue === '') {
    alert('Oops! Looks like you forgot to enter a task. Please add a to-do item before submitting.');
    return;
  };
  nothingToDo.remove();
  noteList.style.display = 'flex';
  noteList.style.flexDirection = 'column-reverse';

  const noteItems = document.createElement('li');
  const checkmarkBtn = document.createElement('div');
  const listContent = document.createElement('span');
  const listMenu = document.createElement('div');

  checkmarkBtn.style.display = 'flex';
  checkmarkBtn.style.justifyContent = 'center';
  checkmarkBtn.style.alignItems = 'center';
  checkmarkBtn.style.marginRight = '3px';
  checkmarkBtn.innerHTML = '<ion-icon class="checkmarkBtn" name="checkmark-circle-outline"></ion-icon>'
  
  listMenu.style.marginLeft = 'auto';
  listMenu.style.display = 'flex';
  listMenu.style.gap = '10px';
  listMenu.style.fontSize = '18px';
  listMenu.style.alignItems = 'center';
  listMenu.innerHTML = '<ion-icon name="pencil"></ion-icon><ion-icon name="trash"></ion-icon>';
  
  listContent.innerText = taskInputValue;
  noteItems.append(checkmarkBtn, listContent, listMenu);
  noteItems.classList.add('list');
  noteList.appendChild(noteItems);

  form.reset();
};

function changePattern(pattern) {
  const selectedPattern = document.querySelector('selected');
  notePad.classList.remove("none", "pattern-dot", "pattern-line");
  if (pattern !== "none") {
    notePad.classList.add(pattern);
  }
}

function changeFontSize(size) {
  const selectedFontSize = document.querySelector("selected");
  notePad.style.fontSize = size;
}

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');
      options.forEach(option => {
        option.classList.remove('active');
      });
      option.classList.add('active');
    });
  });
});