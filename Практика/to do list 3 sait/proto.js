"use strict"

// Создаем страницу дел
function todo() {

  // Cоздаем форму дела
  function createForm() {
    let form = document.createElement("form")
    let input = document.createElement("input")
    let button = document.createElement("button")
    button.setAttribute("id", "button")
    
    input.placeholder = "Введите новое дело"
    button.textContent = "Добавить дело"
    
    form.append(input)
    form.append(button)

    return { form, input, button }
  }

  // Cоздаем список элементов
  function createList() {
    let list = document.createElement("ul")
    return list
  }

  // Cоздаём дело и кнопки
  function createItem(text) {
    let item = document.createElement("div")
    let doneBtn = document.createElement("button")
    doneBtn.setAttribute("id","doneBtn")
    let delBtn = document.createElement("button")
    delBtn.setAttribute("id", "delBtn")
    let editBtn = document.createElement("button")
    editBtn.setAttribute("id", "editBtn")
    
    item.textContent = text
    doneBtn.textContent = "Готово"
    editBtn.textContent = "Редактировать"
    delBtn.textContent = "Удалить"
    item.append(doneBtn)
    item.append(editBtn)
    item.append(delBtn)

    return { item, doneBtn, delBtn, editBtn }
  }

  // Добавляем элементы на страницу
  document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById("container")
    let todoForm = createForm()
    let todoList = createList()

    container.append(todoForm.form)
    container.append(todoList)

    // Вешаем события на кнопки
    function setIvents(event) {
      event.preventDefault();
      let todoItem = createItem();

      // Проверка на пустой ввод
      if (todoForm.input.value == "" || todoForm.input.value == null) {
        alert("Вы ничего не ввели");
        return;
      }

      // Кнопка выполнено
      todoItem.doneBtn.addEventListener("click", function () {
        if (todoItem.doneBtn.textContent === "Готово") {
          todoItem.item.style.backgroundColor = "SpringGreen";
          todoItem.item.style.color = "White";
          todoItem.doneBtn.textContent = "Не готово";
        } else {
          todoItem.item.style.backgroundColor = "Teal";
          todoItem.item.style.color = "Black";
          todoItem.doneBtn.textContent = "Готово";
        }
      });

      // Кнопка удалить
      todoItem.delBtn.addEventListener("click", function () {
        let confirmation = confirm("Вы точно хотите удалить дело")
        if (confirmation === true) {
          todoItem.item.remove();
        }
      });

      // Создаем span чтобы записывать в него текст из input
      let span = document.createElement("span")
      span.innerHTML = todoForm.input.value;
      todoItem.item.insertBefore(span, todoItem.item.childNodes[0])

      // Кнопка редактировать
      todoItem.editBtn.addEventListener("click", function () {
        let newTask = prompt("Введите новое название дела");
        if (newTask !== "" && newTask !== null) {
          span.innerHTML = newTask
        }
      });
      todoList.append(todoItem.item);
      todoForm.input.value = "";
    }
    todoForm.form.addEventListener("submit", setIvents)
  })
}

todo()