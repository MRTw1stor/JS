alert("Привет")

const number = Math.floor(Math.random() * 10)
let input = prompt("Программа загадала число, попробуйте его угадать")

function game() {
    if (input === null) {
        return
    } 
    while(input !== null){
        if (isNaN(parseInt(input))) {
            input = prompt("Введите число!")
            game()
        } 
        else if (parseInt(input) > number) {
            input = prompt("Меньше!")
        } 
        else if (parseInt(input) < number) {
            input = prompt("Больше!")
        } 
        else {
            alert("Вы отгадали число!")
            return
        }
    }
    game()
}
game()
