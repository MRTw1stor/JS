const students = ["Толкачев","Попов","Гысев","Бирюков","Юдин","Эфендиев"]
const marks = [100,77,44,85,95,59]
let count = 0

if (students.length == marks.length){
    for (let i = 0; i<students.length; i++){
        if (marks[i] >= 0  && marks[i] <= 60 ){
            console.log(students[i],"Получил оценку F")}
        else if (marks[i] >= 60 && marks[i] <= 69 ){
            console.log(students[i],"Получил оценку D")}
        else if (marks[i] >= 70 && marks[i] <= 79 ){
            console.log(students[i],"Получил оценку C")}
        else if (marks[i] >= 80 && marks[i] <= 89 ){
            console.log(students[i],"Получил оценку B")}
        else if (marks[i] >= 90 && marks[i] <= 100 ){
            console.log(students[i],"Получил оценку A")}}}
else {
    console.log("Ошибка, количество данных в массивах не совпадает")}   
            
for (let z = 0; z<marks.length; z++){
    count += marks[z]}
    
let average = count/marks.length
console.log("")
if (average >= 0  && average <= 60 ){
    console.log("Средняя оценка  F")}
else if (average >= 60 && average <= 69 ){
    console.log("Средняя оценка  D")}
else if (average >= 70 && average <= 79 ){
    console.log("Средняя оценка  C")}
else if (average >= 80 && average <= 89 ){
    console.log("Средняя оценка  B")}
else if (average >= 90 && average <= 100){
    console.log("Средняя оценка  A")}