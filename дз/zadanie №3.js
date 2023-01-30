// Вычислить дробную часть среднего арифметического двух заданных положительных вещественных чисел.

const firstNumber = 28.28
const secondNumber = 14.14
let arifmetic = ((firstNumber + secondNumber) / 2)
let roundNumber = Math.floor(arifmetic)
let difference = arifmetic - roundNumber
console.log("Даны два числа:",firstNumber,"и",secondNumber);
console.log("Дробная часть среднего арифметического двух заданных чисел:",difference.toFixed(3));