let array = [1,2,3,4,5]
let item = ["a","b","c"]
for (let i = 0; i < item.length; i++) {
    array.splice(3+i,0,item[i])
}
console.log(array)