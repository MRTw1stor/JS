let name = 'Nikita'
let surname = "TolkaChev"

const convertName = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase() 
const convertSurname = surname.slice(0, 1).toUpperCase() + surname.slice(1).toLowerCase() 
console.log(convertName);
console.log(convertSurname);
if (name === convertName){
    console.log("Имя небыло преобразовано");
}
else{
    console.log("Имя было преобразовано");
}
if (surname === convertSurname){
    console.log("Фамилия небыла преобразована");
}
else{
    console.log("Фамилия была преобразована");
}