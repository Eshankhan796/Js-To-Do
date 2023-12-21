const taskInput = document.getElementById('taskInput');
const notePad = document.getElementById('notePad');
const noteList = document.getElementById('noteList');
const nothingToDo = document.getElementById('nothingToDo');
const dropdowns = document.querySelectorAll('.a5');
const form = document.getElementById('inputForm');

window.onload = function() {
  loadLocalStorage();

  loadCheckedStatusFromLocalStorage();
};

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
  const checkMarkBtn = document.createElement('ion-icon');
  const noteContent = document.createElement('span');
  const trashBtn = document.createElement('ion-icon');

  checkMarkBtn.setAttribute('name', 'checkmark-circle-outline');
  trashBtn.setAttribute('name', 'trash');

  trashBtn.classList.add('trash-ion-icon');
  checkMarkBtn.classList.add('checkMarkBtn');
  mainElement.classList.add('list');
  noteContent.innerText = TaskValue;

  mainElement.append(checkMarkBtn, noteContent, trashBtn);
  noteList.appendChild(mainElement);
  CheckOperation(checkMarkBtn, noteContent);
  deleteOperation(trashBtn, mainElement);
  saveLocalStorage(TaskValue);
};

function saveLocalStorage(TaskValue) {
  const encryptedTask = btoa(TaskValue);
  const data = JSON.parse(localStorage.getItem('data')) || [];
  data.push(encryptedTask);
  localStorage.setItem('data', JSON.stringify(data));
};

function loadLocalStorage() {
  const data = JSON.parse(localStorage.getItem('data')) || [];
  const checkedStatus = JSON.parse(localStorage.getItem('checkedStatus')) || {};

  data.forEach((encryptedTask) => {
    const decryptedTask = atob(encryptedTask);
    const mainElement = document.createElement('li');
    const checkMarkBtn = document.createElement('ion-icon');
    const noteContent = document.createElement('span');
    const trashBtn = document.createElement('ion-icon');

    checkMarkBtn.setAttribute('name', checkedStatus[decryptedTask] ? 'checkmark-circle' : 'checkmark-circle-outline');
    trashBtn.setAttribute('name', 'trash');

    trashBtn.classList.add('trash-ion-icon');
    checkMarkBtn.classList.add('checkMarkBtn');
    mainElement.classList.add('list');
    noteContent.innerText = decryptedTask;

    mainElement.append(checkMarkBtn, noteContent, trashBtn);
    noteList.appendChild(mainElement);
    CheckOperation(checkMarkBtn, noteContent, decryptedTask);
    deleteOperation(trashBtn, mainElement);
    nothingToDo.remove();
  });
};

function CheckOperation(checkBtn, noteContent, todo) {
  checkBtn.addEventListener('click', () => {
    const currentValue = checkBtn.getAttribute('name');
    const newValue = currentValue === 'checkmark-circle-outline' ? 'checkmark-circle' : 'checkmark-circle-outline';
    checkBtn.setAttribute('name', newValue);
    saveCheckedStatusToLocalStorage(todo, newValue === 'checkmark-circle');
  });
};


function deleteOperation(trashBtn, mainElement) {
  trashBtn.addEventListener('click', () => {
    const todoToDelete = mainElement.querySelector('span').innerText;
    mainElement.remove();
    listCheck();
    deleteAndUpdate(todoToDelete);
  });
};

function deleteAndUpdate(todoToDelete) {
  const data = JSON.parse(localStorage.getItem('data')) || [];
  const encryptedTodoToDelete = btoa(todoToDelete);
  const updatedData = data.filter(encryptedTask => encryptedTask !== encryptedTodoToDelete);

  localStorage.setItem('data', JSON.stringify(updatedData));
};

function changePattern(pattern) {
  notePad.classList.remove("none", "pattern-dot", "pattern-line");
  if (pattern !== "none") {
    notePad.classList.add(pattern);
  };
};

function listCheck() {
  const noteListChilds = noteList.getElementsByTagName('li');
  if (noteListChilds.length === 0) {
    notePad.append(nothingToDo);
  }
};

function changeFontSize(size) {
  const selectedFontSize = document.querySelector("selected");
  notePad.style.fontSize = size;
};

function saveCheckedStatusToLocalStorage(todo, isChecked) {
  const checkedStatus = JSON.parse(localStorage.getItem('checkedStatus')) || {};
  checkedStatus[todo] = isChecked;
  localStorage.setItem('checkedStatus', JSON.stringify(checkedStatus));
};

function loadCheckedStatusFromLocalStorage() {
  const checkedStatus = JSON.parse(localStorage.getItem('checkedStatus')) || {};
  const noteListItems = document.querySelectorAll('#noteList .list');

  for (const todo in checkedStatus) {
    const isChecked = checkedStatus[todo];

    noteListItems.forEach(item => {
      const itemText = item.querySelector('span').innerText;
      const checkMarkBtn = item.querySelector('ion-icon[name="checkmark-circle-outline"]');

      if (itemText === todo && checkMarkBtn) {
        if (isChecked) {
          checkMarkBtn.setAttribute('name', 'checkmark-circle');
        }
      }
    });
  }
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