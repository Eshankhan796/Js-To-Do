const taskInput=document.getElementById("taskInput"),notePad=document.getElementById("notePad"),noteList=document.getElementById("noteList"),nothingToDo=document.getElementById("nothingToDo"),dropdowns=document.querySelectorAll(".a5"),form=document.getElementById("inputForm");function todoAdd(e){var t=taskInput.value.trim();""===t?alert("Oops! Looks like you forgot to enter a task. Please add a to-do item before submitting."):(e.preventDefault(),createList(t),nothingToDo.remove(),form.reset())}function createList(e){var t=document.createElement("li"),a=document.createElement("ion-icon"),o=document.createElement("span"),n=document.createElement("ion-icon");a.setAttribute("name","checkmark-circle-outline"),n.setAttribute("name","trash"),n.classList.add("trash-ion-icon"),a.classList.add("checkMarkBtn"),t.classList.add("list"),o.innerText=e,t.append(a,o,n),noteList.appendChild(t),CheckOperation(a,o),deleteOperation(n,t),saveLocalStorage(e)}function saveLocalStorage(e){var e=btoa(e),t=JSON.parse(localStorage.getItem("data"))||[];t.push(e),localStorage.setItem("data",JSON.stringify(t))}function loadLocalStorage(){var e=JSON.parse(localStorage.getItem("data"))||[];const c=JSON.parse(localStorage.getItem("checkedStatus"))||{};e.forEach(e=>{var e=atob(e),t=document.createElement("li"),a=document.createElement("ion-icon"),o=document.createElement("span"),n=document.createElement("ion-icon");a.setAttribute("name",c[e]?"checkmark-circle":"checkmark-circle-outline"),n.setAttribute("name","trash"),n.classList.add("trash-ion-icon"),a.classList.add("checkMarkBtn"),t.classList.add("list"),o.innerText=e,t.append(a,o,n),noteList.appendChild(t),CheckOperation(a,o,e),deleteOperation(n,t),nothingToDo.remove()})}function CheckOperation(t,e,a){t.addEventListener("click",()=>{var e="checkmark-circle-outline"===t.getAttribute("name")?"checkmark-circle":"checkmark-circle-outline";t.setAttribute("name",e),saveCheckedStatusToLocalStorage(a,"checkmark-circle"==e)})}function deleteOperation(e,t){e.addEventListener("click",()=>{var e=t.querySelector("span").innerText;t.remove(),listCheck(),deleteAndUpdate(e)})}function deleteAndUpdate(e){var t=JSON.parse(localStorage.getItem("data"))||[];const a=btoa(e);e=t.filter(e=>e!==a);localStorage.setItem("data",JSON.stringify(e))}function changePattern(e){notePad.classList.remove("none","pattern-dot","pattern-line"),"none"!==e&&notePad.classList.add(e)}function listCheck(){0===noteList.getElementsByTagName("li").length&&notePad.append(nothingToDo)}function changeFontSize(e){document.querySelector("selected");notePad.style.fontSize=e}function saveCheckedStatusToLocalStorage(e,t){var a=JSON.parse(localStorage.getItem("checkedStatus"))||{};a[e]=t,localStorage.setItem("checkedStatus",JSON.stringify(a))}function loadCheckedStatusFromLocalStorage(){var e=JSON.parse(localStorage.getItem("checkedStatus"))||{},t=document.querySelectorAll("#noteList .list");for(const a in e){const o=e[a];t.forEach(e=>{var t=e.querySelector("span").innerText,e=e.querySelector('ion-icon[name="checkmark-circle-outline"]');t===a&&e&&o&&e.setAttribute("name","checkmark-circle")})}}window.onload=function(){loadLocalStorage(),loadCheckedStatusFromLocalStorage()},dropdowns.forEach(e=>{const t=e.querySelector(".select"),a=e.querySelector(".caret"),o=e.querySelector(".menu"),n=e.querySelectorAll(".menu li"),c=e.querySelector(".selected");t.addEventListener("click",()=>{t.classList.toggle("select-clicked"),a.classList.toggle("caret-rotate"),o.classList.toggle("menu-open")}),n.forEach(e=>{e.addEventListener("click",()=>{c.innerText=e.innerText,t.classList.remove("select-clicked"),a.classList.remove("caret-rotate"),o.classList.remove("menu-open"),n.forEach(e=>{e.classList.remove("active")}),e.classList.add("active")})})});