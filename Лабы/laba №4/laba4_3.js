const roadMines = []
let damage = 0
let position = 1

// Чтобы не писать каждый раз где нахожятся мины - они рандомные
const diap = 2
const count = 10
let massive = []
for (let i = 0; i < count; i++) {
  roadMines.push(Math.floor(Math.random() * diap))}

pozition: for (let m = 0; m < 10; m++) {
    console.log("Танк переместился на ", position)
    if(position == 10){
        console.log("Танк проехад всю дорогу")}

    if (roadMines[m] == 1){
        if (damage != 1) {console.log("Танк повреждён")}
            position += 1
            damage += 1} 
        else {
            position += 1
            continue}

    if (damage == 2){
        console.log("Танк уничтожен")
        break pozition}}
console.log(roadMines)