let result = 0

function numbers(number1, number2, operator) {
      let calculator = {
            number1,
            number2,
            sum() {
                  result = this.number1 + this.number2
                  return result
            },
            mul() {
                  result = this.number1 * this.number2
                  return result
            },
      }
      return calculator[operator]()
}

console.log(numbers(1, 4, 'mul'))
