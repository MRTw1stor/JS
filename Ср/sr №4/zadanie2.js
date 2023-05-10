let object = {js:"test",jq:"hello",css:"world"}
let keyOfObject = []
for (let key in object) {
    keyOfObject.push(key)
}
console.log(keyOfObject)