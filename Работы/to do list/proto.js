"use strict";

let input = document.getElementById("input")
let addBtn = document.getElementById("addBtn")
let tasks = document.getElementById("tasksList")

// Добавить новое дело
function addTask(){
    if (input.value !== ""){
        // Создаем окно дела и кнопки
        tasks.innerHTML += ` 
        <div id="task" class="task">
            <span id="taskname" class="taskname">${input.value}</span>
            <button id="delBtn" class="btn">Удалить</button>
            <button id="editBtn" class="btn2">Редактировать</button>
            <button id="doneBtn" class="btn3">Выполнено</button>
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
        function editTask(){
            let task = this.parentElement.querySelector("#taskname")
            let newTask = prompt("Введите новое название дела", task.innerText)
            if (newTask !== "" && newTask !== null){
              task.innerText = newTask
            }
        }
        for (let i = 0; i < editBtn.length; i++) {
            editBtn[i].onclick = editTask
        }

        // Добавляем кнопке выполнено действие
        let doneBtn = document.querySelectorAll("#doneBtn")
        function doneTask(){
            let task = this.parentElement.querySelector("#taskname")
            task.style.color = "white"
        }
        for (let i = 0; i < doneBtn.length; i++) {
            doneBtn[i].onclick = doneTask
        }
    }
    else alert("Вы ничего не ввели")
}
input.addEventListener("keydown", function(event){
    if (event.key === "Enter") {addTask()}})
addBtn.addEventListener('click', addTask)