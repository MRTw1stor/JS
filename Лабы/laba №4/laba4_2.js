const string = "Пример мир!"
let newstring = ""
let i = 0

while (i < string.length){
    newstring += string[string.length - 1 - i]
    i++}
console.log(newstring)