let students = [
  {
    name: "Степан",
    surname: "Попов",
    secondname: "Игоревич",
    birthdate: new Date(2004, 8, 14),
    learnstart: 2021,
    faculty: "Мтор Эпу",
  },
  {
    name: "Игорь",
    surname: "Сидоров",
    secondname: "Иванович",
    birthdate: new Date(1990, 7, 21),
    learnstart: 2010,
    faculty: "ИСиП(п)",
  },
];

function otrisovka() {
  let table = document.getElementById("students");
  for (let i = 0; i < students.length; i++) {
    let tr = document.createElement("tr");
    table.append(tr);
    let student = {
      fullName: `${students[i].surname} ${students[i].name} ${students[i].secondname}`,
      faculty: students[i].faculty,
      birthdate: `${students[i].birthdate
        .toLocaleString("ru")
        .slice(0, 10)} (${Age(students[i].birthdate)} лет)`,
      dateTech: `${students[i].learnstart}-${
        students[i].learnstart + 4
      } ${Status(students[i].learnstart)}`,
    };
    for (let key in student) {
      let td = document.createElement("td");
      td.textContent = student[key];
      tr.append(td);
    }
  }
}
function Age(age) {
  return Math.floor((Date.now() - age) / (1000 * 60 * 60 * 24 * 30 * 12));
}
function Status(date) {
  let today = new Date();
  let year = today.getFullYear();
  if (date + 4 < year) {
    return "закончил";
  } else {
    return `${year - date} курс`;
  }
}

otrisovka();

document.querySelector(".new").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "block";
  document.querySelector(".modalBack").style.display = "block";

document.querySelector("#close").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "";
  document.querySelector(".modalBack").style.display = "";
})

});

let table = document.getElementById("students");
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

// function addStudent() {
//     let name = document.querySelector("#name");
//     let surname = document.querySelector("#surname");
//     let secondname = document.querySelector("#secondname");
//     let birthdate = document.querySelector("#birdh");
//     let teachstart = document.querySelector("#teachstart");
//     let faculty = document.querySelector("#faculty");
//     let studentList = {
//       name: name.value,
//       surname: surname.value,
//       secondname: secondname.value,
//       birthdate: birthdate.value,
//       learnstart: teachstart.value,
//       faculty: faculty.value,
//     };
//     students.push(studentList);
// }
// document.querySelector("#add").addEventListener("click",addStudent)