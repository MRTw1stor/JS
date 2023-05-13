let string = "var_test_text"
let stringg = string.split("_")
for(let i = 1; i < stringg.length; i++){
    stringg[i] = stringg[i].slice(0, 1).toUpperCase() + stringg[i].slice(1).toLowerCase()
}
let str = stringg.join("")
console.log(str)
