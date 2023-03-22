alert('Я усталь :(')

let timerInterval
let timerValue = 0
const time = document.getElementById("time")
const timer = document.getElementById("timer")

function startTimer() {
    const seconds = parseInt(time.value)
    if (isNaN(seconds) || seconds <= 0) {
        alert("Введите положительное число!")
        return
    }
    timerValue = seconds
    timer.innerHTML = timerValue
    timerInterval = setInterval(() => {
        if (timerValue > 0) {
            timerValue --
            timer.innerHTML = timerValue
        } 
        else {
            stopTimer()
            alert("Время вышло!")
        }
    }, 1000)
}
function stopTimer() {
    clearInterval(timerInterval)
}
function resumeTimer() {
    timerInterval = setInterval(() => {
        if (timerValue > 0) {
            timerValue --
            timer.innerHTML = timerValue
        } 
        else {
            stopTimer()
            alert("Время вышло!")
        }
    }, 1000)
}