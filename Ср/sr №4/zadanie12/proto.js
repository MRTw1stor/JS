let table = document.getElementById("table");
let th = table.getElementsByTagName("th");
// для каждого заголовка добавляем обработчик события клика
for (let i = 0; i < th.length; i++) {
  th[i].addEventListener("click", function () {
    let rows = table.getElementsByTagName("tr"); //находим все строки таблицы
    let rowArray = []; //создаем массив, в котором будем хранить строки таблицы
    //проходимся по всем строкам таблицы

    for (let j = 1; j < rows.length; j++) {
      rowArray[j - 1] = rows[j]; //добавляем строку в массив
    }
    let index = i; //номер столбца, по которому будем сортировать
    let isAscending = true; //флаг, определяющий порядок сортировки
    //если столбец уже отсортирован по возрастанию, то сортируем по убыванию
    if (th[i].classList.contains("sorted-asc")) {
      isAscending = false;
      th[i].classList.remove("sorted-asc");
      th[i].classList.add("sorted-desc");
    }

    //если столбец уже отсортирован по убыванию, то сортируем по возрастанию
    else if (th[i].classList.contains("sorted-desc")) {
      isAscending = true;
      th[i].classList.remove("sorted-desc");
      th[i].classList.add("sorted-asc");
    }
    //если столбец не был отсортирован, то сортируем по возрастанию
    else {
      isAscending = true;
      //удаляем классы sorted-asc и sorted-desc у всех заголовков, кроме текущего
      for (let k = 0; k < th.length; k++) {
        if (k != index) {
          th[k].classList.remove("sorted-asc");
          th[k].classList.remove("sorted-desc");
        }
      }
      th[i].classList.add("sorted-asc");
    }
    //сортируем массив строк в соответствии с выбранным порядком сортировки
    rowArray.sort(function (a, b) {
      let aVal = a.getElementsByTagName("td")[index].textContent;
      let bVal = b.getElementsByTagName("td")[index].textContent;
      if (isAscending) {
        return aVal.localeCompare(bVal, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      } else {
        return bVal.localeCompare(aVal, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      }
    });
    //перебираем отсортированный массив и добавляем строки таблицы в нужном порядке
    for (let m = 0; m < rowArray.length; m++) {
      table.appendChild(rowArray[m]);
    }
  })
}