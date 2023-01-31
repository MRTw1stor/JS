// Вычислите дробные части чисел a и b с точностью n.
// Выведите результаты их сравнения >, <, ≥, ≤, ===, ≠

const firstNumber = 13.890123;
const secondNumber = 2.891564;
const n = 2;

drob = 10 ** n * (firstNumber - Math.trunc(firstNumber)).toFixed(n);
drob2 = 10 ** n * (secondNumber - Math.trunc(secondNumber)).toFixed(n);

console.log("Даны два числа:", firstNumber, "и", secondNumber);
console.log("Точность округления равна:", n);
console.log("Дробная часть первого числа:", drob);
console.log("Дробная часть второго числа:", drob2);
console.log("Сравнение дробных частей");
console.log("drob > drob2", drob > drob2);
console.log("drob < drob2", drob < drob2);
console.log("drob >= drob2", drob >= drob2);
console.log("drob <= drob2", drob <= drob2);
console.log("drob === drob2", drob === drob2);
console.log("drob != drob2", drob != drob2);
console.log((firstNumber - Math.trunc(firstNumber)).toFixed(n));
