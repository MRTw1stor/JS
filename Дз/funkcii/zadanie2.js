for (let i = 1; i <= 100; i++) {
    console.log(i, "-", ageRange(i))}
function ageRange(age) {
    if (age <= 17) {
        return "ребенок"} 
    else if (age >= 18 && age <= 30) {
        return "молодой"} 
    else if (age >= 31 && age <= 55) {
        return "зрелый"} 
    else {
        return "старый"}}
