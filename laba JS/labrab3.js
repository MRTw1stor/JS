// Написать генератор нечётных случайных чисел в диапазоне между n и m
// Учесть, что n и m могут быть отрицательными

const min = 300;
const max = -1;
let rand = Math.floor(Math.random() * (max - min) + min);
let chislo = rand + 1 - Math.abs(rand % 2);
console.log(chislo);
