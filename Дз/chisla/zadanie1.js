// Найти произведение и сумму цифр заданного трехзначного числа.

const number = 666;
let first = Math.floor(number / 100);
let second = number % 10;
let third = Math.floor((number % 100) / 10);
console.log("Дано число:",number)
let summ = console.log("Сумма цифр заданного трехзначного числа:",first + second + third);
let comp = console.log("Произведение цифр заданного трехзначного числа:",first * second * third);