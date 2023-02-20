const month = []
const week = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье"
]
let day = "Воскресенье"
let indexWeek = week.indexOf(day)

for (let i = 1; i <= 31; i++){
    month.push(i)}
    for (let z = 0; z < 31; z++) {
        const dayWeek = (indexWeek + month[z] - 1) % 7 
        console.log(month[z], "Января", week[dayWeek])
    if (z == 31){
        break}}