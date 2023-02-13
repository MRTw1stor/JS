let mounth = NaN
if (!isNaN(mounth) && isFinite(mounth)) {
    if (mounth == 2){
        console.log("В этом месяца 28 дней");}
    if (mounth == 1 || mounth == 3 || mounth == 5 || mounth == 7 || mounth == 8 || mounth == 10 || mounth == 12){
        console.log("В этом месяца 31 день");}
    if (mounth == 4 || mounth == 6 || mounth == 9 || mounth == 11){
        console.log("В этом месяца 30 дней");}}
else{
    console.log("Месяц введен некоректно");}