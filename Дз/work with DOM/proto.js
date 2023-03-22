alert("Привет :)")

// Задание 1
let btn1 = document.querySelector(".btn1")

function aler() {
  alert("Привет мир!")
}
btn1.addEventListener("click", aler)

// Задание 2
let btn2 = document.querySelector(".btn2")
let input1 = document.querySelector(".input1")

function zapolnenie() {
  input1.value = "test@email.ru"
}
btn2.addEventListener("click", zapolnenie)

// Задание 3
let btn3 = document.querySelector(".btn3")
let input2 = document.querySelector(".input2")

function alertVivod() {
  if (input2.value != "") alert(`Вы ввели текст ${input2.value}`)
  else alert("Вы ничего не ввели в поле")
}
btn3.addEventListener("click", alertVivod)

// Задание 4
let btn4 = document.querySelector(".btn4")
let input3 = document.querySelector(".input3")
let input4 = document.querySelector(".input4")

function reverse() {
  let help = input3.value
  input3.value = input4.value
  input4.value = help
}
btn4.addEventListener("click", reverse)

// Задание 5
let btn5 = document.querySelector(".btn5")
let btn6 = document.querySelector(".btn6")
let input5 = document.querySelector(".input5")

function ban() {
  input5.setAttribute("disabled", "disable")
}
function unBan() {
  input5.removeAttribute("disabled")
}
btn5.addEventListener("click", ban)
btn6.addEventListener("click", unBan)

// Задание 6
let btn7 = document.querySelector(".btn7")
let cube = document.querySelector(".square")

function squareHideShow() {
  if (btn7.innerHTML == "Скрыть квадрат") {
    cube.style.display = "none"
    btn7.innerHTML = "Показать квадрат"
  } else {
    cube.style.display = "block"
    btn7.innerHTML = "Скрыть квадрат"
  }
}
btn7.addEventListener("click", squareHideShow)

// Задание 7
let cub = document.querySelector(".square2")

function over() {
  cub.style.backgroundColor = "green"
}
function out() {
  cub.style.backgroundColor = "red"
}
cub.addEventListener("mouseover", over)
cub.addEventListener("mouseout", out)

// Задание 8.1
let cubs = document.querySelectorAll(".square3")
function colorChange1() {
  cubs[0].style.backgroundColor = "green"
  cubs[1].style.backgroundColor = "red"
  cubs[2].style.backgroundColor = "red"
  cubs[3].style.backgroundColor = "red"
}
cubs[0].addEventListener("click", colorChange1)
function colorChange2() {
  cubs[1].style.backgroundColor = "green"
  cubs[0].style.backgroundColor = "red"
  cubs[2].style.backgroundColor = "red"
  cubs[3].style.backgroundColor = "red"
}
cubs[1].addEventListener("click", colorChange2)
function colorChange3() {
  cubs[2].style.backgroundColor = "green"
  cubs[1].style.backgroundColor = "red"
  cubs[0].style.backgroundColor = "red"
  cubs[3].style.backgroundColor = "red"
}
cubs[2].addEventListener("click", colorChange3)
function colorChange4() {
  cubs[3].style.backgroundColor = "green"
  cubs[1].style.backgroundColor = "red"
  cubs[2].style.backgroundColor = "red"
  cubs[0].style.backgroundColor = "red"
}
cubs[3].addEventListener("click", colorChange4)

// Задание 8.2
let cubics = document.querySelectorAll(".square4")
for (let i = 0; i < cubics.length; i++) {
    cubics[i].addEventListener("click", (event) => {
        for (let j = 0; j < cubics.length; j++) {
            cubics[j].style.backgroundColor = "red"
        } 
        cubics[i].style.backgroundColor = "green"
    })
}

// Задание 9
let input = document.getElementById("inputBox");
let values = []
function addNumber(number){
  values.push(number);
  input.value = values.join("")
}
function addOperator(operator){
  values.push(operator)
  input.value = values.join("")
}
function calculate(){
  let expression = input.value;
  let result = eval(expression)
  input.value = result
  values = [result]
}
function delet(){
  let del = []
  input.value = del
  values = [del]
}