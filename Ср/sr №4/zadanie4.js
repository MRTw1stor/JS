let string = "http://"
let stringg = "the http://.html"

function check(string, link) {
    if (string.slice(string.length-link.length).includes(link)) {
        console.log(`Строка (${string}) заканчивается на (${link}).`);
    } else {
        console.log(`Строка (${string}) не заканчивается на (${link}).`);
    }
}
check(string, ".html")
check(stringg, ".html")