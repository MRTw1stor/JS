const str1 = "Есть несколько товаров по $120 и $20 и $70 все они крутые"
const str2 = str1.slice(str1.indexOf("$"))
const massiv_$ = []
let id_$ = str2.indexOf("$")

while(id_$ != -1) {
    massiv_$.push(id_$)
    id_$ = str2.indexOf("$", id_$ + 1)}

for (let i = 0; i < massiv_$.length; i++){
    console.log(str2.slice(massiv_$[i] +1, str2.indexOf(" ") +massiv_$[i]))}
