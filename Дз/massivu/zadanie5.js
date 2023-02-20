numbers = [10,222,11,34,55,45,76,67,99,88]

function sort(numbers){
    let _switch = false
    do {
        _switch = false
        for(let i=0; i<numbers.length - 1; i++){
            if (numbers[i] > numbers[i+1]){
                let timeNumber = numbers[i]
                numbers[i] = numbers[i+1]
                numbers[i+1] = timeNumber
                _switch = false}}
    }while(_switch)}
sort(numbers)
console.log(numbers)