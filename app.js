const taskInput = document.getElementById('taskInput');
const notePad = document.getElementById('notePad');
const noteList = document.getElementById('noteList');
const nothingToDo = document.getElementById('nothingToDo');
const dropdowns = document.querySelectorAll('.a5');
const form = document.getElementById('inputForm');

function todoAdd(event) {
  const taskInputValue = taskInput.value.trim();

  if (taskInputValue === '') {
    alert('Oops! Looks like you forgot to enter a task. Please add a to-do item before submitting.');
    return;
  };
  
  event.preventDefault();
  createList(taskInputValue);
  nothingToDo.remove();
  form.reset();
};

function createList(TaskValue) {
  const mainElement = document.createElement('li');
  const checkMarkBtn = document.createElement('div');
  const noteContent = document.createElement('span');
  const trashBtn = document.createElement('div');
  
  mainElement.classList.add('list');
  trashBtn.classList.add('listMenu');
  checkMarkBtn.innerHTML = '<ion-icon class="checkmarkBtn" name="checkmark-circle-outline"></ion-icon>';
  trashBtn.innerHTML = '<ion-icon class="trashIcon" name="trash-outline"></ion-icon>';
  noteContent.innerText = TaskValue;

  mainElement.append(checkMarkBtn, noteContent, trashBtn);
  noteList.appendChild(mainElement);
};

function changePattern(pattern) {
  const selectedPattern = document.querySelector('selected');
  notePad.classList.remove("none", "pattern-dot", "pattern-line");
  if (pattern !== "none") {
    notePad.classList.add(pattern);
  };
};

function changeFontSize(size) {
  const selectedFontSize = document.querySelector("selected");
  notePad.style.fontSize = size;
};

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