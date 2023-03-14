let salaries = {
	John: 100,
	Ann: 160,
	Pete: 130,
}
sum = 0
for (let values in salaries) {
	sum += salaries[values]
}
console.log(sum)
