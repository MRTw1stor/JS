let chislo1 = 10
let chislo2 = 20
let move = "/"

if (!isNaN(chislo1) && isFinite(chislo1)) {
    if (!isNaN(chislo2) && isFinite(chislo2)) {
        if (move == "+"){
            console.log(chislo1 + chislo2)}
        else if (move == "-"){
            console.log(chislo1 - chislo2)}
        else if (move == "*"){
            console.log(chislo1 * chislo2)}
        else if (move == "/"){
            console.log(chislo1 / chislo2)}
        else if (move == "%"){
            console.log(chislo1 % chislo2)}
        else if (move == "^" || move == "**"){
            console.log(chislo1 ** chislo2)}}}
else{
    console.log("Введено не число или не число")}
    
