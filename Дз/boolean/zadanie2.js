const year = 2020
if (!isNaN(year) && isFinite(year)) {
    if (year % 4 == 0){
        console.log("Этот год високостный")} 
    else {
        console.log("Этот год не високостный")}}
else {
    console.log("Год введен некоректно");}