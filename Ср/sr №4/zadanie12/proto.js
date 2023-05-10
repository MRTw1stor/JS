let table = document.getElementById("table");
let th = table.getElementsByTagName("th");

for (let i = 0; i < th.length; i++) {
  th[i].addEventListener("click", function () {
    let rows = table.getElementsByTagName("tr");
    let rowArray = [];

    for (let j = 1; j < rows.length; j++) {
      rowArray[j - 1] = rows[j];
    }
    let index = i;
    let isAscending = true;

    if (th[i].classList.contains("sorted-asc")) {
      isAscending = false;
      th[i].classList.remove("sorted-asc");
      th[i].classList.add("sorted-desc");
    }
    else if (th[i].classList.contains("sorted-desc")) {
      isAscending = true;
      th[i].classList.remove("sorted-desc");
      th[i].classList.add("sorted-asc");
    }
    else {
      isAscending = true;
      for (let k = 0; k < th.length; k++) {
        if (k != index) {
          th[k].classList.remove("sorted-asc");
          th[k].classList.remove("sorted-desc");
        }
      }
      th[i].classList.add("sorted-asc");
    }
    rowArray.sort(function (a, b) {
      let aVal = a.getElementsByTagName("td")[index].textContent;
      let bVal = b.getElementsByTagName("td")[index].textContent;
      if (isAscending) {
        return aVal.localeCompare(bVal);
      } else {
        return bVal.localeCompare(aVal);
      }
    });
    for (let m = 0; m < rowArray.length; m++) {
      table.appendChild(rowArray[m]);
    }
  })
}
