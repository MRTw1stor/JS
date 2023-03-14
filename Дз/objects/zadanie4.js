let name = "Igor"
let surname = "Petrov"
function print() {
      console.log(this.name, this.surname)}

let object = {
      name,
      surname,
      print,
      Isprint: function () {
            console.log("My name -", this.name)
      },
}
delete object.print
object.Isprint()
