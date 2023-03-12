const massive = [false, undefined, '', 10, null, -1, 22, 13]

function clearArray(massive) { 
  return massive.filter(Boolean)}
console.log(clearArray(massive))