let array = ["a","b"]
let arrayy = ["a","c"]
function compare(ar, arr) {
    if (ar.length !== arr.length) {
      return false;
    }
    for (let i = 0; i < ar.length; i++) {
      if (ar[i] !== arr[i]) {
        return false;
      }
    }
    return true;
  }
console.log(compare(array,arrayy))