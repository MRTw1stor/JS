let fullName = "Иван Иванович Иванов"
let surName = "Иванов"
if (fullName.slice(fullName.length - surName.length) == surName) {
    fullName = `${surName} ${fullName.slice(0,fullName.length - surName.length)}`
}
console.log(fullName)