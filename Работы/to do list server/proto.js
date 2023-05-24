"use strict";

// Создаем массив для объектов
let todos = [
  {
    name: `name`,
    done: false,
  }
]

// Создаем массив для значений input
let todosText = [];

// Создаем страницу для дел
function todo() {
  
  // Cоздаем форму дела
  function createForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let button = document.createElement("button");
    button.setAttribute("id", "button");
    input.placeholder = "Введите новое дело";
    button.textContent = "Добавить дело";
    form.append(input);
    form.append(button);

    return { form, input, button };
  }

  // Cоздаем список элементов
  function createList() {
    let list = document.createElement("ul");
    return list;
  }

  // Cоздаём дело и кнопки
  function createItem() {
    let item = document.createElement("div");
    let doneBtn = document.createElement("button");
    doneBtn.setAttribute("id", "doneBtn");
    let delBtn = document.createElement("button");
    delBtn.setAttribute("id", "delBtn");
    let editBtn = document.createElement("button");
    editBtn.setAttribute("id", "editBtn");

    doneBtn.textContent = "Готово";
    editBtn.textContent = "Редактировать";
    delBtn.textContent = "Удалить";
    item.append(doneBtn);
    item.append(editBtn);
    item.append(delBtn);

    return { item, doneBtn, delBtn, editBtn };
  }

  // Добавляем элементы на страницу
  document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById("container");
    let todoForm = createForm();
    let todoList = createList();

    container.append(todoForm.form);
    container.append(todoList);

    // Достаем элементы из localStorage

    let items = JSON.parse(localStorage.getItem("key"))
    let itemsText = JSON.parse(localStorage.getItem("keyy"))
    if(itemsText === null){
      addText(todos, todosText)
      
    }
    else todosText.push(...itemsText)
    
    if (items) {
      for (let j = 1; j < items.length; j++) {
        
        // Отображаем дела которые храняться в localStorage
        todos.push(items[j]);

        // Вешаем на элемент функцию отрисовки дела
        let itemchik = createItem(items[j].name, items[j].done);
        todoList.append(itemchik.item);
        createItem(todos.name, todos.done);

        // Создаем span чтобы записывать в него дела из localStorage
        let span = document.createElement("span");
        span.innerHTML = items[j].name;
        itemchik.item.insertBefore(span, itemchik.item.childNodes[0]);

        // Кнопка удалить для дел из localStorage
        itemchik.delBtn.addEventListener("click", function () {
          let confirmation = confirm("Вы точно хотите удалить дело");
          if (confirmation === true) {
            itemchik.item.remove();
            todos.splice(todosText.indexOf(span.textContent) + 1, 1);
            todosText.splice(todosText.indexOf(span.textContent), 1);
            localStorage.setItem("key", JSON.stringify(todos));
            localStorage.setItem("keyy", JSON.stringify(todosText));
          }
        });

        // Кнопка Готово для дел из localStorage
        itemchik.doneBtn.addEventListener("click", function () {
          if (itemchik.doneBtn.textContent === "Готово") {
            itemchik.item.style.backgroundColor = "SpringGreen";
            itemchik.item.style.color = "White";
            itemchik.doneBtn.textContent = "Не готово";
            todos[todosText.indexOf(span.textContent) + 1].done = true;
            addItem(todos, todosText);
          } else {
            itemchik.item.style.backgroundColor = "Teal";
            itemchik.item.style.color = "Black";
            itemchik.doneBtn.textContent = "Готово";
            todos[todosText.indexOf(span.textContent) + 1].done = false;
            addItem(todos, todosText);
          }
        });

        // Кнопка редактировать для дел из localStorage
        itemchik.editBtn.addEventListener("click", function () {
          let newTask = prompt("Введите новое название дела");
          if (newTask !== "" && newTask !== null) {
            todos[todosText.indexOf(span.textContent) + 1].name = newTask;
            todosText[todosText.indexOf(span.textContent)] = newTask;
            span.innerHTML = newTask;
            localStorage.setItem("key", JSON.stringify(todos));
            localStorage.setItem("keyy", JSON.stringify(todosText));
          }
        });

        // Функция отрисовки для выполненых дел
        function checkStyles() {
          if (items[todosText.indexOf(span.textContent) + 1].done) {
            itemchik.item.style.backgroundColor = "SpringGreen";
            itemchik.item.style.color = "White";
            itemchik.doneBtn.textContent = "Не готово";
          } else {
            itemchik.item.style.backgroundColor = "Teal";
            itemchik.item.style.color = "Black";
            itemchik.doneBtn.textContent = "Готово";
          }
        }
        setInterval(checkStyles);
      }
    }

    // Отрисовка элементов созданныйх в коде JS

    // Вешаем события на кнопки
    function setIvents(event) {
      event.preventDefault();
      let todoItem = createItem();

      // Проверка на пустой ввод
      if (todoForm.input.value == "" || todoForm.input.value == null) {
        alert("Вы ничего не ввели");
        return;
      } else {
        // Добавляем элементы в объект
        // Объект добавляем а массив
        // Массив добавляем в localStorage
        let objectList = { name: todoForm.input.value, done: false };
        todos.push(objectList);
        todosText.push(objectList.name);
        addItem(todos, todosText);
      }

      // Кнопка Готово
      todoItem.doneBtn.addEventListener("click", function () {
        if (todoItem.doneBtn.textContent === "Готово") {
          todoItem.item.style.backgroundColor = "SpringGreen";
          todoItem.item.style.color = "White";
          todoItem.doneBtn.textContent = "Не готово";
          todos[todosText.indexOf(span.textContent) + 1].done = true;
          addItem(todos, todosText);
        } else {
          todoItem.item.style.backgroundColor = "Teal";
          todoItem.item.style.color = "Black";
          todoItem.doneBtn.textContent = "Готово";
          todos[todosText.indexOf(span.textContent) + 1].done = false;
          addItem(todos, todosText);
        }
      });

      // Кнопка удалить
      todoItem.delBtn.addEventListener("click", function () {
        let confirmation = confirm("Вы точно хотите удалить дело");
        if (confirmation === true) {
          todoItem.item.remove();
          todos.splice(todosText.indexOf(span.textContent) + 1, 1);
          todosText.splice(todosText.indexOf(span.textContent), 1);
          localStorage.setItem("key", JSON.stringify(todos));
          localStorage.setItem("keyy", JSON.stringify(todosText));
        }
      });

      // Создаем span чтобы записывать в него текст из input
      let span = document.createElement("span");
      span.innerHTML = todoForm.input.value;
      todoItem.item.insertBefore(span, todoItem.item.childNodes[0]);

      // Кнопка редактировать
      todoItem.editBtn.addEventListener("click", function () {
        let newTask = prompt("Введите новое название дела");
        if (newTask !== "" && newTask !== null) {
          todos[todosText.indexOf(span.textContent) + 1].name = newTask;
          todosText[todosText.indexOf(span.textContent)] = newTask;
          span.innerHTML = newTask;
          localStorage.setItem("key", JSON.stringify(todos));
          localStorage.setItem("keyy", JSON.stringify(todosText));
        }
      });
      todoList.append(todoItem.item);
      todoForm.input.value = "";
    }
    todoForm.form.addEventListener("submit", setIvents);

    // Функция добавления дел в localStorage
    function addItem(aray, array) {
      localStorage.setItem("key", JSON.stringify(aray))
      localStorage.setItem("keyy", JSON.stringify(array))
    }

    // Функция добавления первоначальных дел в localStorage
    function addText(){
      localStorage.setItem("keyy", JSON.stringify(["123","45","99"]))
      localStorage.setItem("key", JSON.stringify([{
        name: `name`,
        done: false,
      },{
        name: `123`,
        done: true,
      },{
        name: `45`,
        done: false,
      },{
        name: `99`,
        done: false,
      }]))
    }
  })
}
todo()