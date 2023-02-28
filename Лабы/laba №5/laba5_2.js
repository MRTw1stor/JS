const summa = 350000
const count = 11
const promocode = "ДАРИМ300"

function calculate(summa, count, promocode = null) {
  if(promocode == "ДАРИМ300"){
    summa <= 300 ? summa = 0 : summa = summa - 300}
  if(promocode == "СКИДКА15" && summa >= 20000){
    summa = summa - summa / 100 * 15}
  if (count >= 10) {
    summa = summa - (summa / 100 * 5)} 
  if (summa > 50000) {
    summa = summa - ((summa - 50000) / 100) * 20}
  console.log("Итого к оплате",summa)}
calculate(summa, count, promocode)
