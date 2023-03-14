let menu = {
	width: 200,
	height: 300,
	title: "My menu",
}
function multiplyNumeric(menu) {
	for (let keys in menu) {
		if (typeof menu[keys] == "number") {
			console.log((menu[keys] *= 2))
		}
	}
} multiplyNumeric(menu)
