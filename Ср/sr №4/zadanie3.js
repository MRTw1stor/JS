let string = "http://"
let stringg = "htp://"

function check(string, link) {
  if (string.slice(0,link.length).includes(link)) {
    console.log(`Строка (${string}) начинается с (${link})`)} 
  else {
    console.log(`Строка (${string}) не начинается с (${link})`)}
}
check(string, "http://")
check(stringg, "http://")
