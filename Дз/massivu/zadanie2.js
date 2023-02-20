// Напишите программу на JavaScript, которая будет пробегать по числам от 0 до 15.
// Для каждого он будет проверять, является ли текущее число нечетным или четным, и отображать сообщение на экране.

const numbers = []
for(let i=0; i<=15; i++){
    numbers.push(i)}
for (let z=0; z<numbers.length; z++) {
    if (numbers[z] % 2 == 1) {
        console.log("Число",numbers[z],"является нечетным")}
    else {
        console.log("Число",numbers[z],"является четным")}}