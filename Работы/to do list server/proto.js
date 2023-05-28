function todo() {
  let todos = [];

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

  function createList() {
    let list = document.createElement("ul");
    return list;
  }

  function createItem(name, done) {
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

    // Устанавливаем стили элемента в соответствии с его статусом
    if (done) {
      item.style.backgroundColor = "SpringGreen";
      item.style.color = "White";
      doneBtn.textContent = "Не готово";
    } else {
      item.style.backgroundColor = "Teal";
      item.style.color = "Black";
      doneBtn.textContent = "Готово";
    }

    return { item, doneBtn, delBtn, editBtn };
  }

  function renderTodos(todos) {
    let todoList = createList();
    for (let i = 0; i < todos.length; i++) {
      let item = createItem(todos[i].name, todos[i].done);
      let span = document.createElement("span");
      span.innerHTML = todos[i].name;
      item.item.insertBefore(span, item.item.childNodes[0]);

      item.doneBtn.addEventListener("click", function () {
        let newStatus = !todos[i].done;
        updateTodoStatus(i, newStatus);
      });

      item.delBtn.addEventListener("click", function () {
        deleteTodoItem(i);
      });

      item.editBtn.addEventListener("click", function () {
        let newTask = prompt("Введите новое название дела");
        if (newTask !== "" && newTask !== null) {
          updateTodoName(i, newTask);
        }
      });

      todoList.append(item.item);
    }

    let container = document.getElementById("container");
    container.append(todoList);
  }

  function addTodoItem(name) {
    fetch("http://localhost:3000/api/todos/", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ name, done: false })
    })
      .then((response) => response.json())
      .then((data) => {
        todos.push(data);
        renderTodos(todos);
      })
      .catch((error) => console.error("Error:", error));
  }

  function deleteTodoItem(index) {
    fetch(`http://localhost:3000/api/todos/${todos[index].id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        todos.splice(index, 1);
        renderTodos(todos);
      })
      .catch((error) => console.error("Error:", error));
  }

  function updateTodoStatus(index, done) {
    fetch(`http://localhost:3000/api/todos/${todos[index].id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done }),
    })
      .then((response) => response.json())
      .then((data) => {
        todos[index].done = data.done;
        renderTodos(todos);
      })
      .catch((error) => console.error("Error:", error));
  }

  function updateTodoName(index, name) {
    fetch(`http://localhost:3000/api/todos/${todos[index].id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((data) => {
        todos[index].name = data.name;
        renderTodos(todos);
      })
      .catch((error) => console.error("Error:", error));
  }

  function getTodos() {
    fetch("http://localhost:3000/api/todos")
      .then((response) => response.json())
      .then((data) => {
        todos = data;
        renderTodos(todos);
      })
      .catch((error) => console.error("Error:", error));
  }

  let { form, input, button } = createForm();
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let name = input.value.trim();
    if (name !== "") {
      addTodoItem(name);
      input.value = "";
    }
  });

 let container = document.getElementById("container");
  container.append(form);

  getTodos();
}

todo();