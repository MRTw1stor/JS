const numberMassive = [2,4,8,-1,-10,11]
let newNumbers = []

function isNumberInRange (num) {
    return num > 0 && num < 10}
for (let i = 0; i < numberMassive.length; i += 1) {
  if (isNumberInRange(numberMassive[i])) {
    newNumbers.push(numberMassive[i])}}
console.log(newNumbers)