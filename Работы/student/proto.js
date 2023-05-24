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
    let name = document.querySelector("#name");
    let surname = document.querySelector("#surname");
    let secondname = document.querySelector("#secondname");
    let birthdate = document.querySelector("#birdh");
    let teachstart = document.querySelector("#teachstart");
    let faculty = document.querySelector("#faculty");
    let errors = [];
    
    if (!name.value.trim() || !secondname.value.trim() || !surname.value.trim() || !birthdate.value.trim() || !teachstart.value.trim() || !faculty.value.trim()){
        alert("Пожалуйста проверьте правильность заполнения полей")
        errors.push("error");
    }
    if (!name.value.trim() || !name.value == !isNaN) {
        document.querySelector(".name").style.color = "red"}
    else{
        document.querySelector(".name").style.color = "black"}

    if (!surname.value.trim() || !surname.value == !isNaN) {
        document.querySelector(".surname").style.color = "red"}
    else{
        document.querySelector(".surname").style.color = "black"}

    if (!secondname.value.trim() || !secondname.value == !isNaN) {
        document.querySelector(".secondname").style.color = "red"}
    else{
        document.querySelector(".secondname").style.color = "black"}

    if (!birthdate.value.trim()) {
        document.querySelector(".birdh").style.color = "red"} 
    else {
        let birthdateValue = new Date(birthdate.value);
        let today = new Date();
        let minDate = new Date(1980, 0, 1);
        if (isNaN(birthdateValue.getTime()) || birthdateValue < minDate || birthdateValue > today) {
            document.querySelector(".birdh").style.color = "red"}
        else{
            document.querySelector(".birdh").style.color = "black" 
        }
    }

    if (!teachstart.value.trim()) {
        document.querySelector(".teachstart").style.color = "red"} 
    else {
        let teachstartValue = parseInt(teachstart.value);
        let minYear = 2000;
        let currentYear = new Date().getFullYear();
        if (isNaN(teachstartValue) || teachstartValue < minYear || teachstartValue > currentYear) {
            document.querySelector(".teachstart").style.color = "red"}
        else{
            document.querySelector(".teachstart").style.color = "black" 
        }
    }

    if (!faculty.value.trim() || !faculty.value == !isNaN) {
        document.querySelector(".faculty").style.color = "red"}
    else{
        document.querySelector(".faculty").style.color = "black"}

    if (errors.length > 0) {
        document.querySelector(".modal").style.display = "block";
        document.querySelector(".modalBack").style.display = "block";} 
    else {
        let studentList = {
            name: name.value,
            surname: surname.value,
            secondname: secondname.value,
            birthdate: new Date(birthdate.value),
            learnstart: parseInt(teachstart.value),
            faculty: faculty.value,
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
    if (key === 'birthday' || key === 'learnstart') {
    if (filters[key].length === 0) {
    fullMatch = fullMatch && true;
    } else if (isNaN(parseInt(filters[key], 10))) {
    fullMatch = false;
    } else {
    const value = parseInt(filters[key], 10);
    fullMatch = fullMatch && (student[key] === value || student['learnend'] === value);
    }
    } else if (key === 'fullName') {
    let fullName = student.surname + ' ' + student.name + ' ' + student.secondname;
    fullMatch = fullMatch && (filters[key].length === 0 || fullName.toLowerCase().includes(filters[key].toLowerCase()));
    } else if (key === 'birthdate') {
    let birthdate = new Date(student[key]);
    let filterDate = new Date(filters[key]);
    let formattedDate = birthdate.toLocaleDateString();
    let formattedFilter = filterDate.toLocaleDateString();
    fullMatch = fullMatch && (filters[key].length === 0 || formattedDate.includes(formattedFilter));
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
    console.log(filters);
    let filteredStudents = filterTable(students, filters);
    updateTable(filteredStudents);
}

document.getElementById("fullname").addEventListener("input", applyFilters);
document.getElementById("facultet").addEventListener("input", applyFilters);
document.getElementById("birthday").addEventListener("input", applyFilters);
document.getElementById("learnstart").addEventListener("input", applyFilters);