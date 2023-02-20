//Напишите программу на JavaScript, которая принимает десять целых чисел как массив и отображает большее

const numbers = [11,22,3,40,54,61,73,84,9,11]
let chisloMax = Math.max.apply(null, numbers)
console.log(chisloMax)