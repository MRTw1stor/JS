// Даны три числа. Найти среднее арифметическое модулей кубов этих чисел и среднее геометрическое их квадратов.

const firstNumber = 3
const secondNumber = 5
const thirdNumber = 7
let arifmetical = ((Math.abs(firstNumber ** 3 + secondNumber ** 3 + thirdNumber ** 3))/3)
let geometrical = Math.cbrt((firstNumber ** 2) * (secondNumber ** 2) * (thirdNumber ** 2)).toFixed(3)
console.log("Даны три числа:",firstNumber,",",secondNumber,"и",thirdNumber);
console.log("Cреднее арифметическое модулей кубов этих чисел:", arifmetical);
console.log("Среднее геометрическое модулей квадратов этих чисел:", geometrical);