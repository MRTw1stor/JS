"use strict"

function todo(nazvanie) {
  // Cоздаем заголовок
  function createTitle(teg) {
    let title = document.createElement("h1")
    title.style.color = "white"
    title.innerHTML = teg
    return title
  }

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

    // form.innerHTML += `
    //   <input id="input" placeholder="Введите новое дело">
    //   <button id="button" >Добавить дело</button>`;
    // let input = document.querySelectorAll("#input");
    // let button = document.querySelectorAll("#addBtn");

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

    // item.innerHTML += `
    //     <button id="delBtn" >Удалить</button>
    //     <button id="editBtn" >Редактировать</button>
    //     <button id="doneBtn" >Выполнено</button>`;

    // let delBtn = document.querySelectorAll("#delBtn");
    // let editBtn = document.querySelectorAll("#editBtn");
    // let doneBtn = document.querySelectorAll("#doneBtn");

    return { item, doneBtn, delBtn, editBtn }
  }

  // Добавляем элементы на страницу
  document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById("container")
    let todoTitle = createTitle(nazvanie)
    let todoForm = createForm()
    let todoList = createList()

    container.append(todoTitle)
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
        todoItem.item.style.backgroundColor = "SpringGreen";
        todoItem.item.style.color = "White";
      });

      // Кнопка удалить
      todoItem.delBtn.addEventListener("click", function () {
        let confirmation = confirm("Вы точно хотите удалить дело")
        if (confirmation === true) {
          todoItem.item.remove();
        }
      });

      // Кнопка редактировать
      let span = document.createElement("span")
      span.innerHTML = todoForm.input.value;
      todoItem.item.insertBefore(span, todoItem.item.childNodes[0])

      todoItem.editBtn.addEventListener("click", function () {
        let newTask = prompt("Введите новое название дела");
        if (newTask !== "" && newTask !== null) {
          span.innerHTML = newTask
        }
      });
      todoList.append(todoItem.item);
      todoForm.input.value = "";
    }
    todoForm.form.addEventListener("submit", setIvents);
  })
}

todo("Мои дела")
todo("Дела мамы")
todo("Дела папы")
