export function addStudent() {
  let name = document.querySelector("#name");
  let surname = document.querySelector("#surname");
  let secondname = document.querySelector("#secondname");
  let birthdate = document.querySelector("#birdh");
  let teachstart = document.querySelector("#teachstart");
  let faculty = document.querySelector("#faculty");
  let studentList = {
    name: name.value,
    surname: surname.value,
    secondname: secondname.value,
    birthdate: birthdate.value,
    learnstart: teachstart.value,
    faculty: faculty.value,
  };
  students.push(studentList);
}
