const firstnumber = 0
const secondnumber = 100
const count = 100
let numbers = []

let max = Math.max(firstnumber, secondnumber)
let min = Math.min(firstnumber, secondnumber)
for (let i=0; i<count; i++){
    numbers.push(Math.floor(Math.random() * (max - min) + min))}
console.log(numbers)