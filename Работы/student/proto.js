let students = JSON.parse(localStorage.getItem("students")) || [
    {
        name: "Степан",
        surname: "Попов",
        secondname: "Игоревич",
        birthdate: new Date(2004,8,14),
        learnstart: 2021,
        faculty: "Мтор Эпу",
    },
    {
        name: "Игорь",
        surname: "Сидоров",
        secondname: "Иванович",
        birthdate: new Date(1990,7,21),
        learnstart: 2010,
        faculty: "ИСиП(п)",
    },
  ];

function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

function otrisovka() {
    let table = document.getElementById("students");
  
    for (let i = 0; i < students.length; i++) {
      let tr = document.createElement("tr");
      table.append(tr);
      let birthdate = students[i].birthdate;
      if (!(birthdate instanceof Date)) {
        birthdate = new Date(birthdate);
      }
      let student = {
        fullName: `${students[i].surname} ${students[i].name} ${students[i].secondname}`,
        faculty: students[i].faculty,
        birthdate: `${birthdate.getDate()}.${birthdate.getMonth() + 1}.${birthdate.getFullYear()} (${Age(birthdate)} лет)`,
        dateTech: `${students[i].learnstart}-${students[i].learnstart + 4} ${Status(students[i].learnstart)}`,
      };
  
      for (let key in student) {
        let td = document.createElement("td");
        td.textContent = student[key];
        tr.append(td);
      }
    }
    saveToLocalStorage();
  }

function Age(age) {
    return Math.floor((Date.now() - age) / (1000 * 60 * 60 * 24 * 30 * 12));
}

function Status(date) {
    let today = new Date();
    let year = today.getFullYear();
    if (date + 4 < year) {return "закончил"} 
    else {return `${year - date} курс`}
}

otrisovka();

document.querySelector(".new").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "block";
    document.querySelector(".modalBack").style.display = "block";

});
document.querySelector("#close").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
    document.querySelector(".modalBack").style.display = "none";
    document.querySelector(".name").style.color = "black";
    document.querySelector(".surname").style.color = "black";
    document.querySelector(".secondname").style.color = "black";
    document.querySelector(".birdh").style.color = "black";
    document.querySelector(".teachstart").style.color = "black";
    document.querySelector(".faculty").style.color = "black";
    document.querySelector("#name").style.color = "black";
    document.querySelector("#surname").style.color = "black";
    document.querySelector("#secondname").style.color = "black";
    document.querySelector("#birdh").style.color = "black";
    document.querySelector("#teachstart").style.color = "black";
    document.querySelector("#faculty").style.color = "black";
    document.querySelector("#name").value = "";
    document.querySelector("#surname").value = "";
    document.querySelector("#secondname").value = "";
    document.querySelector("#birdh").value = "";
    document.querySelector("#teachstart").value = "";
    document.querySelector("#faculty").value = "";
});

