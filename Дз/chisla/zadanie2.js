// Дано двузначное число. Поменять местами цифры в числе.

const number = 19
let firstNumber = number % 10
let secondNumber = Math.floor(number / 10)
console.log("Дано число:", number)
console.log("Число в обратном порядке:",(firstNumber * 10) + secondNumber);