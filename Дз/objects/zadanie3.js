let user = [
      { name: "John", age: 30 },
      { name: "Bob", age: 21 },
      { name: "Anna", age: 19 },
]
let people = ""

for (let i = 0; i < user.length; i++) {
      if (user[i]["name"] == "Bob") {
            people = user[i]
      }
      if (user[i]["name"] == "Anna") {
            delete user[i]
      }
}
console.log(people)
console.log(user[2])
