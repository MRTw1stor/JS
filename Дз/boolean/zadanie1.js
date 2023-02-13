const number = Infinity;

// if (typeof number == "number") 
if (!isNaN(number) && isFinite(number)) {
  if (number % 2 == 0) {
    console.log("Число является четным");} 
  else {
    console.log("Число является нечетным");}} 
else {
  console.log("Это не является числом");}