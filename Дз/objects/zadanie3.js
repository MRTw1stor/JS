let sotrud = [
      { name: "Sergei", age: 32 },{ name: "Petr", age: 35 },
      { name: "Ivan", age: 30 },{ name: "Dima", age: 28 }
]

function sort(array) {
      for (let i = 0; i < array.length; i++) {
            console.log(sotrud[i]["name"], "-", sotrud[i]["age"], "года/лет")
      }
}
sort(sotrud)
