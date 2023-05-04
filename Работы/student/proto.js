import { addStudent } from "./prototip.js";

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

document.querySelector(".test").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "block";
    document.querySelector(".modalBack").style.display = "block";
});
