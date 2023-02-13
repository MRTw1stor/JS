const firstNumber = 10
const secondtNumber = 11
const thirdNumber = 33
const fourNumber = 55

if (!isNaN(firstNumber) && isFinite(firstNumber)) {
    if (!isNaN(secondtNumber) && isFinite(secondtNumber)) {
        if (!isNaN(thirdNumber) && isFinite(thirdNumber)) {
            if (!isNaN(fourNumber) && isFinite(fourNumber)) {
                if (firstNumber > secondtNumber && firstNumber > thirdNumber && firstNumber > fourNumber){
                    console.log("Это число самое большое:", firstNumber)}
                else if (secondtNumber > firstNumber && secondtNumber > thirdNumber && secondtNumber > fourNumber){
                    console.log("Это число самое большое:", secondtNumber)}
                else if (thirdNumber > firstNumber && thirdNumber > secondtNumber && thirdNumber > fourNumber){
                    console.log("Это число самое большое:", thirdNumber)}
                else if (fourNumber > firstNumber && fourNumber > secondtNumber && fourNumber > thirdNumber){
                    console.log("Это число самое большое:", fourNumber)}
                else{
                    console.log("Введены одинаковые числа, наибольшее выявить не получилось")}}}}}
else{
    console.log("Введены не числа")}