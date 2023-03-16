let objects = [
    { name: "Василий", surname: "Васильев" },
    { name: "Иван", surname: "Иванов" },
    { name: "Пётр", surname: "Петров" }
  ]
let result = []

function filter(objects, key, value) {
    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i]
        if (obj[key] === value) result.push(obj)
    }
    return result
  }
  console.log(filter(objects, "name", "Иван"))
  
