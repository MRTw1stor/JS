"use strict";

let input = document.getElementById("input")
let addBtn = document.getElementById("addBtn")
let tasks = document.getElementsByClassName("tasksList")[0]

// Добавить новое дело
function addTask(){
    if (input.value !== ""){
        // Создаем окно дела и кнопки
        tasks.innerHTML += ` 
        <div class="task">
            <span id="taskname" class="taskname">${input.value}</span>
            <button id="delBtn" class="btn1">Удалить</button>
            <button id="editBtn" class="btn2">Редактировать</button>
            <button id="doneBtn" class="btn3">Выполнено</button>
        </div>`
        input.value = ""

        // Добавляем кнопке удалить действие
        let delBtn = document.getElementsByClassName("btn1")
        for(let i = 0; i < delBtn.length; i++){
            delBtn[i].onclick = function(){
                let otvet = confirm("Вы уверены что хотите удалить дело ?")
                if (otvet == true ){
                    let task = this.parentElement
                    task.style.display = "none"  
                }
            }
        }

        // Добавляем кнопке редактировать действие
        let editBtn = document.getElementsByClassName("btn2")
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
        let doneBtn = document.getElementsByClassName("btn3")
        function doneTask(){
            let task = this.parentElement.querySelector("#taskname")
            task.style.backgroundColor = "aqua"
        }
        for (let i = 0; i < doneBtn.length; i++) {
            doneBtn[i].onclick = doneTask
        }
    }
    else alert("Вы ничего не ввели")
}