const massive = [1,1,2,2,3,3,4,4,4,5,5,5,5,6]
let newMassiv = []

function oneValue(arr) {
    arr.forEach(function(el) {
      if(newMassiv.indexOf(el) === -1) {
        newMassiv.push(el)}})
    return newMassiv}
console.log(oneValue(massive))