"use strict";

let input = document.getElementById("input")
let addBtn = document.getElementById("addBtn")
let tasks = document.getElementById("tasksList")

// Создаем новое дело
function addTask(){
    if (input.value !== ""){

        // Создаем окно дела и кнопки
        tasks.innerHTML += ` 
        <div id="task" class="task">
            <span id="taskname" class="taskname">${input.value}</span>
            <button id="delBtn" class="btn">Удалить</button>
            <button id="editBtn" class="btn2">Редактировать</button>
            <button id="doneBtn" class="btn3">Готово</button>
        </div>`
        input.value = ""

        // Добавляем кнопке удалить действие
        let delBtn = document.querySelectorAll("#delBtn")
        for(let i = 0; i < delBtn.length; i++){
            delBtn[i].onclick = function(){
                let otvet = confirm("Вы уверены что хотите удалить дело ?")
                if (otvet == true ){
                    this.parentNode.remove();
                }
            }
        }

        // Добавляем кнопке редактировать действие
        let editBtn = document.querySelectorAll("#editBtn")
        for (let i = 0; i < editBtn.length; i++) {
            editBtn[i].onclick = function(){
                let task = this.parentElement.querySelector("#taskname")
                let newTask = prompt("Введите новое название дела", task.innerText)
                if (newTask !== "" && newTask !== null){
                task.innerText = newTask
                }
            }
        }

        // Добавляем кнопке готово действие
        let doneBtn = document.querySelectorAll("#doneBtn");
        for (let i = 0; i < doneBtn.length; i++) {
            doneBtn[i].onclick = function(){
                if(doneBtn[i].textContent === "Готово"){
                    this.parentNode.style.color = "White";
                    this.parentNode.style.backgroundColor = "SpringGreen"
                    doneBtn[i].textContent = "Не готово"
                  }
                  else{
                    this.parentNode.style.color = "Black";
                    this.parentNode.style.backgroundColor = "Teal"
                    doneBtn[i].textContent = "Готово"
                  }
            };
          }
        
    }
    else alert("Вы ничего не ввели")
}

// Ввод с помощью enter
input.addEventListener("keydown", function(event){
    if (event.key === "Enter") {addTask()}})
addBtn.addEventListener('click', addTask)