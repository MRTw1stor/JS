"use strict";
const string = "JavaScript еxercises"

const camel = string.slice(0, string.indexOf(" ")) + (string.slice(string.indexOf(" ") + 1, string.indexOf(" ") + 2).toUpperCase()) + string.slice(string.indexOf(" ") + 2)
console.log(camel)