let user = {
	name: 0,
	age: 30,
}

if (Object.keys(user).length > 0) {
	console.log("объект не пустой")
	if ("age" in user == true) {
		console.log("age есть")
	} else console.log("age нет")
} else console.log("объект пустой")