function sorting(){
    let table = document.getElementById("students");
    let th = table.getElementsByTagName("th");
    for (let i = 0; i < th.length; i++) {
        th[i].addEventListener("click", function () {
        let rows = table.getElementsByTagName("tr");
        let newRows = [];

        for (let i of rows) {
            if (i.classList[0] == "filters") {null} 
            else {newRows.push(i)}
        }

        rows = newRows
        let rowArray = []

        for (let j = 1; j < rows.length; j++) {
            rowArray[j - 1] = rows[j];
        }

        let index = i;
        let isAscending = true;

        if (th[i].classList.contains("sorted-asc")) {
            isAscending = false;
            th[i].classList.remove("sorted-asc");
            th[i].classList.add("sorted-desc");
        } else if (th[i].classList.contains("sorted-desc")) {
            isAscending = true;
            th[i].classList.remove("sorted-desc");
            th[i].classList.add("sorted-asc");
        } else {
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
        });
    }
}

sorting()

function addStudent() {
    let nameInput = document.querySelector("#name");
    let surnameInput = document.querySelector("#surname");
    let secondnameInput = document.querySelector("#secondname");
    let birthdateInput = document.querySelector("#birdh");
    let teachstartInput = document.querySelector("#teachstart");
    let facultyInput = document.querySelector("#faculty");
    let inputs = [nameInput, surnameInput, secondnameInput, birthdateInput, teachstartInput, facultyInput];
    let errors = [];
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            document.querySelector(".name").style.color = "red";
            document.querySelector(".surname").style.color = "red";
            document.querySelector(".secondname").style.color = "red";
            document.querySelector(".birdh").style.color = "red";
            document.querySelector(".teachstart").style.color = "red";
            document.querySelector(".faculty").style.color = "red";
            errors.push("error");
        } else {
            document.querySelector(".name").style.color = "black";
            document.querySelector(".surname").style.color = "black";
            document.querySelector(".secondname").style.color = "black";
            document.querySelector(".birdh").style.color = "black";
            document.querySelector(".teachstart").style.color = "black";
            document.querySelector(".faculty").style.color = "black";
        }
    })

    if (errors.length > 0) {
        alert("Проверьте правильность заполнения полей")
    }
    
    let nameIsInvalid = !nameInput.value.trim() || !isNaN(nameInput.value);
    nameInput.style.color = nameIsInvalid ? "red" : "black";
    document.querySelector(".name").style.color = nameIsInvalid ? "red" : "black";
    
    let surnameIsInvalid = !surnameInput.value.trim() || !isNaN(surnameInput.value);
    surnameInput.style.color = surnameIsInvalid ? "red" : "black";
    document.querySelector(".surname").style.color = surnameIsInvalid ? "red" : "black";
    
    let secondnameIsInvalid = !secondnameInput.value.trim() || !isNaN(secondnameInput.value);
    secondnameInput.style.color = secondnameIsInvalid ? "red" : "black";
    document.querySelector(".secondname").style.color = secondnameIsInvalid ? "red" : "black";

    let birthdateIsInvalid = false;
    if (birthdateInput.value.trim()) {
        let birthdateValue = new Date(birthdateInput.value);
        let today = new Date();
        let minDate = new Date(1980, 0, 1);
        birthdateIsInvalid = isNaN(birthdateValue.getTime()) || birthdateValue < minDate || birthdateValue > today;
    } else {
        birthdateIsInvalid = true;
    }
    birthdateInput.style.color = birthdateIsInvalid ? "red" : "black";
    document.querySelector(".birdh").style.color = birthdateIsInvalid ? "red" : "black";
    
    let teachstartIsInvalid = false;
    if (teachstartInput.value.trim()) {
        let teachstartValue = parseInt(teachstartInput.value);
        let minYear = 2000;
        let currentYear = new Date().getFullYear();
        teachstartIsInvalid = isNaN(teachstartValue) || teachstartValue < minYear || teachstartValue > currentYear;
    } else {
        teachstartIsInvalid = true;
    }
    teachstartInput.style.color = teachstartIsInvalid ? "red" : "black";
    document.querySelector(".teachstart").style.color = teachstartIsInvalid ? "red" : "black";
    
    let facultyIsInvalid = !facultyInput.value.trim() || !isNaN(facultyInput.value);
    facultyInput.style.color = facultyIsInvalid ? "red" : "black";
    document.querySelector(".faculty").style.color = facultyIsInvalid ? "red" : "black";

    errors = inputs.filter(input => input.style.color === "red");

    if (errors.length > 0) {
        document.querySelector(".modal").style.display = "block";
        document.querySelector(".modalBack").style.display = "block";
    } else {
        let studentList = {
            name: nameInput.value,
            surname: surnameInput.value,
            secondname: secondnameInput.value,
            birthdate: new Date(birthdateInput.value),
            learnstart: parseInt(teachstartInput.value),
            faculty: facultyInput.value,
        };
        document.querySelector(".modal").style.display = "none";
        document.querySelector(".modalBack").style.display = "none";
        students.push(studentList);
        clear();
        otrisovka();
    }
}

document.querySelector("#add").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
    document.querySelector(".modalBack").style.display = "none";
    addStudent()
});
  
function clear() {
    let cell = document.querySelectorAll("tr")
    let titles = document.querySelector(".titles")
    let filters = document.querySelector(".filters")
    cell.forEach((item) => {
        if (item == titles || item == filters) {null} 
        else {item.remove()}
    })
}

function filterTable(students, filters) {
    let filteredStudents = students.filter((student) => {
    let fullMatch = true;
    Object.keys(filters).forEach(key => {
    if (key === 'learnstart') {
    if (filters[key].length === 0) {
    fullMatch = fullMatch && true;
    } else if (isNaN(parseInt(filters[key]))) {
    fullMatch = false;
    } else {
    const value = parseInt(filters[key]);
    fullMatch = fullMatch && (student[key] === value || student['learnend'] === value);
    }
    } else if (key === 'fullName') {
    let fullName = student.surname + ' ' + student.name + ' ' + student.secondname;
    fullMatch = fullMatch && (filters[key].length === 0 || fullName.toLowerCase().includes(filters[key].toLowerCase()));
    } else {
    fullMatch = fullMatch && (filters[key].length === 0 || (student[key] && student[key].toString().toLowerCase().includes(filters[key].toLowerCase())));
    }
    });
    return fullMatch;
    });
    return filteredStudents;
    }

function updateTable(students) {
    clear();
    let table = document.getElementById("students");
    for (let i = 0; i < students.length; i++) {
      let tr = document.createElement("tr");
      table.append(tr);
      let birthdate = students[i].birthdate;
      if (!(birthdate instanceof Date)) {
        birthdate = new Date(birthdate);
      }
      let student = {
        fullName: students[i].surname +' '+ students[i].name +' '+ students[i].secondname,
        faculty: students[i].faculty,
        birthdate: `${birthdate.getDate()}.${birthdate.getMonth() + 1}.${birthdate.getFullYear()} (${Age(birthdate)} лет)`,
        dateTech: `${students[i].learnstart}-${students[i].learnstart + 4} ${Status(students[i].learnstart)}`,
      };

      for (let key in student) {
        let td = document.createElement("td");
        td.textContent = student[key];
        tr.append(td);
      }
    }
}

function applyFilters() {
    let filters = {
      fullName: document.getElementById("fullname").value,
      faculty: document.getElementById("facultet").value,
      birthday: document.getElementById("birthday").value,
      learnstart: document.getElementById("learnstart").value,
    };
    let filteredStudents = filterTable(students, filters);
    updateTable(filteredStudents);
}

document.getElementById("fullname").addEventListener("input", applyFilters);
document.getElementById("facultet").addEventListener("input", applyFilters);
document.getElementById("birthday").addEventListener("input", applyFilters);
document.getElementById("learnstart").addEventListener("input", applyFilters);